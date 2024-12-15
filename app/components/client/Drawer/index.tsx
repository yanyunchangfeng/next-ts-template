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
import { DialogProps } from 'vaul';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface DrawerProps {
  open: boolean;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  onOk: (...args: any[]) => Promise<void>;
  onCancel: () => Promise<void>;
  data?: Record<keyof any, string>;
  title?: React.ReactNode;
  description?: React.ReactNode;
  okDisabled?: boolean;
}
export const Drawer: React.FC<DrawerProps & DialogProps> = ({
  open,
  onCancel,
  onOk,
  children,
  okText,
  cancelText,
  title,
  description,
  okDisabled,
  ...restProps
}) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const handleCancel = async () => {
    await onCancel();
  };

  const handleOk = async () => {
    try {
      setConfirmLoading(true);
      await onOk();
    } catch (err) {
      console.log(`${err}`);
    } finally {
      setConfirmLoading(false);
    }
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
    <DefaultDrawer open={open} onClose={handleCancel} {...restProps}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{drawerTitle}</DrawerTitle>
            <DrawerDescription>{drawerDescription}</DrawerDescription>
          </DrawerHeader>
          {children}
          <DrawerFooter>
            <Button onClick={handleOk} disabled={okDisabled || confirmLoading}>
              {confirmLoading ? <Loader2 className="animate-spin" /> : null}
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
