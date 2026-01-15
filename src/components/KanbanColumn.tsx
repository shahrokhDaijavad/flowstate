import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import type { KanbanTask, ColumnId } from '../types'
import { KanbanCard } from './KanbanCard'
import { useStore } from '../store/useStore'
import { useState } from 'react'

interface Props {
  id: ColumnId
  title: string
  tasks: KanbanTask[]
}

export function KanbanColumn({ id, title, tasks }: Props) {
  const { addTask } = useStore()
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')

  const { setNodeRef, isOver } = useDroppable({ id })

  const handleAdd = () => {
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle.trim(), id)
      setNewTaskTitle('')
    }
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    } else if (e.key === 'Escape') {
      setNewTaskTitle('')
      setIsAdding(false)
    }
  }

  return (
    <div className="flex-1 min-w-[280px] max-w-[320px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-medium text-[#666] uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-xs text-[#444]">{tasks.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-col gap-2 min-h-[200px] p-2 rounded-lg transition-colors ${
          isOver ? 'bg-[#1a1a1a]' : ''
        }`}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <KanbanCard key={task.id} task={task} />
          ))}
        </SortableContext>

        {isAdding ? (
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onBlur={handleAdd}
            onKeyDown={handleKeyDown}
            placeholder="Task title..."
            className="bg-[#161616] border border-[#252525] rounded-lg p-3 text-sm text-white placeholder-[#444] outline-none focus:border-[#333]"
            autoFocus
          />
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="text-sm text-[#444] hover:text-[#666] text-left px-3 py-2 transition-colors"
          >
            + Add task
          </button>
        )}
      </div>
    </div>
  )
}
