type Props = {
  children: React.ReactNode;
};

function ListPage({ children }: Props) {
  // 1. ロゴの文字を1文字ずつの配列にする
  const logoText = "GLIDELOG".split("");

  // 2. 1文字ずつにあてる未来感のあるネオンカラーの配列（好きな色に変えられます！）
  const neonColors = [
    "#ff0055", // G: ピンク
    "#00e5ff", // L: 水色
    "#00ff66", // I: ライムグリーン
    "#ffaa00", // D: オレンジ
    "#b800ff", // E: パープル
    "#ff0055", // L: ピンク（リピート）
    "#00e5ff", // O: 水色
    "#00ff66", // G: ライムグリーン
  ];

  return (
    <div style={{ 
      backgroundColor: '#121214', 
      minHeight: '100vh',         
      color: '#ffffff',           
      padding: '20px',            
      boxSizing: 'border-box'
    }}>
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
        }}>
          {/* ★ 配列をループさせて1文字ずつ<span>で色をあてる */}
          {logoText.map((char, index) => (
            <span 
              key={index} 
              style={{ color: neonColors[index % neonColors.length] }}
            >
              {char}
            </span>
          ))}
        </span>
        
        <br /><br />
        
        {/* サブタイトルの日本語 */}
        <span style={{ 
          display: 'block', 
          fontSize: '0.625em', 
          fontWeight: 'normal', 
          color: '#00e5ff', 
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