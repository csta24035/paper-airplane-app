import type { Airplane } from "../types/airplane";
import { Link } from "react-router-dom";

type Props = {
  airplanes: Airplane[];
  onEdit: (airplane: Airplane) => void;
  onDelete: (id: string) => void;
};

function AirplaneList({ airplanes, onEdit, onDelete }: Props) {
  if (airplanes.length === 0) {
    return (
      <>
        <h2 style={{ color: "white" }}>登録済み紙飛行機</h2>
        {/* 文字が見えるように白に指定 */}
        <p style={{ color: "white" }}>該当する紙飛行機はありません</p>
      </>
    );
  }

  return (
    <>
      <h2 style={{ color: "white" }}>登録済み紙飛行機</h2>

      {/* <ul> 全体の文字色を白(white)にして、全体の視認性を上げます */}
      <ul style={{ color: "white" }}>
        {airplanes.map((airplane) => (
          <li key={airplane.id} style={{ marginBottom: "20px" }}>
            {/* Link（aタグ）の文字色を鮮やかな水色（#00ffff）に変更。
              textDecoration: "underline" を入れるとリンクらしさが出ます。
            */}
            <Link 
              to={`/detail/${airplane.id}`} 
              style={{ color: "#FFD700", textDecoration: "underline" }}
            >
              <strong>{airplane.name}</strong>
            </Link>

            <br />

            {airplane.completedImages?.length > 0 ? (
              <img
                src={airplane.completedImages[0]}
                alt={airplane.name}
                width={150}
              />
            ) : (
              <div
                style={{
                  width: 150,
                  height: 100,
                  border: "1px solid gray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                No Image
              </div>
            )}

            <br />

            飛距離：{airplane.distance ?? "-"}m
            <br />
            折る回数：{airplane.foldCount ?? "-"}回
            <br />
            作成日：{airplane.createdDate ?? "-"}
            <br />
            備考：{airplane.memo || "-"}
            <br />
            登録日時：
            {new Date(airplane.createdAt).toLocaleString()}
            <br />
            <button onClick={() => onEdit(airplane)}>
              編集(クリックしたら↑に戻って！)
            </button>
            {" "}
            <button onClick={() => onDelete(airplane.id)}>削除</button>
            <hr style={{ borderColor: "#444" }} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AirplaneList;