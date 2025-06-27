export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 1rem'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: '600',
          color: '#374151',
          letterSpacing: '-0.025em',
          margin: 0
        }}>
          Hello World
        </h1>
        
        <p style={{
          marginTop: '1rem',
          fontSize: 'clamp(1.125rem, 3vw, 1.25rem)',
          color: '#6b7280',
          fontWeight: '300'
        }}>
          A simple beginning to something great
        </p>
      </div>
    </div>
  );
}
