import React from 'react'

interface props {
    file:any
}

const PDFviewer = ({file}:any) => {
  return (
    <div style={{width: '100%', height: '800px'}}>
        <embed style={{width: '100%', height: '100%'}} src={file.file} type="application/pdf"></embed>
    </div>
  )
}

export default PDFviewer