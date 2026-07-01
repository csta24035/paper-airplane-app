import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllAirplanes } from "../db/indexedDb";
import type {
  Airplane,
  Instruction,
} from "../types/airplane";

function DetailPage() {
  const { id } = useParams();

  const [airplane,
setAirplane]=
useState<Airplane | null>(
null
);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const airplanes =
      await getAllAirplanes();

    const target =
airplanes.find(
(a: Airplane)=> a.id === id
      );

    setAirplane(target);
  }

  if (!airplane) {
    return (
      <div style={{ padding: 20 }}>
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <Link to="/">
        ← 一覧へ戻る
      </Link>

      <h1>{airplane.name}</h1>

      <h2>完成画像</h2>

      {airplane.completedImages
        ?.length > 0 ? (
        airplane.completedImages.map(
          (
            image: string,
            index: number
          ) => (
            <img
              key={index}
              src={image}
              alt=""
              width={250}
              style={{
                marginRight: 10,
                marginBottom: 10,
              }}
            />
          )
        )
      ) : (
        <p>画像なし</p>
      )}

      <hr />

      <p>
        <strong>飛距離：</strong>

        {airplane.distance ??
          "-"}
        m
      </p>

      <p>
        <strong>折る回数：</strong>

        {airplane.foldCount ??
          "-"}
        回
      </p>

      <p>
        <strong>作成日：</strong>

        {airplane.createdDate ??
          "-"}
      </p>

      <hr />

      <h2>折り方</h2>

      {airplane.instructions
        ?.length > 0 ? (
        airplane.instructions.map(
          (
            instruction: Instruction,
            index: number
          ) => (
            <div
              key={instruction.id}
              style={{
                border:
                  "1px solid #ccc",
                padding: 10,
                marginBottom: 20,
              }}
            >
              <h3>
                手順
                {index + 1}
              </h3>

              <p>
                {instruction.text ||
                  "説明なし"}
              </p>

              {instruction.images.map(
                (
                  image: string,
                  imageIndex: number
                ) => (
                  <img
                    key={imageIndex}
                    src={image}
                    alt=""
                    width={180}
                    style={{
                      marginRight: 10,
                      marginBottom: 10,
                    }}
                  />
                )
              )}
            </div>
          )
        )
      ) : (
        <p>折り方なし</p>
      )}

      <hr />

      <h2>備考</h2>

      <p>
        {airplane.memo || "-"}
      </p>
    </div>
  );
}

export default DetailPage;