//useAirplanes.ts
import { useEffect, useState } from "react";

import {
  initDb,
  getAllAirplanes,
  deleteAirplane,
  saveAirplane,
  updateAirplane,
  getAirplaneCount,
} from "../db/indexedDb";

import type {
  Airplane,
} from "../types/airplane";

export function useAirplanes() {

  const [airplanes, setAirplanes] =
    useState<Airplane[]>([]);

  useEffect(() => {
    initDb();
    loadAirplanes();
  }, []);

  async function loadAirplanes() {
    const data =
      await getAllAirplanes();

    setAirplanes(data);
  }

  async function removeAirplane(
    id: string
  ) {
    await deleteAirplane(id);

    await loadAirplanes();
  }

  async function save(
  airplane: Airplane,
  editing: boolean
) {

  const count =
    await getAirplaneCount();

  if (
    !editing &&
    count >= 100
  ) {
    throw new Error(
      "最大100件登録済みです"
    );
  }

  if (editing) {
    await updateAirplane(
      airplane
    );
  } else {
    await saveAirplane(
      airplane
    );
  }

  await loadAirplanes();
}

  return {
    airplanes,
    loadAirplanes,
    removeAirplane,
    save,
  };
}