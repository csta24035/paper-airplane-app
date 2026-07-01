import { useEffect, useState } from "react";
import {
  initDb,
  saveAirplane,
  updateAirplane,
  deleteAirplane,
  getAirplaneCount,
  getAllAirplanes,
} from "./db/indexedDb";
import { resizeImage } from "./utils/image";
import { fileToBase64 } from "./utils/file";
import SearchSort from "./components/SearchSort";
import AirplaneList from "./components/AirplaneList";
import AirplaneForm from "./components/AirplaneForm";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import InstructionEditor
from "./components/InstructionEditor";

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

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editingCreatedAt, setEditingCreatedAt] =
    useState<number | null>(null);

  const [completedImages, setCompletedImages] =
    useState<File[]>([]);

  const [instructions, setInstructions] =
    useState([
    {
      id: crypto.randomUUID(),
      text: "",
      images: [],
    },
  ]);

  useEffect(() => {
  initDb();
  loadAirplanes();
}, []);

  async function loadAirplanes() {
  const data =
    await getAllAirplanes();

  setAirplanes(data);
}

function handleEdit(airplane: any) {
  setEditingId(airplane.id);

  setName(airplane.name);

  setDistance(
    airplane.distance?.toString() ?? ""
  );

  setFoldCount(
    airplane.foldCount?.toString() ?? ""
  );

  setCreatedDate(
    airplane.createdDate ?? ""
  );

  setMemo(
    airplane.memo ?? ""
  );

  setEditingCreatedAt(
    airplane.createdAt
  );
}

async function handleDelete(id: string) {
  const result = window.confirm(
    "この紙飛行機を削除しますか？"
  );

  if (!result) {
    return;
  }

  try {
    await deleteAirplane(id);

    // 編集中のデータを削除した場合
    if (editingId === id) {
      setEditingId(null);
      setEditingCreatedAt(null);

      setName("");
      setDistance("");
      setFoldCount("");
      setCreatedDate("");
      setMemo("");
    }

    await loadAirplanes();

    setSuccess("削除しました");
    setError("");
  } catch (error) {
    console.error(error);
    setError("削除に失敗しました");
  }
}

async function handleCompletedImageChange(
  event: React.ChangeEvent<HTMLInputElement>
) {
  const files = event.target.files;

  if (!files) {
    return;
  }

  const fileArray = Array.from(files);

  if (fileArray.length > 3) {
    setError("完成画像は3枚までです");
    return;
  }

  for (const file of fileArray) {
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      setError("JPGまたはPNGのみ登録できます");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError("画像は1枚10MB以下です");
      return;
    }
  }

const resizedFiles: File[] = [];

for (const file of fileArray) {
  const resized =
    await resizeImage(file);

  resizedFiles.push(resized);
}

setCompletedImages(resizedFiles);
  setError("");
}

function addInstruction() {
  setInstructions((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      text: "",
      images: [],
    },
  ]);
}

function removeInstruction(
  id: string
) {
  setInstructions((prev) => {
    if (prev.length === 1) {
      return prev;
    }

    return prev.filter(
      (item) =>
        item.id !== id
    );
  });
}
 
 function updateInstructionText(
  id: string,
  text: string
) {
  setInstructions((prev) =>
    prev.map((instruction) =>
      instruction.id === id
        ? {
            ...instruction,
            text,
          }
        : instruction
    )
  );
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
      const imageStrings: string[] = [];

for (const image of completedImages) {
  const base64 =
    await fileToBase64(image);

  imageStrings.push(base64);
}
      const airplane = {
  id:
    editingId ??
    crypto.randomUUID(),

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

  completedImages: imageStrings,

  instructions,

  createdAt:
  editingCreatedAt ??
  Date.now(),
};

if (editingId) {
  await updateAirplane(airplane);
} else {
  await saveAirplane(airplane);
}

      setSuccess(
        "保存しました"
      );

      await loadAirplanes();

      setName("");
      setDistance("");
      setFoldCount("");
      setCreatedDate("");
      setMemo("");
      setCompletedImages([]);

      setEditingId(null);
      setEditingCreatedAt(
        null
      );

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
    <HashRouter>
    <Routes>
      <Route
        path="/"
        element={
          <ListPage>

            <AirplaneForm
              name={name}
              setName={setName}
              distance={distance}
              setDistance={setDistance}
              foldCount={foldCount}
              setFoldCount={setFoldCount}
              createdDate={createdDate}
              setCreatedDate={setCreatedDate}
              memo={memo}
              setMemo={setMemo}
              completedImages={completedImages}
              handleCompletedImageChange={
    handleCompletedImageChange
  }
  handleSave={handleSave}
  editingId={editingId}
  error={error}
  success={success}
/>
<InstructionEditor
  instructions={instructions}
  onAdd={addInstruction}
  onRemove={removeInstruction}
  onTextChange={
    updateInstructionText
  }
/>

      <br />

<SearchSort
  searchKeyword={searchKeyword}
  setSearchKeyword={setSearchKeyword}
  sortField={sortField}
  setSortField={setSortField}
  sortOrder={sortOrder}
  setSortOrder={setSortOrder}
/>

<AirplaneList
  airplanes={filteredAirplanes}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>

</ListPage>
}
/>

<Route
path="/detail/:id"
element={<DetailPage/>}
/>

</Routes>

    </HashRouter>
  );
}

export default App;