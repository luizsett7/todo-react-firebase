import React from 'react'
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import './App.css'
import {
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  setDoc
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"

type Note = {
  id: string
  body: string
  createdAt: number
  updatedAt: number
}

export default function App() {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [currentNoteId, setCurrentNoteId] = React.useState<string>('')
  const [temporaryNoteText, setTemporaryNoteText] = React.useState<string>('')

  const currentNote: Note =
    notes.find(note => note.id === currentNoteId)
    || notes[0]

  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)

  React.useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        ...doc.data() as Omit<Note, 'id'>,
        id: doc.id
      }))
      setNotes(notesArray)
    })
    return () => unsubscribe()
  }, [])

  React.useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  React.useEffect(() => {
    if (currentNote) {
      setTemporaryNoteText(currentNote.body)
    }
  }, [currentNote])

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
        if (temporaryNoteText !== currentNote.body) {
            updateNote(temporaryNoteText)
        }
    }, 500)
    return () => clearTimeout(timeoutId)
}, [temporaryNoteText])

async function createNewNote() {
    const newNote = {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
}

async function updateNote(text: string) {
    const docRef = doc(db, "notes", currentNoteId)
    await setDoc(
        docRef, 
        { body: text, updatedAt: Date.now() }, 
        { merge: true }
    )
}

async function deleteNote(noteId: string) {
    const docRef = doc(db, "notes", noteId)
    await deleteDoc(docRef)
}

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={sortedNotes}
              currentNote={currentNote}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            <Editor
              temporaryNoteText={temporaryNoteText}
              setTemporaryNoteText={setTemporaryNoteText}
            />
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>

      }
    </main>
  )
}


