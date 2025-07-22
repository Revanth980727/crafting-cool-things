
import React from 'react'
import { Menu, Upload, Settings, Play, MessageSquare, ChevronDown } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
  onToggleSidebar: () => void
  fileName?: string
}

export function Header({ onToggleSidebar, fileName }: HeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm text-muted-foreground">
        Home / {fileName || 'Upload a PDF'}
      </div>
      
      {/* Main header */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="p-2"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {/* Tab-like navigation */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-orange-600 border-b-2 border-orange-600 rounded-none">
              PDF file
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              Summary
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 text-orange-600 border-orange-600">
            <Play className="h-4 w-4" />
            Podcast
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          <Button variant="ghost" size="sm" className="gap-1">
            en <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}
