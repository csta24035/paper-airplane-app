type Props = {
  children: React.ReactNode;
};

function ListPage({ children }: Props) {
  return (
  
    <div style={{ 
      backgroundColor: '#121214', // 背景色（ダークグレー）
      minHeight: '100vh',         // 画面の縦幅いっぱいに背景を広げる
      color: '#ffffff',           // 基本の文字色を白にして見やすく
      padding: '20px',            // 画面端の余白（お好みで調整）
      boxSizing: 'border-box'
    }}>
      {/* 1. 英語(Orbitron)と日本語(DotGothic16)のテック系フォントを両方読み込み */}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Orbitron:wght@700&display=swap');
      </style>

      <h1>
        {/* メインの英語ロゴ */}
        <span style={{ 
          fontFamily: '"Orbitron", sans-serif', 
          fontSize: '1.6em', 
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: '#00e5ff'
        }}>
          GlideLog
        </span>
        
        <br /><br />
        
        {/* サブタイトルの日本語 */}
        <span style={{ 
          display: 'block', 
          fontSize: '0.625em', 
          fontWeight: 'normal', 
          color: '#aaa', 
          fontFamily: '"DotGothic16", sans-serif', 
          letterSpacing: '2px' 
        }}>
          ～紙飛行機を一括管理～
        </span>
      </h1>

      {children}
    </div>
  );
}

export default ListPage;