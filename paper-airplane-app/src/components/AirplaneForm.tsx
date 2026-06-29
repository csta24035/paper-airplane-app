import ImageUploader from "./ImageUploader";

type Props = {
  name: string;
  setName: (value: string) => void;

  distance: string;
  setDistance: (value: string) => void;

  foldCount: string;
  setFoldCount: (value: string) => void;

  createdDate: string;
  setCreatedDate: (value: string) => void;

  memo: string;
  setMemo: (value: string) => void;

  completedImages: File[];

  handleCompletedImageChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;

  handleSave: () => void;

  editingId: string | null;

  error: string;

  success: string;
};

function AirplaneForm({
  name,
  setName,

  distance,
  setDistance,

  foldCount,
  setFoldCount,

  createdDate,
  setCreatedDate,

  memo,
  setMemo,

  completedImages,
  handleCompletedImageChange,

  handleSave,

  editingId,

  error,

  success,
}: Props) {
  return (
    <>
      <div>
        <label>名前（必須）</label>

        <br />

        <input
          type="text"
          value={name}
          maxLength={100}
          onChange={(e) =>
            setName(e.target.value)
          }
        />
      </div>

      <br />

      <ImageUploader
        completedImages={completedImages}
        onChange={
          handleCompletedImageChange
        }
      />

      <br />

      <div>
        <label>飛距離(m)</label>

        <br />

        <input
          type="number"
          step="0.1"
          min="0.1"
          max="9999.9"
          value={distance}
          onChange={(e) =>
            setDistance(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>折る回数</label>

        <br />

        <input
          type="number"
          min="0"
          max="999"
          value={foldCount}
          onChange={(e) =>
            setFoldCount(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>作成日</label>

        <br />

        <input
          type="date"
          value={createdDate}
          onChange={(e) =>
            setCreatedDate(
              e.target.value
            )
          }
        />
      </div>

      <br />

      <div>
        <label>備考メモ</label>

        <br />

        <textarea
          value={memo}
          rows={5}
          cols={40}
          maxLength={256}
          onChange={(e) =>
            setMemo(e.target.value)
          }
        />
      </div>

      <br />

      <button onClick={handleSave}>
        {editingId ? "更新" : "保存"}
      </button>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {success && (
        <p style={{ color: "green" }}>
          {success}
        </p>
      )}

      <hr />
    </>
  );
}

export default AirplaneForm;