import React from "react";

type Props = {
  completedImages: File[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ImageUploader({
  completedImages,
  onChange,
}: Props) {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
        完成画像（最大3枚）
      </label>

      {/* 👇 スマホでも絶対に背景が白、文字が濃いグレーになるように指定 */}
      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={onChange}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '300px',
          padding: '10px',
          backgroundColor: '#ffffff', // 💡 ここで背景色を「白」に強制
          color: '#333333',           // 💡 文字色を「濃いグレー」に強制
          border: '2px solid #ccc',   // 💡 枠線を少し太くして見やすく
          borderRadius: '6px',        // 💡 角を少し丸く
          fontSize: '14px'
        }}
      />

      <p style={{ marginTop: '12px', color: '#666', fontSize: '14px' }}>
        選択中：<strong>{completedImages.length}</strong> / 3枚
      </p>
    </div>
  );
}