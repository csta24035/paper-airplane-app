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
  // ★ スマホとPCで共通してレスポンシブ対応するためのスタイル
  const inputStyle = {
    backgroundColor: "#ffffff", 
    color: "#333333",           
    border: "1px solid #ccc",   
    borderRadius: "4px",        
    padding: "8px 12px",        
    fontSize: "16px",            // iPhoneの自動ズーム防止

    width: "100%",               // 基本は横幅いっぱい
    maxWidth: "400px",           // PCでの最大幅
    boxSizing: "border-box" as const, 
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
          onChange={(e) => setName(e.target.value)}
          style={inputStyle} 
        />
      </div>

      <br />

      <ImageUploader
        completedImages={completedImages}
        onChange={handleCompletedImageChange}
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
          onChange={(e) => setDistance(e.target.value)}
          style={inputStyle} 
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
          onChange={(e) => setFoldCount(e.target.value)}
          // 💡 width を auto に、maxWidth を none に上書きして最初のサイズ感に戻します
          style={{
            ...inputStyle,
            width: "auto",
            maxWidth: "none",
          }}
        />
      </div>

      <br />

      <div>
        <label>作成日</label>
        <br />
        <input
          type="date"
          value={createdDate}
          onChange={(e) => setCreatedDate(e.target.value)}
          // 💡 width を auto に、maxWidth を none に上書きして最初のサイズ感に戻します
          style={{
            ...inputStyle,
            width: "auto",
            maxWidth: "none",
          }}
        />
      </div>

      <br />

      <div>
        <label>備考メモ</label>
        <br />
        <textarea
          value={memo}
          rows={5}
          maxLength={256}
          onChange={(e) => setMemo(e.target.value)}
          style={{
            ...inputStyle,
            maxWidth: "600px", 
          }}
        />
      </div>

      <br />

      <button
        onClick={handleSave}
        style={{
          fontSize: "20px",      
          fontWeight: "bold",    
          padding: "12px 24px",  
          borderRadius: "12px",  
          cursor: "pointer",     
          border: "none",        
          backgroundColor: "#4CAF50", 
          color: "white",        
        }}
      >
        {editingId ? "更新" : "保存(詳しい折り方は↓から入力！)"}
      </button>

      {error && (
        <p style={{ 
          color: "white", 
          backgroundColor: "#d32f2f", /* エラー用の赤背景 */
          padding: "8px 16px", 
          borderRadius: "8px",
          display: "inline-block",
          fontWeight: "bold"
        }}>
          ⚠️ {error}
        </p>
      )}

      {success && (
        <p style={{ 
          color: "white", 
          backgroundColor: "#388e3c", /* 成功用の緑背景 */
          padding: "8px 16px", 
          borderRadius: "8px",
          display: "inline-block",
          fontWeight: "bold"
        }}>
          ✅ {success}
        </p>
      )}

      {/* ↓この3行を追加して閉じてください！ */}
      <hr />
    </>
  );
}

export default AirplaneForm;