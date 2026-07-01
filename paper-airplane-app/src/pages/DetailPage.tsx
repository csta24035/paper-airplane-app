import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getAirplaneById,
} from "../db/indexedDb";

function DetailPage() {
  const { id } = useParams();
  const navigate =
  useNavigate();

  const [
    airplane,
    setAirplane,
  ] = useState<any>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;

      const data =
        await getAirplaneById(id);

      setAirplane(data);
    }

    load();
  }, [id]);

  if (!airplane) {
    return (
      <div style={{ padding: 20 }}>
        読み込み中...
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>
        紙飛行機詳細
      </h1>

      <h2>
        {airplane.name}
      </h2>

      {airplane.completedImages?.length >
      0 ? (
        <img
          src={
            airplane.completedImages[0]
          }
          alt={airplane.name}
          style={{
  width: "100%",
  maxWidth: "500px",
  borderRadius: "8px",
}}
        />
      ) : (
        <div
          style={{
            width: 300,
            height: 180,
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

      <p>
        飛距離：
        {airplane.distance ??
          "-"}
        m
      </p>

      <p>
        折る回数：
        {airplane.foldCount ??
          "-"}
        回
      </p>

      <p>
        作成日：
        {airplane.createdDate ??
          "-"}
      </p>
      <h3>
折り方
</h3>

{airplane.instructions
?.length === 0 ? (

<p>
登録されていません
</p>

) : (

airplane.instructions.map(
(step: any,index:number)=>(

<div key={step.id}>

<h4>
手順{index+1}
</h4>

<p>
{step.text}
</p>

</div>

))

)}

<p>
まだ登録されていません
</p>

      <p>
        備考：
        {airplane.memo ||
          "-"}
      </p>
      <button
  onClick={() =>
    navigate("/")
  }
>
  編集する
</button>

{" "}
      <hr />

<button
  onClick={() => navigate("/")}
>
  ← 一覧へ戻る
</button>
    </div>
    
  );
  
}

export default DetailPage;