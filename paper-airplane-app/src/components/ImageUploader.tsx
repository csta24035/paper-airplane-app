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
    maxWidth: '450px', // 💡 300pxから「450px」などに広げるとPCでも見栄えが良くなります
    margin: '0 auto', 
    padding: '12px',   // スマホでも押しやすいように少し厚めに
    backgroundColor: '#ffffff',
    color: '#333333',
    border: '2px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    boxSizing: 'border-box' // 💡 横幅の計算を狂わせないために追加
  }}
/>

      <p style={{ marginTop: '12px', color: '#ffffff', fontSize: '14px' }}>
        選択中：<strong>{completedImages.length}</strong> / 3枚
      </p>
    </div>
  );
}