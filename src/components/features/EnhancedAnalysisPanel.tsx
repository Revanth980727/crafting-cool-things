
import React, { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { ChevronDown, ChevronRight, FileText, CheckSquare, Search, Brain, Target, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { apiClient } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'

interface EnhancedAnalysisPanelProps {
  fileId: number | null
}

interface AnalysisSection {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string }>
  content?: string
  expanded: boolean
}

export function EnhancedAnalysisPanel({ fileId }: EnhancedAnalysisPanelProps) {
  const [sections, setSections] = useState<AnalysisSection[]>([
    { id: 'summary', title: 'Document Summary', icon: FileText, expanded: true },
    { id: 'tasks', title: 'Action Items', icon: CheckSquare, expanded: false },
    { id: 'implications', title: 'Practical Implications', icon: Target, expanded: false },
    { id: 'limitations', title: 'Limitations', icon: AlertTriangle, expanded: false },
    { id: 'future', title: 'Future Research', icon: Brain, expanded: false },
  ])
  
  const [searchQuery, setSearchQuery] = useState('')
  const { toast } = useToast()

  // Fetch summary
  const summaryQuery = useQuery({
    queryKey: ['summary', fileId],
    queryFn: () => fileId ? apiClient.getSummary(fileId) : null,
    enabled: false,
  })

  // Fetch tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks', fileId],
    queryFn: () => fileId ? apiClient.getTasks(fileId) : null,
    enabled: false,
  })

  // Search mutation
  const searchMutation = useMutation({
    mutationFn: ({ fileId, query }: { fileId: number; query: string }) =>
      apiClient.search(fileId, query),
    onError: () => {
      toast({
        title: "Error",
        description: "Search failed. Please try again.",
        variant: "destructive",
      })
    }
  })

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section =>
      section.id === sectionId
        ? { ...section, expanded: !section.expanded }
        : section
    ))
  }

  const generateContent = async (sectionId: string) => {
    if (!fileId) return

    if (sectionId === 'summary') {
      summaryQuery.refetch()
    } else if (sectionId === 'tasks') {
      tasksQuery.refetch()
    }
  }

  const handleSearch = () => {
    if (!searchQuery.trim() || !fileId) return
    searchMutation.mutate({ fileId, query: searchQuery.trim() })
  }

  const getSectionContent = (sectionId: string): string | undefined => {
    switch (sectionId) {
      case 'summary':
        return summaryQuery.data?.summary
      case 'tasks':
        return tasksQuery.data?.tasks
      default:
        return undefined
    }
  }

  const getSectionLoading = (sectionId: string): boolean => {
    switch (sectionId) {
      case 'summary':
        return summaryQuery.isFetching
      case 'tasks':
        return tasksQuery.isFetching
      default:
        return false
    }
  }

  if (!fileId) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <Brain className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>Upload a PDF to see analysis</p>
        </div>
      </div>
    )
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-4">
        {/* Search Section */}
        <div className="space-y-3">
          <h3 className="font-medium flex items-center gap-2">
            <Search className="h-4 w-4" />
            Semantic Search
          </h3>
          <div className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in document..."
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              disabled={searchMutation.isPending || !searchQuery.trim()}
              size="sm"
            >
              {searchMutation.isPending ? 'Searching...' : 'Search'}
            </Button>
          </div>
          
          {searchMutation.data && (
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {searchMutation.data.results.map((result, index) => (
                <div key={index} className="text-xs bg-muted/50 rounded p-2">
                  <p className="text-muted-foreground line-clamp-3">{result.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analysis Sections */}
        {sections.map((section) => {
          const content = getSectionContent(section.id)
          const isLoading = getSectionLoading(section.id)
          const Icon = section.icon

          return (
            <div key={section.id} className="border rounded-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="font-medium text-sm">{section.title}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!content && (
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        generateContent(section.id)
                      }}
                      disabled={isLoading}
                      variant="outline"
                      size="sm"
                    >
                      {isLoading ? 'Generating...' : 'Generate'}
                    </Button>
                  )}
                  {section.expanded ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </button>
              
              {section.expanded && (
                <div className="px-3 pb-3">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : content ? (
                    <div className="text-sm text-muted-foreground bg-muted/30 rounded p-3 whitespace-pre-wrap">
                      {content}
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground text-center py-4">
                      Click "Generate" to analyze this aspect
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
}
