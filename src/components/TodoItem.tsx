import type { TodoItem as TodoItemType } from '../types'
import { useStore } from '../store/useStore'

interface Props {
  todo: TodoItemType
}

export function TodoItem({ todo }: Props) {
  const { toggleTodo, deleteTodo } = useStore()

  return (
    <div className="group flex items-center gap-3 py-2 px-3 hover:bg-[#151515] rounded-lg transition-colors">
      <button
        onClick={() => toggleTodo(todo.id)}
        className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-[#333] border-[#333] text-[#888]'
            : 'border-[#333] hover:border-[#444]'
        }`}
      >
        {todo.completed && <span className="text-xs">✓</span>}
      </button>
      <span
        className={`flex-1 text-sm ${
          todo.completed ? 'text-[#555] line-through' : 'text-[#ccc]'
        }`}
      >
        {todo.text}
      </span>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-[#888] transition-opacity text-xs"
      >
        ×
      </button>
    </div>
  )
}
