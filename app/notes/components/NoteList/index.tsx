import { Note } from '@/app/shared';
import { useNotesStore } from '@/app/store';
import { Popover, PopoverButton, PopoverPanel, Textarea } from '@headlessui/react';
import React from 'react';

export const NoteList: React.FC = () => {
  const { editNoteId, notes, setEditNoteId, updateNote, setIsOpen, setOpenNote } = useNotesStore();
  const inputRefs = React.useRef<{ [key: string]: HTMLTextAreaElement }>({});

  React.useEffect(() => {
    if (editNoteId && inputRefs.current[editNoteId]) {
      inputRefs.current[editNoteId].focus();
      inputRefs.current[editNoteId]?.setSelectionRange(
        inputRefs.current[editNoteId].value.length,
        inputRefs.current[editNoteId].value.length
      );
    }
  }, [editNoteId]);

  const handleDelete = (note: Note) => {
    setIsOpen(true);
    setOpenNote(note);
  };

  return (
    <>
      {notes.data.map((note) => {
        const noteNode =
          editNoteId === note.id ? (
            <Textarea
              // rows={2}
              placeholder="Add a new note"
              className="focus:ring bg-transparent px-2 pt-4  rounded-md shadow-md flex-1 focus:ring-red-500 focus:outline-none"
              defaultValue={note.title}
              ref={(el: HTMLTextAreaElement) => {
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
                updateNote({ id: note.id, title: current, created_at: note.created_at });
              }}
            />
          ) : (
            <div className="font-medium flex-1 pl-2 py-5 flex gap-2 items-center truncate">
              <Popover className="flex-1 truncate flex ">
                <PopoverButton className="truncate font-semibold focus:outline-none data-[active]:text-white data-[hover]:text-white ">
                  {note.title}
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className="break-all whitespace-pre-line w-96 p-2 divide-y divide-white/5 rounded-xl  bg-red-500  text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  transition
                >
                  {note.title}
                </PopoverPanel>
              </Popover>
              <Popover>
                <PopoverButton className="font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white ">
                  (created)
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className="p-2 divide-y divide-white/5 rounded-xl  bg-red-500  text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  transition
                >
                  {new Date(note.created_at).toLocaleString()}
                </PopoverPanel>
              </Popover>
              <Popover>
                <PopoverButton className="font-semibold text-white/50 focus:outline-none data-[active]:text-white data-[hover]:text-white">
                  {note.updated_at ? `(edited)` : null}
                </PopoverButton>
                <PopoverPanel
                  anchor="bottom"
                  className=" p-2 divide-y divide-white/5 rounded-xl bg-red-500 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
                  transition
                >
                  {note.updated_at ? `${new Date(note.updated_at).toLocaleString()}` : null}
                </PopoverPanel>
              </Popover>
            </div>
          );
        const editButton =
          editNoteId !== note.id ? (
            <button
              className="bg-red-500 text-white p-2 rounded-md shadow-md  hover:bg-red-600"
              onClick={() => setEditNoteId(note.id)}
            >
              Edit
            </button>
          ) : null;
        return (
          <div key={note.id} className="rounded-md shadow-md flex items-center gap-2 pr-2 w-full">
            {noteNode}
            {editButton}
            <button
              className="bg-red-500 text-white p-2 rounded-md shadow-md  hover:bg-red-600"
              onClick={() => handleDelete(note)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};
