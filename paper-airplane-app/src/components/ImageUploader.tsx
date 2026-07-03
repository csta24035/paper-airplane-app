// ImageUploader.tsx
import React from "react";

type Props = {
  completedImages: (File | string)[]; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImageUploader({
  completedImages,
  onChange,
}: Props) {
  return (
    // 💡 textAlign: 'center' を追加して、全体のテキスト（ラベルや件数）を中央寄せに
    <div style={{ fontFamily: 'sans-serif', padding: '16px', textAlign: 'center' }}>
      
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#ffffff' }}>
        完成画像（最大3枚）
      </label>

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={onChange}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '300px',
          // 💡 margin: '0 auto' を追加して、横幅300pxの入力欄自体を中央に寄せます
          margin: '0 auto', 
          padding: '10px',
          backgroundColor: '#ffffff',
          color: '#333333',
          border: '2px solid #ccc',
          borderRadius: '6px',
          fontSize: '14px'
        }}
      />

      <p style={{ marginTop: '12px', color: '#ffffff', fontSize: '14px' }}>
        選択中：<strong>{completedImages.length}</strong> / 3枚
      </p>
    </div>
  );
}