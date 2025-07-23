import React, { useState } from 'react'
import { Send, MoreVertical, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ChatInterfaceProps {
  fileId?: number | null
}

const analysisButtons = [
  { label: 'Practical Implications', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100' },
  { label: 'Limitations', color: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' },
  { label: 'Future works', color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { label: 'Paper Summary', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
]

const secondRowButtons = [
  { label: 'Contributions', color: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100' },
  { label: 'Conclusions', color: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100' },
  { label: 'Results', color: 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100' },
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
    <div className="h-full flex flex-col bg-white border-l border-gray-200">
      {/* Analysis buttons */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          {analysisButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`${button.color} text-xs px-3 py-1 h-7 rounded-full border font-medium`}
            >
              {button.label}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {secondRowButtons.map((button, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`${button.color} text-xs px-3 py-1 h-7 rounded-full border font-medium`}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            Generate summary of this paper, Results of the paper, Conc
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-blue-600 hover:text-blue-700 p-0 h-auto ml-1 text-xs"
            >
              +13 more ↗
            </Button>
          </p>
        </div>
      </div>

      {/* Chat input */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any question..."
              className="pr-12 h-10 bg-white border-gray-200 focus:border-gray-300 rounded-lg"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="quality"
              checked={qualityMode}
              onChange={(e) => setQualityMode(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-offset-0 w-4 h-4"
            />
            <label htmlFor="quality" className="text-sm text-gray-700">
              High Quality
            </label>
          </div>
          <Button 
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 h-8 px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}