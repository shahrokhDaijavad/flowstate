import { useStore } from '../store/useStore'

export function NotesArea() {
  const { notes, activeNoteId, setActiveNote, addNote, updateNote, deleteNote } =
    useStore()

  const activeNote = notes.find((n) => n.id === activeNoteId)

  return (
    <div className="flex-1 flex">
      {/* Notes sidebar */}
      <div className="w-56 border-r border-[#1a1a1a] p-3 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-[#888]">Notes</h2>
          <button
            onClick={addNote}
            className="text-[#555] hover:text-[#888] transition-colors text-lg leading-none"
          >
            +
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setActiveNote(note.id)}
              className={`w-full text-left px-3 py-2 rounded text-sm mb-1 transition-colors ${
                activeNoteId === note.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#666] hover:text-[#999] hover:bg-[#151515]'
              }`}
            >
              <p className="truncate">{note.title || 'Untitled'}</p>
              <p className="text-xs text-[#444] truncate mt-0.5">
                {note.content.slice(0, 40) || 'Empty note'}
              </p>
            </button>
          ))}
          {notes.length === 0 && (
            <p className="text-xs text-[#444] text-center py-4">
              No notes yet
            </p>
          )}
        </div>
      </div>

      {/* Note editor */}
      <div className="flex-1 flex flex-col">
        {activeNote ? (
          <>
            <div className="flex items-center justify-between px-6 py-3 border-b border-[#1a1a1a]">
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) =>
                  updateNote(activeNote.id, { title: e.target.value })
                }
                placeholder="Note title"
                className="bg-transparent text-white text-lg font-medium outline-none flex-1"
              />
              <button
                onClick={() => deleteNote(activeNote.id)}
                className="text-[#444] hover:text-[#666] transition-colors text-sm"
              >
                Delete
              </button>
            </div>
            <textarea
              value={activeNote.content}
              onChange={(e) =>
                updateNote(activeNote.id, { content: e.target.value })
              }
              placeholder="Start writing..."
              className="flex-1 bg-transparent text-[#ccc] text-sm leading-relaxed p-6 outline-none resize-none placeholder-[#333]"
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[#444] text-sm mb-2">No note selected</p>
              <button
                onClick={addNote}
                className="text-sm text-[#555] hover:text-[#888] transition-colors"
              >
                Create a new note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
