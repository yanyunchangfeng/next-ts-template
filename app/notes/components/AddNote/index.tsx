import { useNotesStore } from '@/app/store';
import { Textarea } from '@headlessui/react';
import { FC } from 'react';

export const AddNote: FC = () => {
  const { addNoteTitle, addNote, setAddNoteTitle } = useNotesStore();
  return (
    <div className="flex items-center">
      <Textarea
        rows={2}
        placeholder="Add a new note"
        className="bg-white p-2 rounded-md shadow-md flex-1"
        value={addNoteTitle}
        onChange={(e) => setAddNoteTitle(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded-md shadow-md ml-2 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
        disabled={!addNoteTitle}
        onClick={addNote}
      >
        Add
      </button>
    </div>
  );
};
