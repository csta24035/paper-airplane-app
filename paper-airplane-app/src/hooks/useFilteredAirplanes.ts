import type { Airplane } from "../types/airplane";

type Props = {
  airplanes: Airplane[];
  searchKeyword: string;
  sortField: string;
  sortOrder: string;
};

export function useFilteredAirplanes({
  airplanes,
  searchKeyword,
  sortField,
  sortOrder,
}: Props) {

  return airplanes
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
          result =
            a.name.localeCompare(b.name);
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
          result =
            (a.createdDate ?? "")
              .localeCompare(
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

}