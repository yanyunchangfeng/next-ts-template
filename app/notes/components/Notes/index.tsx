import React from 'react';
import { Loading } from '@/app/components';
import { Note } from '@/app/shared';
import { useNotesStore } from '@/app/store';
import { Textarea } from '@headlessui/react';
import { AddNote, Paganition } from '@/app/notes/components';

export const Notes: React.FC = () => {
  const { editNoteId, notes, pending, setEditNoteId, updateNote, setIsOpen, setOpenNote, fetchNotes } = useNotesStore();
  const inputRefs = React.useRef<{ [key: string]: HTMLElement }>({});
  React.useEffect(() => {
    if (editNoteId && inputRefs.current[editNoteId]) {
      inputRefs.current[editNoteId].focus();
    }
  }, [editNoteId]);

  React.useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = (note: Note) => {
    setIsOpen(true);
    setOpenNote(note);
  };
  return React.useMemo(() => {
    if (pending) {
      return <Loading />;
    }
    return (
      <div className="flex flex-col gap-2 flex-1">
        <Paganition />
        <AddNote />
        {notes.data.map((note) => {
          const noteNode =
            editNoteId === note.id ? (
              <Textarea
                // rows={2}
                placeholder="Add a new note"
                className="focus:ring bg-transparent p-2 rounded-md shadow-md flex-1 focus:ring-pink-500 focus:outline-none"
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
                    setEditNoteId('');
                    return;
                  }
                  setEditNoteId('');
                  updateNote({ id: note.id, title: current });
                }}
              />
            ) : (
              <div className="font-medium flex-1 p-5">{note.title}</div>
            );
          const editButton =
            editNoteId !== note.id ? (
              <button
                className="bg-pink-500 text-white p-2 rounded-md shadow-md ml-2 hover:bg-pink-600"
                onClick={() => setEditNoteId(note.id)}
              >
                Edit
              </button>
            ) : null;
          return (
            <div key={note.id} className="p-4 rounded-md shadow-md flex items-center ">
              {noteNode}
              {editButton}
              <button
                className="bg-pink-500 text-white p-2 rounded-md shadow-md ml-2 hover:bg-pink-600"
                onClick={() => handleDelete(note)}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }, [editNoteId, notes, pending]);
};
