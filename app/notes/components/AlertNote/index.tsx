import { useNotesStore } from '@/app/store';
import { Confirm } from '@/app/components';
import { toast } from 'sonner';

export const AlertNote: React.FC = () => {
  const { deleteIsOpen, setDeleteIsOpen, deleteNote, openNote } = useNotesStore();
  const handleCancel = async () => {
    setDeleteIsOpen(false);
  };
  const handleDelete = async () => {
    try {
      await deleteNote();
      setDeleteIsOpen(false);
    } catch (err) {
      toast.error(`${err}`);
    }
  };
  return (
    <Confirm open={deleteIsOpen} onOk={handleDelete} onCancel={handleCancel} data={{ description: openNote.title }} />
  );
};
