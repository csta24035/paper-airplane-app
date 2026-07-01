//App.tsx
import { useEffect, useState } from "react";
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
import type { Airplane, Instruction} from "./types/airplane";
import { useInstructions } from "./hooks/useInstructions";
import {
  validateName,
  validateDistance,
  validateFoldCount,
  validateMemo,
} from "./utils/validation";
import { useAirplanes } from "./hooks/useAirplanes";
import { useImageUploader } from "./hooks/useImageUploader";
import { initDb } from "./db/indexedDb";
import { editAirplane } from "./hooks/useEditAirplane";
import { useFilteredAirplanes }
from "./hooks/useFilteredAirplanes";

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

  const [searchKeyword, setSearchKeyword] =
    useState("");

  const [sortField, setSortField] =
    useState("createdAt");

  const [sortOrder, setSortOrder] =
    useState("desc");

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editingCreatedAt, setEditingCreatedAt, ] =
    useState<number | null>(null);

  const {instructions, setInstructions,} = 
    useInstructions();

  const { airplanes, loadAirplanes, removeAirplane, save, } = 
    useAirplanes();

  const{ completedImages, setCompletedImages, handleCompletedImageChange,} =
    useImageUploader(); 

 async function
onCompletedImageChange(
event:
React.ChangeEvent<HTMLInputElement>
){

try{

await
handleCompletedImageChange(
event
);

setError("");

}catch(error){

if(error instanceof Error){

setError(
error.message
);}}}   

function handleEdit(
  airplane: Airplane
) {
  editAirplane(
    airplane,
    {
      setEditingId,
      setEditingCreatedAt,

      setName,
      setDistance,
      setFoldCount,
      setCreatedDate,
      setMemo,

      setInstructions,
    }
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
    await removeAirplane(id);

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

    setSuccess("削除しました");
    setError("");
  } catch (error) {
    console.error(error);
    setError("削除に失敗しました");
  }
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
 
 async function updateInstructionImages(
  id: string,
  files: FileList | null
) {
  if (!files) {
    return;
  }

  const selectedFiles = Array.from(files);

  // 全手順の画像枚数
  const currentImageCount =
    instructions.reduce(
      (sum, instruction) =>
        sum +
        instruction.images.length,
      0
    );

  if (
    currentImageCount +
      selectedFiles.length >
    50
  ) {
    setError(
      "折り方画像は合計50枚までです"
    );
    return;
  }

  const imageStrings: string[] = [];

  for (const file of selectedFiles) {

    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png"
    ) {
      setError(
        "JPG・PNGのみ登録できます"
      );
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "画像は10MB以下です"
      );
      return;
    }

    const resized =
      await resizeImage(file);

    const base64 =
      await fileToBase64(resized);

    imageStrings.push(base64);
  }

  setInstructions((prev) =>
    prev.map((instruction) =>
      instruction.id === id
        ? {
            ...instruction,
            images: [
              ...instruction.images,
              ...imageStrings,
            ],
          }
        : instruction
    )
  );

  setError("");
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
  useFilteredAirplanes({
    airplanes,
    searchKeyword,
    sortField,
    sortOrder,
  });

  async function handleSave() {
  await saveCurrentAirplane({
    editingId,
    editingCreatedAt,

    name,
    distance,
    foldCount,
    createdDate,
    memo,

    completedImages,
    instructions,

    loadAirplanes,

    setError,
    setSuccess,

    resetForm,
  });
}

function resetForm() {
  setName("");
  setDistance("");
  setFoldCount("");
  setCreatedDate("");
  setMemo("");

  setCompletedImages([]);

  setInstructions([
    {
      id: crypto.randomUUID(),
      text: "",
      images: [],
    },
  ]);

  setEditingId(null);
  setEditingCreatedAt(null);
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
              handleCompletedImageChange={ onCompletedImageChange }
  handleSave={handleSave}
  editingId={editingId}
  error={error}
  success={success}
/>
<InstructionEditor
instructions={instructions}
onAdd={addInstruction}
onRemove={removeInstruction}
onTextChange={updateInstructionText}
onImageChange={
updateInstructionImages
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