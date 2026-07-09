//App.tsx
import { useState } from "react";
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
import InstructionEditor from "./components/InstructionEditor";
import type { Airplane } from "./types/airplane";
import { useInstructions } from "./hooks/useInstructions";
import { useAirplanes } from "./hooks/useAirplanes";
import { useImageUploader } from "./hooks/useImageUploader";
import { useFilteredAirplanes } from "./hooks/useFilteredAirplanes";
import { saveCurrentAirplane } from "./hooks/useSaveAirplane";

function App() {
  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [distance, setDistance] = useState("");
  const [foldCount, setFoldCount] = useState("");
  const [createdDate, setCreatedDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingCreatedAt, setEditingCreatedAt] = useState<number | null>(null);

  const { instructions, setInstructions } = useInstructions();
  const { airplanes, loadAirplanes, removeAirplane } = useAirplanes();
  const { completedImages, setCompletedImages, handleCompletedImageChange } = useImageUploader(); 

  // ★ 編集ボタンがクリックされた時の正しい処理
  const handleEdit = (airplane: Airplane) => {
    setEditingId(airplane.id);
    setEditingCreatedAt(airplane.createdAt);
    setName(airplane.name);
    
    // 型エラー対策: number型をstring型に変換してフォームのStateにセットする
    setDistance(airplane.distance !== undefined && airplane.distance !== null ? String(airplane.distance) : "");
    setFoldCount(airplane.foldCount !== undefined && airplane.foldCount !== null ? String(airplane.foldCount) : "");
    setCreatedDate(airplane.createdDate ?? "");
    setMemo(airplane.memo ?? "");
    
    // 既存の画像URL(string[])をフォーム側の画像Stateにそのまま渡すことで、消えるのを防ぐ
    setCompletedImages(airplane.completedImages ?? []);
    
    // 折り方手順データがある場合はそれもセット
    if (airplane.instructions) {
      setInstructions(airplane.instructions);
    }
  };

  async function onCompletedImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      await handleCompletedImageChange(event);
      setError("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }   

  async function handleDelete(id: string) {
    const result = window.confirm("この紙飛行機を削除しますか？");
    if (!result) return;

    try {
      await removeAirplane(id);
      if (editingId === id) {
        resetForm();
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

  function removeInstruction(id: string) {
    setInstructions((prev) => {
      if (prev.length === 1) return prev;
      return prev.filter((item) => item.id !== id);
    });
  }
 
  async function updateInstructionImages(id: string, files: FileList | null) {
    if (!files) return;

    const selectedFiles = Array.from(files);
    const currentImageCount = instructions.reduce(
      (sum, instruction) => sum + instruction.images.length, 0
    );

    if (currentImageCount + selectedFiles.length > 50) {
      setError("折り方画像は合計50枚までです");
      return;
    }

    const imageStrings: string[] = [];

    for (const file of selectedFiles) {
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        setError("JPG・PNGのみ登録できます");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("画像は10MB以下です");
        return;
      }

      const resized = await resizeImage(file);
      const base64 = await fileToBase64(resized);
      imageStrings.push(base64);
    }

    setInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id
          ? { ...instruction, images: [...instruction.images, ...imageStrings] }
          : instruction
      )
    );
    setError("");
  }

  function updateInstructionText(id: string, text: string) {
    setInstructions((prev) =>
      prev.map((instruction) =>
        instruction.id === id ? { ...instruction, text } : instruction
      )
    );
  }

  const filteredAirplanes = useFilteredAirplanes({
    airplanes,
    searchKeyword,
    sortField,
    sortOrder,
  });

  // 保存・更新処理の呼び出し
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
      setName,
      setDistance,
      setFoldCount,
      setCreatedDate,
      setMemo,
      setCompletedImages,
      setInstructions,
      setEditingId,
      setEditingCreatedAt,
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
          element = {
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
                handleCompletedImageChange={onCompletedImageChange}
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
                onImageChange={updateInstructionImages}
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
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;