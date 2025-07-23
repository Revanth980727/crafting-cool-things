
import React from 'react'
import { Search, ZoomIn, ZoomOut, MoreHorizontal, Wand2, Download, RotateCw } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface PdfViewerProps {
  url: string | null
}

export function PdfViewer({ url }: PdfViewerProps) {
  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-accent/20">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center">
            <span className="text-white text-3xl">📄</span>
          </div>
          <p className="text-muted-foreground font-medium">No PDF loaded</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      {/* PDF Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Search" 
              className="w-48 pl-10 h-9 bg-gray-50 border-gray-200 focus:border-gray-300 rounded-md text-sm"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 h-9 px-3"
          >
            <Wand2 className="h-4 w-4" />
            Explain math & table
          </Button>
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100">
            <Search className="h-4 w-4" />
          </Button>
          <span className="text-sm px-2 py-1 bg-gray-100 rounded text-gray-700">128%</span>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0 hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 relative">
        <iframe
          src={url}
          className="w-full h-full border-0 bg-white"
          title="PDF Viewer"
        />
        {/* Loading overlay could be added here */}
      </div>
    </div>
  )
}
