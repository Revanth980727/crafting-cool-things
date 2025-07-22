
import React from 'react'
import { Search, ZoomIn, ZoomOut, MoreHorizontal, Wand2 } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

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
    <div className="h-full flex flex-col">
      {/* PDF Toolbar */}
      <div className="flex items-center gap-2 p-2 border-b bg-background">
        <div className="flex items-center gap-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search in document..." 
            className="w-48 h-8"
          />
        </div>
        
        <Button variant="outline" size="sm" className="gap-2 bg-purple-100 text-purple-700 border-purple-300">
          <Wand2 className="h-4 w-4" />
          Explain math & table
        </Button>
        
        <div className="flex items-center gap-1 ml-auto">
          <Button variant="ghost" size="sm">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm px-2">128%</span>
          <Button variant="ghost" size="sm">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1">
        <iframe
          src={url}
          className="w-full h-full border-0"
          title="PDF Viewer"
        />
      </div>
    </div>
  )
}
