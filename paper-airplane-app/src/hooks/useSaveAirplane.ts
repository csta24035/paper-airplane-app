import {
  saveAirplane,
  updateAirplane,
  getAirplaneCount,
} from "../db/indexedDb";

import { fileToBase64 } from "../utils/file";

import {
  validateName,
  validateDistance,
  validateFoldCount,
  validateMemo,
} from "../utils/validation";

import type {
  Airplane,
  Instruction,
} from "../types/airplane";
type Props = {
  editingId: string | null;
  editingCreatedAt: number | null;

  name: string;
  distance: string;
  foldCount: string;
  createdDate: string;
  memo: string;

  completedImages: File[];
  instructions: Instruction[];

  loadAirplanes: () => Promise<void>;

  setError: (v: string) => void;
  setSuccess: (v: string) => void;

  resetForm: () => void;
};
export async function saveCurrentAirplane(
    async function handleSave() {
    setError("");
    setSuccess("");

const nameError = validateName(name);

if (nameError) {
  setError(nameError);
  return;
}

const distanceError =
  validateDistance(distance);

if (distanceError) {
  setError(distanceError);
  return;
}

const foldError =
  validateFoldCount(foldCount);

if (foldError) {
  setError(foldError);
  return;
}

const memoError =
  validateMemo(memo);

if (memoError) {
  setError(memoError);
  return;
}

    try {
      const imageStrings: string[] = [];

for (const image of completedImages) {
  const base64 =
    await fileToBase64(image);

  imageStrings.push(base64);
}
      const airplane:
Airplane = {
  id:
    editingId ??
    crypto.randomUUID(),

  name,

  distance:
    distance === ""
      ? undefined
      : Number(distance),

  foldCount:
    foldCount === ""
      ? undefined
      : Number(foldCount),

  createdDate:
    createdDate || undefined,

  memo,

  completedImages: imageStrings,

  instructions,

  createdAt:
  editingCreatedAt ??
  Date.now(),
};

await save(
  airplane,
  editingId !== null
);

      setSuccess(
        "保存しました"
      );

      await loadAirplanes();

      setName("");
      setDistance("");
      setFoldCount("");
      setCreatedDate("");
      setMemo("");
      setCompletedImages([]);
      setInstructions([
  {
    id: crypto.randomUUID(),
    text: "",
    images: [],
  },
]);

      setEditingId(null);
      setEditingCreatedAt(
        null
      );

    } catch (error) {

  if (
    error instanceof Error
  ) {

    setError(
      error.message
    );

  } else {

    setError(
      "保存に失敗しました"
    );

  }
}
  }
  props: Props
) { }
