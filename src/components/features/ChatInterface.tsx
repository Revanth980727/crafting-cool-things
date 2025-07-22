import React, { useState } from 'react'
import { Send, MoreVertical } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ChatInterfaceProps {
  fileId?: number | null
}

const analysisButtons = [
  { label: 'Practical Implications', color: 'bg-blue-100 text-blue-700' },
  { label: 'Limitations', color: 'bg-gray-100 text-gray-700' },
  { label: 'Future works', color: 'bg-green-100 text-green-700' },
  { label: 'Paper Summary', color: 'bg-purple-100 text-purple-700' },
  { label: 'Contributions', color: 'bg-pink-100 text-pink-700' },
  { label: 'Conclusions', color: 'bg-indigo-100 text-indigo-700' },
  { label: 'Results', color: 'bg-yellow-100 text-yellow-700' },
]

export function ChatInterface({ fileId }: ChatInterfaceProps) {
  const [message, setMessage] = useState('')
  const [qualityMode, setQualityMode] = useState(false)

  const handleSend = () => {
    if (!message.trim()) return
    // TODO: Implement chat functionality
    console.log('Sending message:', message)
    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Analysis buttons */}
      <div className="p-4 border-b">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Generate summary of this paper, Results of the paper, Conclusions...
          </p>
          <div className="flex flex-wrap gap-2">
            {analysisButtons.map((button, index) => (
              <Button
                key={index}
                variant="secondary"
                size="sm"
                className={`${button.color} hover:opacity-80 border-0`}
              >
                {button.label}
              </Button>
            ))}
            <Button variant="ghost" size="sm" className="text-blue-600">
              +13 more ↗
            </Button>
          </div>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4">
        <div className="text-center text-muted-foreground text-sm">
          No messages yet. Ask a question about the PDF to get started.
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="quality"
              checked={qualityMode}
              onChange={(e) => setQualityMode(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="quality" className="text-sm">High Quality</label>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask any question..."
            className="flex-1"
          />
          <Button 
            onClick={handleSend}
            disabled={!message.trim()}
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}