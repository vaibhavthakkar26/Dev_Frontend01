import React from 'react'

function ErrorDisplay({errorMsg}) {
  return (
    <div>
      <h3 style={{color:"red"}}>{errorMsg}</h3>
    </div>
  )
}

export default ErrorDisplay
