
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, FileText, CheckSquare } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface AnalysisPanelProps {
  fileId: string
}

export function AnalysisPanel({ fileId }: AnalysisPanelProps) {
  const [summary, setSummary] = useState<string>('')
  const [tasks, setTasks] = useState<string>('')
  const [loadingSummary, setLoadingSummary] = useState(false)
  const [loadingTasks, setLoadingTasks] = useState(false)
  const { toast } = useToast()

  const generateSummary = async () => {
    setLoadingSummary(true)
    try {
      const response = await fetch(`http://localhost:8000/summary?file_id=${fileId}`)
      const data = await response.json()
      setSummary(data.summary)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary",
        variant: "destructive",
      })
    } finally {
      setLoadingSummary(false)
    }
  }

  const extractTasks = async () => {
    setLoadingTasks(true)
    try {
      const response = await fetch(`http://localhost:8000/tasks?file_id=${fileId}`)
      const data = await response.json()
      setTasks(data.tasks)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to extract tasks",
        variant: "destructive",
      })
    } finally {
      setLoadingTasks(false)
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Document Summary
            </h3>
            <Button
              onClick={generateSummary}
              disabled={loadingSummary}
              size="sm"
              variant="outline"
            >
              {loadingSummary ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Generate'
              )}
            </Button>
          </div>
          {summary ? (
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
              {summary}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              Click "Generate" to create a summary
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              Action Items
            </h3>
            <Button
              onClick={extractTasks}
              disabled={loadingTasks}
              size="sm"
              variant="outline"
            >
              {loadingTasks ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Extract'
              )}
            </Button>
          </div>
          {tasks ? (
            <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 whitespace-pre-wrap">
              {tasks}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              Click "Extract" to find action items
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  )
}
