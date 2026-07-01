export interface Instruction {
  id: string;

  text: string;

  images: string[];
}

export interface Airplane {
  id: string;

  name: string;

  distance?: number;

  foldCount?: number;

  createdDate?: string;

  memo: string;

  completedImages: string[];

  instructions: Instruction[];

  createdAt: number;
}