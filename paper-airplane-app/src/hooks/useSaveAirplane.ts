// useSaveAirplane.ts
import {
  saveAirplane,
  updateAirplane,
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

  completedImages: (File | string)[];
  instructions: Instruction[];

  loadAirplanes: () => Promise<void>;

  setError: (v: string) => void;
  setSuccess: (v: string) => void;

  resetForm: () => void;
  
  setName: (v: string) => void;
  setDistance: (v: string) => void;
  setFoldCount: (v: string) => void;
  setCreatedDate: (v: string) => void;
  setMemo: (v: string) => void;
  // ⭕ 修正箇所1: 引数の型を (File | string)[] に拡張
  setCompletedImages: (v: (File | string)[]) => void;
  setInstructions: (v: Instruction[]) => void;
  setEditingId: (v: string | null) => void;
  setEditingCreatedAt: (v: number | null) => void;
};

export async function saveCurrentAirplane(props: Props) {
  const {
    editingId,
    editingCreatedAt,
    name,
    distance,
    foldCount,
    createdDate,
    memo,
    completedImages,
    instructions,
    loadAirplanes,
    setError,
    setSuccess,
    setName,
    setDistance,
    setFoldCount,
    setCreatedDate,
    setMemo,
    setCompletedImages,
    setInstructions,
    setEditingId,
    setEditingCreatedAt
  } = props;

  setError("");
  setSuccess("");

  const nameError = validateName(name);
  if (nameError) {
    setError(nameError);
    return;
  }

  const distanceError = validateDistance(distance);
  if (distanceError) {
    setError(distanceError);
    return;
  }

  const foldError = validateFoldCount(foldCount);
  if (foldError) {
    setError(foldError);
    return;
  }

  const memoError = validateMemo(memo);
  if (memoError) {
    setError(memoError);
    return;
  }

  try {
    const imageStrings: string[] = [];

    // ⭕ 修正箇所2: Fileオブジェクトと既存のURL文字列を判別して処理
    for (const image of completedImages) {
      if (image instanceof File) {
        // 新しく選ばれた File の場合は base64 に変換
        const base64 = await fileToBase64(image);
        imageStrings.push(base64);
      } else if (typeof image === "string") {
        // 既存の画像URL（文字列）ならそのまま配列に残す
        imageStrings.push(image);
      }
    }
    
    const airplane: Airplane = {
      id: editingId ?? crypto.randomUUID(),
      name,
      distance: distance === "" ? undefined : Number(distance),
      foldCount: foldCount === "" ? undefined : Number(foldCount),
      createdDate: createdDate || undefined,
      memo,
      completedImages: imageStrings,
      instructions,
      createdAt: editingCreatedAt ?? Date.now(),
    };

    if (editingId !== null) {
      await updateAirplane(airplane);
    } else {
      await saveAirplane(airplane);
    }

    setSuccess("保存しました");

    await loadAirplanes();

    // フォームの値をリセット
    setName("");
    setDistance("");
    setFoldCount("");
    setCreatedDate("");
    setMemo("");
    setCompletedImages([]); // Propsの型を直したのでここもエラーになりません
    setInstructions([
      {
        id: crypto.randomUUID(),
        text: "",
        images: [],
      },
    ]);

    setEditingId(null);
    setEditingCreatedAt(null);

  } catch (error) {
    if (error instanceof Error) {
      setError(error.message);
    } else {
      setError("保存に失敗しました");
    }
  }
}