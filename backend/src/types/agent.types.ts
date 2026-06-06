export type AgentIntent =
  | "lead"
  | "inventory"
  | "finance"
  | "pitch"
  | "general";

export interface ToolResult {
  toolName: string;
  data: any;
}