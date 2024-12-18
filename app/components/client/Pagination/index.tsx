import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Pagination as DefaultPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface PaginationProps {
  current: number;
  pages: number;
  total: number;
  onPageChange: (pageNo: number) => void;
}

export const Pagination: React.FC<PaginationProps & React.ComponentProps<'nav'>> = ({
  current,
  onPageChange,
  pages,
  total,
  ...restProps
}) => {
  const handleChange = (pageNo: number) => {
    onPageChange(pageNo);
  };
  return (
    <DefaultPagination {...restProps}>
      <PaginationContent>
        <PaginationItem>
          <span>{total}</span>
        </PaginationItem>

        <PaginationItem>
          {current === 1 ? (
            <Button disabled variant="ghost">
              <ChevronLeft />
              Previous
            </Button>
          ) : (
            <PaginationPrevious onClick={() => handleChange(current - 1)} className="cursor-pointer" />
          )}
        </PaginationItem>
        <PaginationItem>
          {current !== 1 ? (
            <PaginationLink onClick={() => handleChange(1)} className="cursor-pointer">
              1
            </PaginationLink>
          ) : null}
        </PaginationItem>
        {current > 1 + 1 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        <PaginationItem>
          <PaginationLink isActive className="cursor-pointer">
            {current}
          </PaginationLink>
        </PaginationItem>
        {current < pages - 1 ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}
        <PaginationItem>
          {current !== pages ? (
            <PaginationLink onClick={() => handleChange(pages)} className="cursor-pointer">
              {pages}
            </PaginationLink>
          ) : null}
        </PaginationItem>
        <PaginationItem>
          {current === pages ? (
            <Button disabled variant="ghost">
              Next
              <ChevronRight />
            </Button>
          ) : (
            <PaginationNext onClick={() => handleChange(current + 1)} className="cursor-pointer" />
          )}
        </PaginationItem>
      </PaginationContent>
    </DefaultPagination>
  );
};
