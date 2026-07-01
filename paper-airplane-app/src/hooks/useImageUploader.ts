import { useState } from "react";
import { resizeImage } from "../utils/image";

export function useImageUploader() {
  const [completedImages, setCompletedImages] =
    useState<File[]>([]);

  async function handleCompletedImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = event.target.files;

    if (!files) {
      return;
    }

    const fileArray = Array.from(files);

    if (fileArray.length > 3) {
      throw new Error("完成画像は3枚までです");
    }

    const resizedFiles: File[] = [];

    for (const file of fileArray) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/png"
      ) {
        throw new Error("JPGまたはPNGのみ登録できます");
      }

      if (file.size > 10 * 1024 * 1024) {
        throw new Error("画像は1枚10MB以下です");
      }

      resizedFiles.push(
        await resizeImage(file)
      );
    }

    setCompletedImages(resizedFiles);
  }

  return {
    completedImages,
    setCompletedImages,
    handleCompletedImageChange,
  };
}