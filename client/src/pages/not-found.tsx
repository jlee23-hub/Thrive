import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f9fafb'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        margin: '0 1rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        <div style={{
          display: 'flex',
          marginBottom: '1rem',
          gap: '0.5rem',
          alignItems: 'center'
        }}>
          <AlertCircle style={{ height: '2rem', width: '2rem', color: '#ef4444' }} />
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#111827'
          }}>404 Page Not Found</h1>
        </div>

        <p style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#6b7280'
        }}>
          Did you forget to add the page to the router?
        </p>
      </div>
    </div>
  );
}
