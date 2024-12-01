'use client';

import React from 'react';
import { isDynamic } from '@/app/shared';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { Loading } from '@/app/components';

interface Note {
  title: string;
  id: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = React.useState<Note[]>([]);
  const [isEditMode, setIsEditMode] = React.useState<string>('');
  const [note, setNote] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  const [openNote, setOpenNote] = React.useState<Note>({
    title: '',
    id: ''
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRefs = React.useRef<{ [key: string]: HTMLInputElement }>({});
  const fetchData = async () => {
    if (!isDynamic) {
      return [];
    }
    const res = await fetch(`/api/notes`);
    const data = await res.json();
    return data as { title: string; id: string }[];
  };
  const fetchNotes = async () => {
    setIsLoading(true);
    const data = await fetchData();
    setNotes(data);
    setIsLoading(false);
  };
  const addNote = async () => {
    const res = await fetch(`/api/notes`, { method: 'POST', body: JSON.stringify({ title: note }) });
    if (res.status !== 200) {
      console.log('Error adding note');
      return;
    }
    const data = await res.json();
    const newId = data?.[0]?.id; // 获取新增记录的 id
    console.log('新插入的 ID:', newId);
    setNote('');
    fetchNotes();
  };
  const updateNote = async (note: Note) => {
    const res = await fetch(`/api/notes`, { method: 'PUT', body: JSON.stringify(note) });
    if (res.status !== 200) {
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
  React.useEffect(() => {
    if (isEditMode && inputRefs.current[isEditMode]) {
      inputRefs.current[isEditMode].focus();
    }
  }, [isEditMode]);

  const handleDelete = (note: Note) => {
    setIsOpen(true);
    setOpenNote(note);
  };

  const noteItems = React.useMemo(() => {
    if (isLoading) {
      return <Loading className="w-96 h-96 border-pink-900" />;
    }
    return notes.map((note) => {
      const noteNode =
        isEditMode === note.id ? (
          <input
            type="text"
            placeholder="Add a new note"
            className="bg-white p-2 rounded-md shadow-md flex-1"
            defaultValue={note.title}
            ref={(el) => {
              // 在这里不返回 el，只保存在 refs 对象中
              if (el) {
                inputRefs.current[note.id] = el;
              }
            }}
            onBlur={(e) => {
              const prev = note.title;
              const current = e.target.value;
              if (current === prev) {
                setIsEditMode('');
                return;
              }
              setIsEditMode('');
              updateNote({ id: note.id, title: current });
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
        <div key={note.id} className="bg-white p-4 rounded-md shadow-md flex items-center ">
          {noteNode}
          {editButton}
          <button className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2" onClick={() => handleDelete(note)}>
            Delete
          </button>
        </div>
      );
    });
  }, [isEditMode, notes, isLoading]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {noteItems}
        <div className="flex ">
          <input
            type="text"
            placeholder="Add a new note"
            className="bg-white p-2 rounded-md shadow-md flex-1"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
            disabled={!note}
            onClick={addNote}
          >
            Add
          </button>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="max-w-lg space-y-4 border bg-blue-500 p-12  text-white">
            <DialogTitle className="font-bold">
              Delete note id:
              {openNote.id}
            </DialogTitle>
            <Description>{openNote.title}</Description>
            <p>Are you sure you want to delete your note? your note will be permanently removed.</p>
            <div className="flex gap-4">
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button
                onClick={async () => {
                  await deleteNote(openNote.id);
                  setIsOpen(false);
                }}
              >
                OK
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default Notes;
