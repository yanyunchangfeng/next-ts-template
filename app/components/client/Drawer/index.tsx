/* eslint-disable */
import {
  Drawer as DefaultDrawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import React from 'react';

interface DrawerProps {
  open: boolean;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk: (...args: any[]) => void;
  onCancel: () => void;
  data?: Record<keyof any, string>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  okDisabled?: boolean;
}
export const Drawer: React.FC<DrawerProps & React.PropsWithChildren> = ({
  open,
  onCancel,
  onOk,
  children,
  okText,
  cancelText,
  title,
  description,
  okDisabled
}) => {
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  const okTitle = React.useMemo(() => {
    if (okText) {
      return okText;
    }
    return 'Submit';
  }, [okText]);

  const cancelTitle = React.useMemo(() => {
    if (cancelText) {
      return cancelText;
    }
    return 'Cancel';
  }, [cancelText]);

  const drawerTitle = React.useMemo(() => {
    if (title) {
      return title;
    }
    return 'Are you absolutely sure?';
  }, [title]);

  const drawerDescription = React.useMemo(() => {
    if (description) {
      return description;
    }
    return 'This action cannot be undone.';
  }, [description]);

  return (
    <DefaultDrawer open={open} onClose={handleCancel}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{drawerTitle}</DrawerTitle>
            <DrawerDescription>{drawerDescription}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <Button onClick={handleOk} disabled={okDisabled}>
              {okTitle}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">{cancelTitle}</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </DefaultDrawer>
  );
};
