
import React, { useState } from 'react'
import { FileUploader } from '@/components/features/FileUploader'
import { EnhancedPdfViewer } from '@/components/features/EnhancedPdfViewer'
import { EnhancedChatInterface } from '@/components/features/EnhancedChatInterface'
import { EnhancedAnalysisPanel } from '@/components/features/EnhancedAnalysisPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
        <EnhancedPdfViewer fileId={fileId} url={pdfUrl} />
      </div>
      
      <div className="w-96 flex flex-col border-l">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 m-4 mb-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 m-0">
            <EnhancedChatInterface fileId={fileId} />
          </TabsContent>
          
          <TabsContent value="analysis" className="flex-1 m-0">
            <EnhancedAnalysisPanel fileId={fileId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
