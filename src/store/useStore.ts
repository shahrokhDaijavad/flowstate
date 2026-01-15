import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { KanbanTask, TodoItem, Note, View, ColumnId } from '../types'

interface AppState {
  view: View
  setView: (view: View) => void

  // Kanban
  tasks: KanbanTask[]
  addTask: (title: string, columnId: ColumnId) => void
  updateTask: (id: string, updates: Partial<KanbanTask>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, columnId: ColumnId) => void

  // Todos
  todos: TodoItem[]
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  deleteTodo: (id: string) => void

  // Notes
  notes: Note[]
  activeNoteId: string | null
  setActiveNote: (id: string | null) => void
  addNote: () => void
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
}

const generateId = () => Math.random().toString(36).substring(2, 9)

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      view: 'kanban',
      setView: (view) => set({ view }),

      // Kanban
      tasks: [],
      addTask: (title, columnId) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: generateId(),
              title,
              columnId,
              createdAt: Date.now(),
            },
          ],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      moveTask: (id, columnId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, columnId } : task
          ),
        })),

      // Todos
      todos: [],
      addTodo: (text) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              id: generateId(),
              text,
              completed: false,
              createdAt: Date.now(),
            },
          ],
        })),
      toggleTodo: (id) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        })),
      deleteTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),

      // Notes
      notes: [],
      activeNoteId: null,
      setActiveNote: (id) => set({ activeNoteId: id }),
      addNote: () =>
        set((state) => {
          const newNote: Note = {
            id: generateId(),
            title: 'Untitled',
            content: '',
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }
          return {
            notes: [...state.notes, newNote],
            activeNoteId: newNote.id,
          }
        }),
      updateNote: (id, updates) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
          activeNoteId: state.activeNoteId === id ? null : state.activeNoteId,
        })),
    }),
    {
      name: 'vibe-pm-storage',
    }
  )
)
