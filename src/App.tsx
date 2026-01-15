import { useStore } from './store/useStore'
import { Sidebar } from './components/Sidebar'
import { KanbanBoard } from './components/KanbanBoard'
import { TodoList } from './components/TodoList'
import { NotesArea } from './components/NotesArea'

function App() {
  const { view } = useStore()

  return (
    <div className="flex h-screen bg-[#0a0a0a]">
      <Sidebar />
      <main className="flex-1 flex overflow-hidden">
        {view === 'kanban' && <KanbanBoard />}
        {view === 'todos' && <TodoList />}
        {view === 'notes' && <NotesArea />}
      </main>
    </div>
  )
}

export default App
