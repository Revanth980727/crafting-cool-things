
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
      <div className="flex items-center gap-3 p-4 border-b border-border/30 bg-card/50 backdrop-blur-sm animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <Input 
              placeholder="Search in document..." 
              className="w-64 pl-10 h-10 bg-background/80 border-border/50 focus:border-primary/50 rounded-lg"
            />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105"
        >
          <Wand2 className="h-4 w-4" />
          Explain math & table
        </Button>
        
        <div className="flex items-center gap-1 ml-auto bg-accent/30 p-1 rounded-lg">
          <Button variant="ghost" size="sm" className="hover:bg-white/60 transition-all duration-200">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm px-3 py-1 bg-background/80 rounded font-medium">128%</span>
          <Button variant="ghost" size="sm" className="hover:bg-white/60 transition-all duration-200">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border/50 mx-1"></div>
          <Button variant="ghost" size="sm" className="hover:bg-white/60 transition-all duration-200">
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-white/60 transition-all duration-200">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-white/60 transition-all duration-200">
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
