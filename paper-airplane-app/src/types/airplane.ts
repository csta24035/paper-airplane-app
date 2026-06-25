export interface StepInstruction {
  id: string;
  text: string;
  imageIds: string[];
}

export interface AirplaneRecord {
  id: string;

  name: string;

  completedImageIds: string[];

  distance?: number;

  foldCount?: number;

  createdDate?: string;

  memo?: string;

  instructions: StepInstruction[];

  createdAt: number;
}