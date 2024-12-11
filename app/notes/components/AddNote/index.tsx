import { useNotesStore } from '@/app/store';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { FC } from 'react';
import { Button } from '@/components/ui/button';

export const AddNote: FC = () => {
  const { addNoteTitle, addNote, setAddNoteTitle, pending } = useNotesStore();

  return (
    <div className="flex items-center rounded-md shadow-md pr-2 gap-2">
      <Textarea
        // rows={2}
        placeholder="Add a new note"
        value={addNoteTitle}
        onChange={(e) => setAddNoteTitle(e.target.value)}
      />
      <Button disabled={!addNoteTitle || pending} onClick={addNote} variant="destructive">
        {addNoteTitle && pending ? <Loader2 className="animate-spin" /> : null}
        Add
      </Button>
    </div>
  );
};
