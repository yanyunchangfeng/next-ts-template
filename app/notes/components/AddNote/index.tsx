import { useNotesStore } from '@/app/store';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';

export const AddNote: React.FC = () => {
  const { setAddIsOpen, addIsOpen, addNote } = useNotesStore();
  const handleAddNote = (note: Partial<Note>) => {
    setAddIsOpen(false);
    addNote(note);
  };
  const handleOpen = () => {
    setAddIsOpen(true);
  };
  return (
    <>
      <Button variant="outline" size="icon" onClick={handleOpen}>
        <Plus />
      </Button>
      <NoteDrawer open={addIsOpen} onOk={handleAddNote} onCancel={() => setAddIsOpen(false)} />
    </>
  );
};
