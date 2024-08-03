import React from 'react'
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
  createdAt: string
  updatedAt: string
}

type CurrentNoteId = {
  id: string
}

type TemporaryNoteText = {
  body: string
}

export default function App() {
  const [notes, setNotes] = React.useState<Note[]>([])
  const [currentNoteId, setCurrentNoteId] = React.useState<CurrentNoteId[]>([])
  const [temporaryNoteText, setTemporaryNoteText] = React.useState<TemporaryNoteText[]>([])

  const currentNote: Note =
        notes.find(note => note.id === currentNoteId)
        || notes[0]

  const sortedNotes = [...notes].sort((a, b) => b.updatedAt - a.updatedAt)
}


