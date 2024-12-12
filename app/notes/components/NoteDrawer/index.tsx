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
import { Textarea } from '@/components/ui/textarea';
import { Note } from '@/app/shared';

interface NoteDrawerProps {
  open: boolean;
  onOk: (note: Note) => void;
  onCancel: () => void;
  data?: Partial<Note>;
}

export const NoteDrawer: React.FC<NoteDrawerProps> = ({ open, data = {}, onOk, onCancel }) => {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleOk = () => {
    if (inputRef.current?.value) onOk({ ...data, title: inputRef.current.value } as Note);
  };
  const handleCancel = () => {
    onCancel();
  };
  return (
    <Drawer open={open} onClose={handleCancel}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <Textarea rows={5} placeholder="Write a note..." defaultValue={data?.title} ref={inputRef} />
          </div>
          <DrawerFooter>
            <Button onClick={handleOk}>Submit</Button>
            <DrawerClose asChild>
              <Button variant={'outline'}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
