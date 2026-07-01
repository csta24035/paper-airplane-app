export interface Instruction {
  id: string;

  text: string;

  images: string[];
}

export interface AirplaneRecord {
  id: string;

  name: string;

  completedImages: string[];

  distance?: number;

  foldCount?: number;

  createdDate?: string;

  memo?: string;

  instructions: Instruction[];

  createdAt: number;
}