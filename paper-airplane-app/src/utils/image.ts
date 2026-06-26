export async function resizeImage(
  file: File
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        const maxSize = 1920;

        if (
          width > maxSize ||
          height > maxSize
        ) {
          if (width > height) {
            height =
              (height * maxSize) /
              width;
            width = maxSize;
          } else {
            width =
              (width * maxSize) /
              height;
            height = maxSize;
          }
        }

        const canvas =
          document.createElement(
            "canvas"
          );

        canvas.width = width;
        canvas.height = height;

        const ctx =
          canvas.getContext("2d");

        if (!ctx) {
          reject(
            new Error(
              "Canvas初期化失敗"
            )
          );
          return;
        }

        ctx.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        const isJpeg =
          file.type ===
          "image/jpeg";

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(
                new Error(
                  "画像生成失敗"
                )
              );
              return;
            }

            resolve(
              new File(
                [blob],
                file.name,
                {
                  type: file.type,
                }
              )
            );
          },
          file.type,
          isJpeg
            ? 0.8
            : undefined
        );
      };

      img.onerror = reject;

      img.src =
        reader.result as string;
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}