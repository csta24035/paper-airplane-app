//AirplaneForm.tsx
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

  completedImages: (File | string)[];

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
  // ★ スマホでの表示を固定するための共通スタイル
  const inputStyle = {
    backgroundColor: "#ffffff", // 背景を白に固定
    color: "#333333",           // 文字色を濃いグレー（または黒）に固定
    border: "1px solid #ccc",   // 薄いグレーの枠線をつける
    borderRadius: "4px",        // 角を少し丸くする（お好みで）
    padding: "6px 8px",         // 内側に少し余白を作る（お好みで）
    fontSize: "16px",           // iPhoneでズームされるのを防ぐため16px以上がおすすめ
  };

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
          style={inputStyle} // ★ スタイルを適用
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
          style={inputStyle} // ★ スタイルを適用
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
          style={inputStyle} // ★ スタイルを適用
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
          style={inputStyle} // ★ スタイルを適用
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
          style={inputStyle} // ★ スタイルを適用
        />
      </div>

      <br />

      <button
  onClick={handleSave}
  style={{
    fontSize: "20px",      // ←文字を大きく
    fontWeight: "bold",    // ←太字
    padding: "12px 24px",  // ←クリックできる範囲を広くする
    borderRadius: "12px",  // ←角を丸くする
    cursor: "pointer",     // ←マウスカーソルを指にする
    border: "none",        // ←枠線を消す
    backgroundColor: "#4CAF50", // ←緑色
    color: "white",        // ←文字を白
  }}
>
  {editingId ? "更新" : "保存(詳しい折り方は↓から入力！)"}
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