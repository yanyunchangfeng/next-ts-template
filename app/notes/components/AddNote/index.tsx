import { useNotesStore } from '@/app/store';
import { Plus } from 'lucide-react';
import React from 'react';
import { Button } from '@/components/ui/button';
import { NoteDrawer } from '@/app/notes/components';
import { Note } from '@/app/shared';

export const AddNote: React.FC = () => {
  const { setAddIsOpen, addIsOpen, addNote } = useNotesStore();
  const handleAddNote = async (note: Partial<Note>) => {
    setAddIsOpen(false);
    await addNote(note);
  };
  const handleOpen = async () => {
    setAddIsOpen(true);
  };
  const handleCancel = async () => {
    setAddIsOpen(false);
  };
  return (
    <>
      <Button variant="outline" size="icon" onClick={handleOpen}>
        <Plus />
      </Button>
      <NoteDrawer open={addIsOpen} onOk={handleAddNote} onCancel={handleCancel} />
    </>
  );
};
