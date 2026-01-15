import { useState } from 'react'
import { useStore } from '../store/useStore'
import { TodoItem } from './TodoItem'

export function TodoList() {
  const { todos, addTodo } = useStore()
  const [newTodo, setNewTodo] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      addTodo(newTodo.trim())
      setNewTodo('')
    }
  }

  const activeTodos = todos.filter((t) => !t.completed)
  const completedTodos = todos.filter((t) => t.completed)

  return (
    <div className="flex-1 p-6 max-w-2xl">
      <h2 className="text-lg font-medium text-white mb-6">Todos</h2>

      <form onSubmit={handleAdd} className="mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          className="w-full bg-[#161616] border border-[#252525] rounded-lg px-4 py-3 text-sm text-white placeholder-[#444] outline-none focus:border-[#333] transition-colors"
        />
      </form>

      {activeTodos.length > 0 && (
        <div className="mb-6">
          {activeTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {completedTodos.length > 0 && (
        <div>
          <p className="text-xs text-[#555] uppercase tracking-wide mb-2 px-3">
            Completed
          </p>
          {completedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      {todos.length === 0 && (
        <p className="text-sm text-[#444] text-center py-8">
          No todos yet. Add one above.
        </p>
      )}
    </div>
  )
}
