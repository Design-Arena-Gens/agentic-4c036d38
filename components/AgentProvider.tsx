"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { initialAgentState } from "@/lib/sampleData";
import type {
  ActivityLogEntry,
  AgentState,
  AgentTask,
  Campaign,
  ContentAsset,
  Insight
} from "@/lib/types";

interface AgentContextValue extends AgentState {
  addTask: (task: AgentTask) => void;
  updateTaskStatus: (taskId: string, status: AgentTask["status"]) => void;
  addContentAsset: (asset: ContentAsset) => void;
  addCampaign: (campaign: Campaign) => void;
  addInsight: (insight: Insight) => void;
  appendLog: (entry: ActivityLogEntry) => void;
  togglePlaybook: (playbookId: string) => void;
}

const AgentContext = createContext<AgentContextValue | undefined>(undefined);

type AgentAction =
  | { type: "ADD_TASK"; payload: AgentTask }
  | { type: "UPDATE_TASK_STATUS"; payload: { id: string; status: AgentTask["status"] } }
  | { type: "ADD_CONTENT"; payload: ContentAsset }
  | { type: "ADD_CAMPAIGN"; payload: Campaign }
  | { type: "ADD_INSIGHT"; payload: Insight }
  | { type: "APPEND_LOG"; payload: ActivityLogEntry }
  | { type: "TOGGLE_PLAYBOOK"; payload: { id: string } };

function agentReducer(state: AgentState, action: AgentAction): AgentState {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, status: action.payload.status } : task
        )
      };
    case "ADD_CONTENT":
      return { ...state, contentAssets: [action.payload, ...state.contentAssets] };
    case "ADD_CAMPAIGN":
      return { ...state, campaigns: [action.payload, ...state.campaigns] };
    case "ADD_INSIGHT":
      return { ...state, insights: [action.payload, ...state.insights] };
    case "APPEND_LOG":
      return { ...state, activityLog: [action.payload, ...state.activityLog] };
    case "TOGGLE_PLAYBOOK":
      return {
        ...state,
        playbooks: state.playbooks.map((playbook) =>
          playbook.id === action.payload.id
            ? { ...playbook, status: playbook.status === "enabled" ? "disabled" : "enabled" }
            : playbook
        )
      };
    default:
      return state;
  }
}

export function AgentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(agentReducer, initialAgentState);

  const value = useMemo<AgentContextValue>(() => ({
    ...state,
    addTask: (task) => dispatch({ type: "ADD_TASK", payload: task }),
    updateTaskStatus: (taskId, status) =>
      dispatch({ type: "UPDATE_TASK_STATUS", payload: { id: taskId, status } }),
    addContentAsset: (asset) => dispatch({ type: "ADD_CONTENT", payload: asset }),
    addCampaign: (campaign) => dispatch({ type: "ADD_CAMPAIGN", payload: campaign }),
    addInsight: (insight) => dispatch({ type: "ADD_INSIGHT", payload: insight }),
    appendLog: (entry) => dispatch({ type: "APPEND_LOG", payload: entry }),
    togglePlaybook: (playbookId) => dispatch({ type: "TOGGLE_PLAYBOOK", payload: { id: playbookId } })
  }), [state]);

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgent must be used within AgentProvider");
  }
  return context;
}
