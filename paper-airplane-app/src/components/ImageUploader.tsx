type Props = {
  completedImages: File[];

  onChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
};

function ImageUploader({
  completedImages,
  onChange,
}: Props) {
  return (
    <div>
      <label>
        完成画像（最大3枚）
      </label>

      <br />

      <input
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={onChange}
      />

      <p>
        選択中：
        {completedImages.length}
        /3枚
      </p>
    </div>
  );
}

export default ImageUploader;