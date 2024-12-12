import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import React from 'react';

interface PopoverProps {
  content: React.ReactNode;
}
export const Popovers: React.FC<React.PropsWithChildren & PopoverProps & PopoverPrimitive.PopoverProps> = ({
  children,
  content,
  ...restProps
}) => {
  return (
    <Popover {...restProps}>
      <PopoverTrigger className="truncate">{children}</PopoverTrigger>
      <PopoverContent className="whitespace-pre-line">{content}</PopoverContent>
    </Popover>
  );
};
