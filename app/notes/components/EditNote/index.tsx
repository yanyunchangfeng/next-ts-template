import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useNotesStore } from '@/app/store';
import { Textarea } from '@/components/ui/textarea';

export const EditNote: React.FC = () => {
  const { editIsOpen, setEditIsOpen, openNote, updateNote } = useNotesStore();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const updateNoteHandler = () => {
    if (inputRef.current?.value) {
      updateNote({ id: openNote.id, title: inputRef.current?.value, created_at: openNote.created_at });
    }
  };

  return (
    <Drawer open={editIsOpen} onOpenChange={setEditIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Textarea rows={5} placeholder="Write a note..." defaultValue={openNote.title} ref={inputRef} />
          </div>
          <DrawerFooter>
            <Button onClick={updateNoteHandler}>Submit</Button>
            <DrawerClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
