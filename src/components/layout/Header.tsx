
import React from 'react'
import { Menu, Upload, Settings, Play, MessageSquare, ChevronDown, Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
  onToggleSidebar: () => void
  fileName?: string
}

export function Header({ onToggleSidebar, fileName }: HeaderProps) {
  return (
    <header className="glass-effect border-b border-border/30 backdrop-blur-xl">
      {/* Breadcrumb */}
      <div className="px-6 py-3 text-sm text-muted-foreground/80 font-medium">
        <span className="hover:text-foreground transition-colors cursor-pointer">Home</span>
        <span className="mx-2 text-border">/</span>
        <span className="text-foreground">{fileName || 'Upload a PDF'}</span>
      </div>
      
      {/* Main header */}
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="p-2 hover:bg-accent/50 transition-all duration-300 hover:scale-105"
          >
            <Menu className="h-4 w-4" />
          </Button>
          
          {/* Tab-like navigation */}
          <div className="flex items-center gap-1 bg-accent/30 p-1 rounded-lg backdrop-blur-sm">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-white/90 text-primary border border-primary/20 rounded-md shadow-sm font-medium px-4"
            >
              PDF file
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground hover:bg-white/50 transition-all duration-200 px-4"
            >
              Summary
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Play className="h-4 w-4" />
            Podcast
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-white/90 border border-border/50 hover:bg-white hover:shadow-md transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 hover:bg-accent/50 transition-all duration-300"
          >
            en <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}
