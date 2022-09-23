export interface Comment {
  by: string;
  dead?: boolean;
  deleted?: boolean;
  id: number;
  comments: Comment[];
  parent: number;
  text: string;
  time: number;
  type: "comment";
}
