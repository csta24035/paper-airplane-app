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
  
  // 周りの文字色を絶対に白にする
  const whiteTextStyle = {
    color: '#ffffff',
  };

  const formInputStyle = {
    color: '#000000', 
    backgroundColor: '#ffffff',
    border: '1px solid #cccccc',
    borderRadius: '4px',
    padding: '6px 10px',
    fontSize: '1rem',
    outline: 'none'
  };

  const optionStyle = {
    backgroundColor: '#ffffff',
    color: '#000000'
  };

  return (
    <div style={whiteTextStyle}>
      <hr style={{ borderColor: '#444444' }} />

      <h2 style={whiteTextStyle}>検索・ソート</h2>

      <div>
        <label style={whiteTextStyle}>名前検索</label>
        <br />
        <input
          type="text"
          value={searchKeyword}
          style={formInputStyle}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      <br />

      <div>
        <label style={whiteTextStyle}>ソート項目</label>
        <br />
        <select
          value={sortField}
          style={formInputStyle}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name" style={optionStyle}>名前</option>
          <option value="distance" style={optionStyle}>飛距離</option>
          <option value="foldCount" style={optionStyle}>折る回数</option>
          <option value="createdDate" style={optionStyle}>作成日</option>
        </select>
      </div>

      <br />

      <div>
        <label style={whiteTextStyle}>並び順</label>
        <br />
        <select
          value={sortOrder}
          style={formInputStyle}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc" style={optionStyle}>昇順</option>
          <option value="desc" style={optionStyle}>降順</option>
        </select>
      </div>

      <hr style={{ borderColor: '#444444' }} />
    </div>
  );
}

export default SearchSort;