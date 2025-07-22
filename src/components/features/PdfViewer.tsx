
import React from 'react'

interface PdfViewerProps {
  url: string | null
}

export function PdfViewer({ url }: PdfViewerProps) {
  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20">
        <p className="text-muted-foreground">No PDF loaded</p>
      </div>
    )
  }

  return (
    <div className="h-full">
      <iframe
        src={url}
        className="w-full h-full border-0"
        title="PDF Viewer"
      />
    </div>
  )
}
