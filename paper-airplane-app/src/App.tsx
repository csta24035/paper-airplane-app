import { useEffect, useState } from "react";
import {
  initDb,
  saveAirplane,
  getAirplaneCount,
  getAllAirplanes,
} from "./db/indexedDb";

function App() {
  const [name, setName] =
    useState("");

  const [memo, setMemo] =
    useState("");

  const [distance, setDistance] =
  useState("");

  const [foldCount, setFoldCount] =
  useState("");

  const [createdDate, setCreatedDate] =
  useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [airplanes, setAirplanes] =
    useState<any[]>([]);

  const [searchKeyword, setSearchKeyword] =
    useState("");

  const [sortField, setSortField] =
    useState("createdAt");

  const [sortOrder, setSortOrder] =
    useState("desc");

  useEffect(() => {
  initDb();
  loadAirplanes();
}, []);

  async function loadAirplanes() {
  const data =
    await getAllAirplanes();

  setAirplanes(data);
}

  const filteredAirplanes =
  airplanes
    .filter((airplane) =>
      airplane.name
        .toLowerCase()
        .includes(
          searchKeyword.toLowerCase()
        )
    )
    .sort((a, b) => {
      let result = 0;

      switch (sortField) {
        case "name":
          result = a.name.localeCompare(
            b.name
          );
          break;

        case "distance":
          result =
            (a.distance ?? 0) -
            (b.distance ?? 0);
          break;

        case "foldCount":
          result =
            (a.foldCount ?? 0) -
            (b.foldCount ?? 0);
          break;

        case "createdDate":
          result = (
            a.createdDate ?? ""
          ).localeCompare(
            b.createdDate ?? ""
          );
          break;

        default:
          result =
            a.createdAt -
            b.createdAt;
      }

      return sortOrder === "asc"
        ? result
        : -result;
    });

  async function handleSave() {
    setError("");
    setSuccess("");

    if (
      name.trim().length < 1
    ) {
      setError(
        "名前は必須です"
      );
      return;
    }

    if (
      name.length > 100
    ) {
      setError(
        "名前は100文字以内です"
      );
      return;
    }

    if (distance !== "") {
  const distanceValue =
    Number(distance);

  if (
    Number.isNaN(distanceValue)
  ) {
    setError(
      "飛距離は数値で入力してください"
    );
    return;
  }

  if (
    distanceValue < 0.1 ||
    distanceValue > 9999.9
  ) {
    setError(
      "飛距離は0.1〜9999.9mです"
    );
    return;
  }
}

if (foldCount !== "") {
  const foldCountValue =
    Number(foldCount);

  if (
    !Number.isInteger(
      foldCountValue
    )
  ) {
    setError(
      "折る回数は整数で入力してください"
    );
    return;
  }

  if (
    foldCountValue < 0 ||
    foldCountValue > 999
  ) {
    setError(
      "折る回数は0〜999回です"
    );
    return;
  }
}

    if (
      memo.length > 256
    ) {
      setError(
        "備考は256文字以内です"
      );
      return;
    }

    const count =
      await getAirplaneCount();

    if (count >= 100) {
      setError(
        "最大100件登録済みです"
      );
      return;
    }

    try {
      await saveAirplane({
  id: crypto.randomUUID(),

  name,

  distance:
    distance === ""
      ? undefined
      : Number(distance),

  foldCount:
    foldCount === ""
      ? undefined
      : Number(foldCount),

  createdDate:
    createdDate || undefined,

  memo,

  completedImageIds: [],

  instructions: [],

  createdAt: Date.now(),
});

      setSuccess(
        "保存しました"
      );

      await loadAirplanes();

      setName("");
      setDistance("");
      setFoldCount("");
      setCreatedDate("");
      setMemo("");

    } catch (error) {
      console.error(
        error
      );

      setError(
        "保存に失敗しました"
      );
    }
  }

  return (
    <div
      style={{
        padding: "20px",
      }}
    >
      <h1>
        紙飛行機記録アプリ
      </h1>

      <div>
        <label>
          名前（必須）
        </label>

        <br />

        <input
          type="text"
          value={name}
          maxLength={100}
          onChange={(e) =>
            setName(
              e.target.value
            )
          }
        />
      </div>

      <br />

<div>
  <label>
    飛距離(m)
  </label>

  <br />

  <input
    type="number"
    step="0.1"
    min="0.1"
    max="9999.9"
    value={distance}
    onChange={(e) =>
      setDistance(
        e.target.value
      )
    }
  />
</div>

<br />

<div>
  <label>
    折る回数
  </label>

  <br />

  <input
    type="number"
    min="0"
    max="999"
    value={foldCount}
    onChange={(e) =>
      setFoldCount(
        e.target.value
      )
    }
  />
</div>

<br />

<div>
  <label>
    作成日
  </label>

  <br />

  <input
    type="date"
    value={createdDate}
    onChange={(e) =>
      setCreatedDate(
        e.target.value
      )
    }
  />
</div>

      <br />

      <div>
        <label>
          備考メモ
        </label>

        <br />

        <textarea
          value={memo}
          maxLength={256}
          rows={5}
          cols={40}
          onChange={(e) =>
            setMemo(
              e.target.value
            )
          }
        />
      </div>

      <br />

      <button
        onClick={
          handleSave
        }
      >
        保存
      </button>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "green",
          }}
        >
          {success}
        </p>
      )}
      <hr />

      <br />

<hr />

<h2>
  検索・ソート
</h2>

<div>
  <label>
    名前検索
  </label>

  <br />

  <input
    type="text"
    value={searchKeyword}
    onChange={(e) =>
      setSearchKeyword(
        e.target.value
      )
    }
  />
</div>

<br />

<div>
  <label>
    ソート項目
  </label>

  <br />

  <select
    value={sortField}
    onChange={(e) =>
      setSortField(
        e.target.value
      )
    }
  >
    <option value="name">
      名前
    </option>

    <option value="distance">
      飛距離
    </option>

    <option value="foldCount">
      折る回数
    </option>

    <option value="createdDate">
      作成日
    </option>
  </select>
</div>

<br />

<div>
  <label>
    並び順
  </label>

  <br />

  <select
    value={sortOrder}
    onChange={(e) =>
      setSortOrder(
        e.target.value
      )
    }
  >
    <option value="asc">
      昇順
    </option>

    <option value="desc">
      降順
    </option>
  </select>
</div>

<hr />

<h2>
  登録済み紙飛行機
</h2>

{filteredAirplanes.length === 0 ? (
  <p>
  該当する紙飛行機はありません
</p>
) : (
  <ul>
    {filteredAirplanes.map(
      (filteredAirplanes) => (
        <li
          key={filteredAirplanes.id}
        >
          <strong>
            {
              filteredAirplanes.name
            }
          </strong>

          <br />

          備考:
          {" "}
          {filteredAirplanes.memo ||
            "-"}

          <br />

          登録日時:
          {" "}
          {new Date(
            filteredAirplanes.createdAt
          ).toLocaleString()}
        </li>
      )
    )}
  </ul>
)}
    </div>
  );
}

export default App;