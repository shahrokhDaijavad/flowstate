import { useStore } from '../store/useStore'
import type { View } from '../types'

const navItems: { id: View; label: string; icon: string }[] = [
  { id: 'kanban', label: 'Board', icon: '◫' },
  { id: 'todos', label: 'Todos', icon: '☐' },
  { id: 'notes', label: 'Notes', icon: '◧' },
]

export function Sidebar() {
  const { view, setView } = useStore()

  return (
    <aside className="w-48 h-screen bg-[#111] border-r border-[#222] flex flex-col">
      <div className="p-4 border-b border-[#222]">
        <h1 className="text-sm font-medium text-[#888]">vibe.pm</h1>
      </div>
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-colors ${
              view === item.id
                ? 'bg-[#1a1a1a] text-white'
                : 'text-[#666] hover:text-[#999] hover:bg-[#151515]'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
