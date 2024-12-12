import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import React from 'react';

interface ConfirmProps {
  open: boolean;
  data?: Partial<{
    description: string;
  }>;
  onCancel: (bool: boolean) => void;
  onOk: () => void;
}

export const Confirm: React.FC<ConfirmProps> = ({ open, data, onCancel, onOk }) => {
  const handleOpenChange = (boolean: boolean) => {
    onCancel(boolean);
  };
  const handleOk = () => {
    onOk();
  };
  const description = React.useMemo(() => {
    if (data?.description) {
      return <AlertDialogDescription className="whitespace-pre-line">{data?.description}</AlertDialogDescription>;
    }
  }, [data]);

  return (
    <AlertDialog open={open} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure? </AlertDialogTitle>
          {description}
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleOk}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
