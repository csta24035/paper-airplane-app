//InstructionEditor.tsx
type Instruction = {
  id: string;
  text: string;
  images: string[];
};

type Props = {
  instructions: Instruction[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
  onImageChange: (id: string, files: FileList | null) => void;
};

function InstructionEditor({
  instructions,
  onAdd,
  onRemove,
  onTextChange,
  onImageChange,
}: Props) {
  return (
    <>
      {/* 以下の h2 タグに color スタイルを追加しました */}
      <h2 style={{ color: "#fff" }}>
        折り方
      </h2>

      {instructions.map((instruction, index) => (
        <div
          key={instruction.id}
          style={{
            border: "1px solid #ccc",
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
    onTextChange(instruction.id, e.target.value)
  }
  style={{
    backgroundColor: "#fff", // 白背景
    color: "#000",           // 黒文字
    border: "1px solid #ccc",
    borderRadius: "6px",
    padding: "8px",
    width: "100%",
    boxSizing: "border-box",
  }}
/>

          <br />

          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            multiple
            onChange={(e) =>
              onImageChange(instruction.id, e.target.files)
            }
          />

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {instruction.images.map((image, index) => (
              <img key={index} src={image} alt="" width={120} />
            ))}
          </div>

          <div>
            {instruction.text.length}
            /5000文字
          </div>

          <br />

          <button onClick={() => onRemove(instruction.id)}>
            削除
          </button>
        </div>
      ))}

      <button onClick={onAdd}>＋ 手順追加</button>

      <hr />
    </>
  );
}

export default InstructionEditor;