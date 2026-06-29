type Props = {
  searchKeyword: string;
  setSearchKeyword: (value: string) => void;

  sortField: string;
  setSortField: (value: string) => void;

  sortOrder: string;
  setSortOrder: (value: string) => void;
};

function SearchSort({
  searchKeyword,
  setSearchKeyword,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder,
}: Props) {
  return (
    <>
      <hr />

      <h2>検索・ソート</h2>

      <div>
        <label>名前検索</label>

        <br />

        <input
          type="text"
          value={searchKeyword}
          onChange={(e) =>
            setSearchKeyword(e.target.value)
          }
        />
      </div>

      <br />

      <div>
        <label>ソート項目</label>

        <br />

        <select
          value={sortField}
          onChange={(e) =>
            setSortField(e.target.value)
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
        <label>並び順</label>

        <br />

        <select
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
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
    </>
  );
}

export default SearchSort;