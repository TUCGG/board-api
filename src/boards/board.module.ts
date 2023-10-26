export interface Board {
  id: string;
  title: string;
  description: string;
  contents: string;
  createAt: string;
  type: BoardType;
  count: number;
}

export enum BoardType {
  REPORT = 'report',
  STORY = 'story',
  video = 'video',
}
