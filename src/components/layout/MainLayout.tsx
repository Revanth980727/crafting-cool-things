
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [fileName, setFileName] = useState<string>()

  return (
    <div className="h-screen flex bg-background">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} fileName={fileName} />
        <main className="flex-1 overflow-hidden">
          <Outlet context={{ setFileName }} />
        </main>
      </div>
    </div>
  )
}
