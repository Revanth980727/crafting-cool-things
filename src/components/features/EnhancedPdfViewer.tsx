
import React, { useState, useEffect, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

interface EnhancedPdfViewerProps {
  fileId: number | null
  url: string | null
}

export function EnhancedPdfViewer({ fileId, url }: EnhancedPdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [scale, setScale] = useState<number>(1.0)
  const [rotation, setRotation] = useState<number>(0)
  const [pageInput, setPageInput] = useState<string>('1')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setPageInput(pageNumber.toString())
  }, [pageNumber])

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages)
    setPageNumber(1)
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= numPages) {
      setPageNumber(page)
    }
  }

  const handlePageInputChange = (value: string) => {
    setPageInput(value)
    const pageNum = parseInt(value)
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      setPageNumber(pageNum)
    }
  }

  const zoomIn = () => setScale(prev => Math.min(prev + 0.2, 3.0))
  const zoomOut = () => setScale(prev => Math.max(prev - 0.2, 0.5))
  const rotate = () => setRotation(prev => (prev + 90) % 360)

  if (!url) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/20 border-r">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-muted rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-muted-foreground/30 rounded"></div>
          </div>
          <p className="text-muted-foreground">No PDF loaded</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col border-r">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b bg-card">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pageNumber - 1)}
            disabled={pageNumber <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1 text-sm">
            <Input
              value={pageInput}
              onChange={(e) => handlePageInputChange(e.target.value)}
              className="w-12 h-8 text-center"
              size={3}
            />
            <span className="text-muted-foreground">of {numPages}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(pageNumber + 1)}
            disabled={pageNumber >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" size="sm" onClick={zoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground px-2">
            {Math.round(scale * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={zoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={rotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={url} download>
              <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div ref={containerRef} className="flex justify-center p-4">
            <Document
              file={url}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex items-center justify-center h-96">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              }
              error={
                <div className="flex items-center justify-center h-96 text-destructive">
                  Failed to load PDF
                </div>
              }
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
                rotate={rotation}
                loading={
                  <div className="flex items-center justify-center h-96">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                  </div>
                }
              />
            </Document>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
