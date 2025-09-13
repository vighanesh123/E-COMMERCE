import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#111827',
          margin: 0,
          textAlign: 'center'
        }}>
          ElectroShop - Test Version
        </h1>
      </header>
      
      <main style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '24px',
          color: '#374151',
          marginBottom: '20px'
        }}>
          Welcome to ElectroShop!
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '30px'
        }}>
          Your one-stop shop for electronics
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '30px'
        }}>
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#111827', marginBottom: '10px' }}>Phones</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Latest smartphones</p>
          </div>
          
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#111827', marginBottom: '10px' }}>Laptops</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>High-performance laptops</p>
          </div>
          
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#111827', marginBottom: '10px' }}>Speakers</h3>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>Premium audio equipment</p>
          </div>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#dbeafe',
          borderRadius: '8px',
          border: '1px solid #93c5fd'
        }}>
          <p style={{ color: '#1e40af', fontWeight: 'bold', margin: 0 }}>
            ✅ React App is Working! No White Screen!
          </p>
          <p style={{ color: '#1e40af', fontSize: '14px', margin: '10px 0 0 0' }}>
            If you see this, the deployment is successful.
          </p>
        </div>
      </main>
      
      <footer style={{
        textAlign: 'center',
        marginTop: '40px',
        padding: '20px',
        color: '#6b7280',
        fontSize: '14px'
      }}>
        <p>&copy; 2024 ElectroShop. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
