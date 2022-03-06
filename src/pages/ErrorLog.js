import React from 'react'

function ErrorLog({ error }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <pre style={{ color: 'black' }}>{error.message}</pre>
    </div>
  )
}
export default ErrorLog
