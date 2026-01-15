import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'
import { useStore } from '../store/useStore'
import type { KanbanTask, ColumnId } from '../types'
import { KanbanColumn } from './KanbanColumn'
import { KanbanCard } from './KanbanCard'

const columns: { id: ColumnId; title: string }[] = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'complete', title: 'Complete' },
]

export function KanbanBoard() {
  const { tasks, moveTask } = useStore()
  const [activeTask, setActiveTask] = useState<KanbanTask | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveTask(null)

    if (!over) return

    const taskId = active.id as string
    const overId = over.id as string

    // Check if dropped on a column
    const columnIds = columns.map((c) => c.id)
    if (columnIds.includes(overId as ColumnId)) {
      moveTask(taskId, overId as ColumnId)
      return
    }

    // Check if dropped on another task
    const overTask = tasks.find((t) => t.id === overId)
    if (overTask) {
      moveTask(taskId, overTask.columnId)
    }
  }

  return (
    <div className="flex-1 p-6 overflow-auto">
      <h2 className="text-lg font-medium text-white mb-6">Board</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={tasks.filter((t) => t.columnId === column.id)}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <KanbanCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
