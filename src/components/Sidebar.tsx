import React from "react"

interface Note {
    id: string
    body: string
}

interface SidebarProps {
    notes: Note[]
    currentNote: Note
    setCurrentNoteId: (id: string) => void
    deleteNote: (id: string) => void
    newNote: () => void
}

const Sidebar: React.FC<SidebarProps> = ({
    notes,
    currentNote,
    setCurrentNoteId,
    deleteNote,
    newNote
}) => {
    const noteElements = notes.map((note) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent click event from bubbling up to the parent div
                        deleteNote(note.id);
                    }}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ))

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}

export default Sidebar
