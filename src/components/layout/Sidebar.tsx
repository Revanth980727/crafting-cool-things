
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
      "glass-effect border-r border-border/30 transition-all duration-300 ease-out backdrop-blur-xl animate-slide-up",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <nav className="space-y-1">
          {navigationItems.map((item, index) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group hover-lift",
                item.active 
                  ? "bg-gradient-primary text-white shadow-modern" 
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/60 hover:backdrop-blur-sm"
              )}
              style={{
                animationDelay: `${index * 50}ms`
              }}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-all duration-300",
                item.active ? "text-white" : "group-hover:scale-110"
              )} />
              {isOpen && (
                <span className="animate-fade-in">{item.label}</span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Enhanced visual separator */}
      {isOpen && (
        <div className="absolute bottom-4 left-4 right-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>
      )}
    </aside>
  )
}
