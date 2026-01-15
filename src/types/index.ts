export type ColumnId = 'todo' | 'in-progress' | 'complete'

export interface KanbanTask {
  id: string
  title: string
  description?: string
  columnId: ColumnId
  createdAt: number
}

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export interface Note {
  id: string
  title: string
  content: string
  createdAt: number
  updatedAt: number
}

export type View = 'kanban' | 'todos' | 'notes'
