
import React from 'react'
import { Podcast, MessageSquare, ChevronDown, Globe } from 'lucide-react'
import { Button } from '../ui/button'

interface HeaderProps {
  onToggleSidebar: () => void
  fileName?: string
}

export function Header({ onToggleSidebar, fileName }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">
              {fileName || 'drivers-manual.pdf'}
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="bg-white text-orange-600 shadow-sm font-medium border-b-2 border-orange-500 rounded-none"
            >
              PDF file
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900 font-medium rounded-none"
            >
              Summary
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100"
          >
            <Podcast className="h-4 w-4" />
            Podcast
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
          >
            <Globe className="h-4 w-4" />
            en
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </header>
  )
}
