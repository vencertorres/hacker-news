export interface Story {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text?: string;
  time: number;
  title: string;
  url: string;
  type: "story" | "job" | "poll";
}
