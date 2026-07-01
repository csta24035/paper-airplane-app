import { openDB } from "idb";
import type { Airplane } from "../types/airplane";

export const dbPromise = openDB(
  "paper-airplane-db",
  1,
  {
    upgrade(db) {
      if (!db.objectStoreNames.contains("airplanes")) {
        db.createObjectStore("airplanes", {
          keyPath: "id",
        });
      }
    },
  }
);

export async function initDb() {
  try {
    await dbPromise;

    console.log(
      "IndexedDB接続成功"
    );
  } catch (error) {
    console.error(
      "IndexedDB接続失敗",
      error
    );
  }
}

export async function saveAirplane(
  airplane: Airplane
) {
  const db = await dbPromise;

  await db.put(
    "airplanes",
    airplane
  );
}

export async function getAirplaneCount() {
  const db = await dbPromise;

  return await db.count(
    "airplanes"
  );
}
export async function getAllAirplanes() {
  const db = await dbPromise;

  return await db.getAll(
    "airplanes"
  );
}
export async function updateAirplane(
  airplane: Airplane
) {
  const db = await dbPromise;

  await db.put("airplanes", airplane);
}
export async function deleteAirplane(id: string) {
  const db = await dbPromise;

  await db.delete("airplanes", id);
}
export async function getAirplaneById(
  id: string
) {
  const db = await dbPromise;

  return await db.get(
    "airplanes",
    id
  );
}