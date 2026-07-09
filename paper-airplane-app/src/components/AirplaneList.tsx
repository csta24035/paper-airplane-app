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
            {/* Link（aタグ）の文字色を変更。
              textDecoration: "underline" を入れるとリンクらしさが出ます。
            */}
            <Link 
              to={`/detail/${airplane.id}`} 
              style={{ color: "#FFD700", textDecoration: "underline", fontSize: "1.5rem" }}
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
            <button
  onClick={() => onEdit(airplane)}
  style={{
    fontSize: "18px",         // 文字を大きく
    fontWeight: "bold",       // 太字
    padding: "10px 20px",     // クリック範囲を広く
    borderRadius: "12px",     // 角を丸く
    border: "none",
    cursor: "pointer",
    backgroundColor: "#2196F3", // 青色
    color: "white",
    marginRight: "10px",      // 削除ボタンとの間隔
  }}
>
  編集(クリックしたら↑に戻って！)
</button>

<button
  onClick={() => onDelete(airplane.id)}
  style={{
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#f44336", // 赤色
    color: "white",
  }}
>
  削除
</button>
            <hr style={{ borderColor: "#444" }} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AirplaneList;