import React, { useState } from 'react'
import { Send, MoreVertical, Sparkles, TrendingUp } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface ChatInterfaceProps {
  fileId?: number | null
}

const analysisButtons = [
  { label: 'Practical Implications', color: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100', icon: TrendingUp },
  { label: 'Limitations', color: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100' },
  { label: 'Future works', color: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100' },
  { label: 'Paper Summary', color: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100' },
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
    <div className="h-full flex flex-col glass-effect border-l border-border/30">
      {/* Analysis buttons */}
      <div className="p-6 border-b border-border/30 animate-fade-in">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground font-medium">
              AI-Powered Analysis
            </p>
          </div>
          <p className="text-sm text-muted-foreground/80 leading-relaxed">
            Generate summary of this paper, analyze results, conclusions and more...
          </p>
          <div className="flex flex-wrap gap-2">
            {analysisButtons.map((button, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`${button.color} hover:scale-105 transition-all duration-200 border font-medium`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {button.icon && <button.icon className="h-3 w-3 mr-1" />}
                {button.label}
              </Button>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:bg-primary/10 font-medium hover:scale-105 transition-all duration-200"
            >
              +13 more ↗
            </Button>
          </div>
        </div>
      </div>

      {/* Chat messages area */}
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 mx-auto bg-gradient-accent rounded-full flex items-center justify-center">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">Ready to Analyze</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ask any question about your PDF to get started with AI-powered insights
            </p>
          </div>
        </div>
      </div>

      {/* Chat input */}
      <div className="p-6 border-t border-border/30 space-y-4 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="quality"
                checked={qualityMode}
                onChange={(e) => setQualityMode(e.target.checked)}
                className="rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
              />
              <label htmlFor="quality" className="text-sm font-medium text-foreground">
                High Quality Mode
              </label>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="hover:bg-accent/50">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask any question..."
              className="pr-12 py-6 text-base bg-background/80 border-border/50 focus:border-primary/50 rounded-xl backdrop-blur-sm"
            />
            <Button 
              onClick={handleSend}
              disabled={!message.trim()}
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-gradient-primary hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}