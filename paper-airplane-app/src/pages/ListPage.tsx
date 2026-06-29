type Props = {
  children: React.ReactNode;
};

function ListPage({
  children,
}: Props) {
  return (
    <div>
      <h1>紙飛行機記録アプリ</h1>

      {children}
    </div>
  );
}

export default ListPage;