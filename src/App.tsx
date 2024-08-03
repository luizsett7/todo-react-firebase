import React from 'react'
import './App.css'

type Note = {
  id: string
  body: string
  createdAt: string
  updatedAt: string
}

export default function App() {
  const [notes, setNotes] = React.useState<Note[]>([])
}


