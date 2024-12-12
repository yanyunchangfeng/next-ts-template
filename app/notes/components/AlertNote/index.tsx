import { useNotesStore } from '@/app/store';
import { Confirm } from '@/app/components';

export const AlertNote: React.FC = () => {
  const { deleteIsOpen, setDeleteIsOpen, deleteNote, openNote } = useNotesStore();
  return (
    <Confirm open={deleteIsOpen} onOk={deleteNote} onCancel={setDeleteIsOpen} data={{ description: openNote.title }} />
  );
};
