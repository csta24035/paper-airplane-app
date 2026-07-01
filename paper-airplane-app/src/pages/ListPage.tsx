type Props = {
  children: React.ReactNode;
};

function ListPage({ children }: Props) {
  return (
    <div>
      <h1>
        GlideLog
        <br />{/* 1回目の改行 */}
        <br />{/* 2回目の改行 */}
        <span style={{ display: 'block', fontSize: '0.6em', fontWeight: 'normal', color: '#666' }}>
          紙飛行機を一括管理
        </span>
      </h1>

      {children}
    </div>
  );
}

export default ListPage;