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

  completedImages: File[];
  instructions: Instruction[];

  loadAirplanes: () => Promise<void>;

  setError: (v: string) => void;
  setSuccess: (v: string) => void;

  resetForm: () => void;
  
  // 💡 下部の処理でフォームのクリア関数（setNameなど）を実行しようとしてエラーになるのを防ぐため、
  // もし必要であれば Props に追加するか、末尾の個別クリア処理を resetForm() に統一してください。
  setName: (v: string) => void;
  setDistance: (v: string) => void;
  setFoldCount: (v: string) => void;
  setCreatedDate: (v: string) => void;
  setMemo: (v: string) => void;
  setCompletedImages: (v: File[]) => void;
  setInstructions: (v: Instruction[]) => void;
  setEditingId: (v: string | null) => void;
  setEditingCreatedAt: (v: number | null) => void;
};

// ✨ 修正ポイント: 引数で正しく props を受け取り、中身の handleSave という二重の関数定義を削除しました
export async function saveCurrentAirplane(props: Props) {
  // 分割代入で props から各変数を取り出す
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

    for (const image of completedImages) {
      const base64 = await fileToBase64(image);
      imageStrings.push(base64);
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

    // DB保存処理 (ファイル内の関数名に合わせて save ではなく saveAirplane もしくは引数フラグによる調整を行ってください)
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
    setCompletedImages([]);
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