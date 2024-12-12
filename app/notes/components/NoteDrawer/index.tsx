import React from 'react';
import { Drawer } from '@/app/components';
import { Note } from '@/app/shared';
import { Textarea } from '@/components/ui/textarea';

interface NoteDrawerProps {
  open: boolean;
  onOk: (note: Note) => void;
  onCancel: () => void;
  data?: Partial<Note>;
}

export const NoteDrawer: React.FC<NoteDrawerProps> = ({ open, data = {}, onOk, onCancel }) => {
  const [title, setTitle] = React.useState(data.title);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const handleOk = () => {
    if (title) onOk({ ...data, title } as Note);
  };

  const handleCancel = () => {
    onCancel();
  };

  React.useEffect(() => {
    if (data.title) {
      setTitle(data.title);
    }
  }, [data.title]);

  return (
    <Drawer open={open} onCancel={handleCancel} onOk={handleOk} okDisabled={!title || title === data.title}>
      <div className="p-4 pb-0">
        <Textarea
          rows={5}
          placeholder="Write a note..."
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </Drawer>
  );
};
