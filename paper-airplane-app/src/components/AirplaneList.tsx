//AirplaneList.tsx
import type {
  Airplane,
} from "../types/airplane";
import {
Link
} from "react-router-dom";
type Props = {
  airplanes: Airplane[];

onEdit: (
  airplane: Airplane
)=>void;

  onDelete: (id: string) => void;
};

function AirplaneList({
  airplanes,
  onEdit,
  onDelete,
}: Props) {
  if (airplanes.length === 0) {
    return (
      <>
        <h2>登録済み紙飛行機</h2>

        <p>
          該当する紙飛行機はありません
        </p>
      </>
    );
  }

  return (
    <>
      <h2>登録済み紙飛行機</h2>

      <ul>
        {airplanes.map((airplane) => (
          <li key={airplane.id}>
            <Link
to={`/detail/${airplane.id}`}
>

<strong>
{airplane.name}
</strong>

</Link>

            <br />

            {airplane.completedImages
              ?.length > 0 ? (
              <img
                src={
                  airplane
                    .completedImages[0]
                }
                alt={airplane.name}
                width={150}
              />
            ) : (
              <div
                style={{
                  width: 150,
                  height: 100,
                  border:
                    "1px solid gray",
                  display: "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                No Image
              </div>
            )}

            <br />

            飛距離：
            {airplane.distance ??
              "-"}
            m

            <br />

            折る回数：
            {airplane.foldCount ??
              "-"}
            回

            <br />

            作成日：
            {airplane.createdDate ??
              "-"}

            <br />

            備考：
            {airplane.memo ||
              "-"}

            <br />

            登録日時：
            {new Date(
              airplane.createdAt
            ).toLocaleString()}

            <br />

            <button
              onClick={() =>
                onEdit(airplane)
              }
            >
              編集
            </button>

            {" "}

            <button
              onClick={() =>
                onDelete(
                  airplane.id
                )
              }
            >
              削除
            </button>

            <hr />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AirplaneList;