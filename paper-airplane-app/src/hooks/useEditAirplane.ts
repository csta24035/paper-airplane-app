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