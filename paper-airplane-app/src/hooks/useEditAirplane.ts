// useEditAirplane.ts
import type {
  Airplane,
  Instruction,
} from "../types/airplane";

type Props = {
  setEditingId: (
    id: string | null
  ) => void;

  setEditingCreatedAt: (
    value: number | null
  ) => void;

  setName: (
    value: string
  ) => void;

  setDistance: (
    value: string
  ) => void;

  setFoldCount: (
    value: string
  ) => void;

  setCreatedDate: (
    value: string
  ) => void;

  setMemo: (
    value: string
  ) => void;

  // ✨ 修正: 完成画像をセットするための型定義を追加
  setCompletedImages: (
    images: string[]
  ) => void;

  setInstructions: React.Dispatch<
    React.SetStateAction<
      Instruction[]
    >
  >;
};

export function editAirplane(
  airplane: Airplane,
  props: Props
) {
  props.setEditingId(
    airplane.id
  );

  props.setEditingCreatedAt(
    airplane.createdAt
  );

  props.setName(
    airplane.name
  );

  props.setDistance(
    airplane.distance?.toString() ??
      ""
  );

  props.setFoldCount(
    airplane.foldCount?.toString() ??
      ""
  );

  props.setCreatedDate(
    airplane.createdDate ??
      ""
  );

  props.setMemo(
    airplane.memo ?? ""
  );

  // ✨ 修正: 既存の完成画像をフォームのStateにセットする処理を追加
  props.setCompletedImages(
    airplane.completedImages ?? []
  );

  props.setInstructions(
    airplane.instructions ??
      [
        {
          id: crypto.randomUUID(),
          text: "",
          images: [],
        },
      ]
  );
}