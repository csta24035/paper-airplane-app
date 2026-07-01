import { useState } from "react";

export function useAirplaneCrud(
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
) {
  return {};
}