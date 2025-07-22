
import React, { useState, useCallback } from 'react'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'

interface FileUploaderProps {
  onFileUploaded: (fileId: string, url: string) => void
}

export function FileUploader({ onFileUploaded }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const { toast } = useToast()

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files[0]) {
      setFile(files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })
      
      if (!response.ok) {
        throw new Error('Upload failed')
      }
      
      const data = await response.json()
      
      // Create embed immediately after upload
      const embedFormData = new FormData()
      embedFormData.append('file_id', data.file_id.toString())
      
      await fetch('http://localhost:8000/embed', {
        method: 'POST',
        body: embedFormData,
      })
      
      // Create URL for PDF viewing
      const pdfUrl = `http://localhost:8000/file/${data.file_id}`
      
      onFileUploaded(data.file_id, pdfUrl)
      
      toast({
        title: "Success",
        description: "PDF uploaded and processed successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 animate-fade-in">
      <div
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 hover-lift modern-card",
          dragActive 
            ? 'border-primary bg-gradient-accent backdrop-blur-sm' 
            : 'border-border/50 hover:border-primary/50'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="space-y-6 animate-scale-in">
            <div className="relative">
              <FileText className="h-16 w-16 mx-auto text-primary animate-pulse-slow" />
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-lg text-foreground">{file.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document
              </p>
            </div>
            <Button 
              onClick={handleUpload} 
              disabled={loading}
              className="w-full py-6 text-lg font-medium bg-gradient-primary hover:shadow-modern-lg transition-all duration-300 hover:scale-105"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  Processing Document...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-3" />
                  Upload & Process
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="relative">
              <Upload className="h-20 w-20 mx-auto text-muted-foreground/60" />
              <div className="absolute inset-0 bg-gradient-accent rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold gradient-text">Upload PDF Document</h3>
              <p className="text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Drag and drop your PDF here, or click to browse your files
              </p>
            </div>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Button asChild variant="outline" size="lg" className="px-8 py-6 hover:shadow-modern transition-all duration-300 hover:scale-105 bg-white/90">
              <label htmlFor="file-upload" className="cursor-pointer font-medium">
                Choose File
              </label>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
