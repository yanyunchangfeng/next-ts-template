'use client';

import React from 'react';
import { isDynamic } from '@/app/shared';

const fetchData = async () => {
  if (!isDynamic) {
    return [];
  }
  const res = await fetch(`/api/notes`);
  const data = await res.json();
  return data as { title: string; id: string }[];
};
interface Note {
  title: string;
  id: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [isEditMode, setIsEditMode] = React.useState<string>('');
  const [note, setNote] = React.useState('');
  const fetchNotes = async () => {
    const data = await fetchData();
    setNotes(data);
  };
  const addNote = async () => {
    const data = await fetch(`/api/notes`, { method: 'POST', body: JSON.stringify({ title: note }) });
    if (data.status !== 200) {
      console.log('Error adding note');
      return;
    }
    setNote('');
    fetchNotes();
  };
  const updateNote = async (note: Note) => {
    const data = await fetch(`/api/notes`, { method: 'PUT', body: JSON.stringify(note) });
    if (data.status !== 200) {
      console.log('Error update note');
      return;
    }
    fetchNotes();
  };
  const deleteNote = async (id: string) => {
    const data = await fetch(`/api/notes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (data.status !== 200) {
      console.log('Error deleting note');
      return;
    }
    fetchNotes();
  };
  React.useEffect(() => {
    fetchNotes();
  }, []);

  const noteItems = React.useMemo(() => {
    return notes.map((note) => {
      const noteNode =
        isEditMode === note.id ? (
          <input
            type="text"
            placeholder="Add a new note"
            className="bg-white p-2 rounded-md shadow-md flex-1"
            defaultValue={note.title}
            onBlur={(e) => {
              setIsEditMode('');
              updateNote({ id: note.id, title: e.target.value });
            }}
          />
        ) : (
          <h2 className="text-lg font-medium flex-1">{note.title}</h2>
        );
      const editButton =
        isEditMode !== note.id ? (
          <button
            className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2"
            onClick={() => setIsEditMode(note.id)}
          >
            Edit
          </button>
        ) : null;
      return (
        <div key={note.id} className="bg-white p-4 rounded-md shadow-md flex">
          {noteNode}
          {editButton}
          <button className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2" onClick={() => deleteNote(note.id)}>
            Delete
          </button>
        </div>
      );
    });
  }, [isEditMode, notes]);

  return (
    <div className="flex flex-col gap-4">
      {noteItems}
      <div className="flex ">
        <input
          type="text"
          placeholder="Add a new note"
          className="bg-white p-4 rounded-md shadow-md flex-1"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2" onClick={addNote}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Notes;
