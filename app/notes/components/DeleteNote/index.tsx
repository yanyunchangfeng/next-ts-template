import { useNotesStore } from '@/app/store';
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FC } from 'react';

export const DelelteNote: FC = () => {
  const { isOpen, setIsOpen, openNote, deleteNote, setOpenNote } = useNotesStore();
  const handClose = () => {
    setOpenNote({ title: '', id: '' });
    setIsOpen(false);
  };
  return (
    <Dialog
      open={isOpen}
      onClose={handClose}
      transition
      className="relative z-50 transition duration-300 ease-out data-[closed]:opacity-0"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-pink-500 p-12  text-white">
          <DialogTitle className="font-bold">
            Delete note id:
            {openNote.id}
          </DialogTitle>
          <Description>{openNote.title}</Description>
          <p>Are you sure you want to delete your note? your note will be permanently removed.</p>
          <div className="flex gap-4">
            <button onClick={handClose}>Cancel</button>
            <button onClick={() => deleteNote()}>OK</button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
