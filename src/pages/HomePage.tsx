
import React, { useState } from 'react'
import { FileUploader } from '@/components/features/FileUploader'
import { PdfViewer } from '@/components/features/PdfViewer'
import { ChatInterface } from '@/components/features/ChatInterface'
import { AnalysisPanel } from '@/components/features/AnalysisPanel'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function HomePage() {
  const [fileId, setFileId] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleFileUploaded = (id: string, url: string) => {
    setFileId(id)
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
      <div className="flex-1 border-r border-border">
        <PdfViewer url={pdfUrl} />
      </div>
      
      <div className="w-96 flex flex-col">
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 m-4 mb-2">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="flex-1 m-0">
            <ChatInterface fileId={fileId} />
          </TabsContent>
          
          <TabsContent value="analysis" className="flex-1 m-0 p-4">
            <AnalysisPanel fileId={fileId} />
          </TabsContent>
          
          <TabsContent value="summary" className="flex-1 m-0 p-4">
            <div className="text-center text-muted-foreground">
              Summary functionality coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
