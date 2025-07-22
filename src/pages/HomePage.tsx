
import React, { useState } from 'react'
import { FileUploader } from '@/components/features/FileUploader'
import { PdfViewer } from '@/components/features/PdfViewer'

export function HomePage() {
  const [fileId, setFileId] = useState<number | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleFileUploaded = (id: string, url: string) => {
    setFileId(parseInt(id))
    setPdfUrl(url)
  }

  if (!fileId) {
    return (
      <div className="h-full flex items-center justify-center">
        <FileUploader onFileUploaded={handleFileUploaded} />
      </div>
    )
  }

  return (
    <div className="h-full flex">
      <div className="flex-1">
        <PdfViewer url={pdfUrl} />
      </div>
      
      <div className="w-96 border-l bg-card p-4">
        <div className="text-center text-muted-foreground">
          <p>Chat and analysis features coming soon...</p>
        </div>
      </div>
    </div>
  )
}
