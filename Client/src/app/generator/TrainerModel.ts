import { IScenario } from "@/components/scenarioEditor/scenario/Scenario";
import { ITag } from "@/components/tagEditor/tag/Tag";

export interface ITrainer {
    id: string;
    name: string;
    date: string;
    scenarios: IScenario[];
    tags: ITag[];
  }