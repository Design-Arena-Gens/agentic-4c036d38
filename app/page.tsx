import { AgentHeader } from "@/components/AgentHeader";
import { MetricPulse } from "@/components/MetricPulse";
import { TaskBoard } from "@/components/TaskBoard";
import { ContentAutomation } from "@/components/ContentAutomation";
import { CampaignLaunchpad } from "@/components/CampaignLaunchpad";
import { InsightPanel } from "@/components/InsightPanel";
import { PlaybookConsole } from "@/components/PlaybookConsole";
import { ActivityStream } from "@/components/ActivityStream";
import { IntegrationMatrix } from "@/components/IntegrationMatrix";
import { ScenarioBuilder } from "@/components/ScenarioBuilder";
import { AgentProvider } from "@/components/AgentProvider";

export default function HomePage() {
  return (
    <AgentProvider>
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 md:px-8 lg:px-12">
        <AgentHeader />
        <MetricPulse />
        <TaskBoard />
        <ContentAutomation />
        <CampaignLaunchpad />
        <ScenarioBuilder />
        <InsightPanel />
        <PlaybookConsole />
        <IntegrationMatrix />
        <ActivityStream />
      </main>
    </AgentProvider>
  );
}
