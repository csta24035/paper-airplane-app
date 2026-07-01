//useInstructions.ts
import { useState } from "react";
import type { Instruction } from "../types/airplane";

export function useInstructions() {
  const [instructions, setInstructions] =
    useState<Instruction[]>([
      {
        id: crypto.randomUUID(),
        text: "",
        images: [],
      },
    ]);

  return {
    instructions,
    setInstructions,
  };
}