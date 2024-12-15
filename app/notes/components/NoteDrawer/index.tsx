import React from 'react';
import { Drawer } from '@/app/components';
import { Note } from '@/app/shared';
import { Textarea } from '@/components/ui/textarea';

interface NoteDrawerProps {
  open: boolean;
  onOk: (note: Note) => Promise<void>;
  onCancel: () => Promise<void>;
  data?: Partial<Note>;
}

export const NoteDrawer: React.FC<NoteDrawerProps> = ({ open, data = {}, onOk, onCancel }) => {
  const [title, setTitle] = React.useState(data.title);
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const handleOk = async () => {
    if (title) {
      await onOk({ ...data, title } as Note);
      setTitle(undefined);
    }
  };

  const handleCancel = async () => {
    await onCancel();
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={ref}
        />
      </div>
    </Drawer>
  );
};
