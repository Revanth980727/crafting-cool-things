
import React from 'react'
import { FileText, MessageSquare, FileSearch, ListTodo, History, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navigationItems = [
  { icon: FileText, label: 'Documents', active: true },
  { icon: MessageSquare, label: 'Chat' },
  { icon: FileSearch, label: 'Search' },
  { icon: ListTodo, label: 'Tasks' },
  { icon: BarChart3, label: 'Summary' },
  { icon: History, label: 'History' },
]

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <aside className={cn(
      "border-r border-border bg-card transition-all duration-300",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                item.active 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
