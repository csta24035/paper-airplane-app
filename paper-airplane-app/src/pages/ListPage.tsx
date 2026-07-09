//ListPage.tsx
type Props = {
  children: React.ReactNode;
};

const BACKGROUND_IMAGE_URL = 'https://i.imgur.com/ThREANs.jpeg'; 

function ListPage({ children }: Props) {
  const logoText = "GLIDELOG".split("");

  const neonColors = [
    "#ff0055", "#00e5ff", "#00ff66", "#ffaa00",
    "#b800ff", "#ff0055", "#00e5ff", "#00ff66",
  ];

  return (
    <div style={{
      backgroundColor: '#121214', 
      backgroundImage: `linear-gradient(rgba(18, 18, 20, 0.5), rgba(18, 18, 20, 0.5)), url(${BACKGROUND_IMAGE_URL})`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat', 
      backgroundAttachment: 'fixed', // ★ 1. スクロールやピンチインしても背景を固定
      minHeight: '100vh',
      width: '100%', 
      overflowX: 'hidden',           // ★ 2. 万が一のはみ出しによる横スクロールを防止
      color: '#ffffff',
      padding: '40px 20px', 
      boxSizing: 'border-box'
    }}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=DotGothic16&family=Orbitron:wght@700&display=swap');`}
      </style>

      {/* 画面全体のレイアウトを綺麗に保つためのラッパー */}
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%', 
        margin: '0 auto',
        boxSizing: 'border-box' // ★ 3. 幅計算のズレを防止
      }}>
        
        <header style={{ marginBottom: '40px' }}>
          <h1>
            <span style={{
              fontFamily: '"Orbitron", sans-serif',
              fontSize: 'min(2em, 8vw)', // ★ 4. 画面幅に合わせて自動縮小（スマホ対策）
              letterSpacing: '3px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',      // ★ 5. ロゴの途中で意図しない改行が起きるのを防ぐ
            }}>
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

            <span style={{
              display: 'block',
              fontSize: 'min(0.75em, 4vw)', // ★ 4. サブタイトルも画面幅に合わせる
              fontWeight: 'normal',
              color: '#00e5ff',
              fontFamily: '"DotGothic16", sans-serif',
              letterSpacing: '2px'
            }}>
              ～紙飛行機を一括管理～
            </span>
          </h1>
        </header>

        {/* コンテンツ部分 */}
        {/* ★ 6. children の中身が横にはみ出すのを防ぐラッパー */}
        <main style={{ width: '100%', overflowX: 'auto' }}>
          {children}
        </main>
        
      </div>
    </div>
  );
}

export default ListPage;