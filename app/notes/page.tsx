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

const Notes: React.FC = () => {
  const [notes, setNotes] = React.useState<{ title: string; id: string }[]>([]);
  const [note, setNote] = React.useState('');
  const fetchNotes = async () => {
    const data = await fetchData();
    setNotes(data);
  };
  const addNotes = async () => {
    const data = await fetch(`/api/notes`, { method: 'POST', body: JSON.stringify({ title: note }) });
    if (data.status !== 200) {
      console.log('Error adding note');
      return;
    }
    setNote('');
    fetchNotes();
  };
  React.useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-lg font-medium">{note.title}</h2>
        </div>
      ))}
      <div className="flex ">
        <input
          type="text"
          placeholder="Add a new note"
          className="bg-white p-4 rounded-md shadow-md flex-1"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-4 rounded-md shadow-md ml-2" onClick={addNotes}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Notes;
