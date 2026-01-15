import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { KanbanTask } from '../types'
import { useStore } from '../store/useStore'
import { useState } from 'react'

interface Props {
  task: KanbanTask
}

export function KanbanCard({ task }: Props) {
  const { deleteTask, updateTask } = useStore()
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const handleSave = () => {
    if (editTitle.trim()) {
      updateTask(task.id, { title: editTitle.trim() })
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setEditTitle(task.title)
      setIsEditing(false)
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-[#161616] border border-[#252525] rounded-lg p-3 cursor-grab active:cursor-grabbing ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-sm text-white outline-none"
          autoFocus
        />
      ) : (
        <div className="flex items-start justify-between gap-2">
          <p
            className="text-sm text-[#ccc] flex-1"
            onDoubleClick={() => setIsEditing(true)}
          >
            {task.title}
          </p>
          <button
            onClick={(e) => {
              e.stopPropagation()
              deleteTask(task.id)
            }}
            className="opacity-0 group-hover:opacity-100 text-[#555] hover:text-[#888] transition-opacity text-xs"
          >
            ×
          </button>
        </div>
      )}
    </div>
  )
}
