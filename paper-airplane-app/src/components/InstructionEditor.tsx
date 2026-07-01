type Instruction = {
  id: string;
  text: string;
  images: string[];
};

type Props = {
  instructions: Instruction[];

  onAdd: () => void;

  onRemove: (
    id: string
  ) => void;

  onTextChange: (
  id: string,
  text: string
) => void;
};

function InstructionEditor({
  instructions,
  onAdd,
  onRemove,
  onTextChange,
}: Props) {
  return (
    <>
      <h2>
        折り方
      </h2>

      {instructions.map(
        (
          instruction,
          index
        ) => (
          <div
            key={
              instruction.id
            }
            style={{
              border:
                "1px solid #ccc",
              padding: 10,
              marginBottom: 10,
            }}
          >
            <h3>
              手順
              {index + 1}
            </h3>

            <textarea
  rows={4}
  cols={40}
  maxLength={5000}
  placeholder="折り方を入力してください"

  value={instruction.text}

  onChange={(e) =>
    onTextChange(
      instruction.id,
      e.target.value
    )
  }
/>

<div>
  {instruction.text.length}
  /5000文字
</div>

            <br />

            <button
              onClick={() =>
                onRemove(
                  instruction.id
                )
              }
            >
              削除
            </button>
          </div>
        )
      )}

      <button
        onClick={onAdd}
      >
        ＋ 手順追加
      </button>

      <hr />
    </>
  );
}

export default
  InstructionEditor;