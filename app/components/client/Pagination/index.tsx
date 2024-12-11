import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  //   PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

interface PaginationProps {
  current: number;
  pages: number;
  total: number;
  onChange: (pageNo: number) => void;
}

export const Paginations: React.FC<PaginationProps> = ({ current, onChange, pages, total }) => {
  const handleChange = (pageNo: number) => {
    onChange(pageNo);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <span>{total}</span>
        </PaginationItem>
        <PaginationItem>
          {current === 1 ? (
            <Button disabled variant="ghost">
              First
            </Button>
          ) : (
            <PaginationLink onClick={() => handleChange(1)} className="cursor-pointer">
              First
            </PaginationLink>
          )}
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
          <PaginationLink isActive className="cursor-pointer">
            {current}
          </PaginationLink>
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
        <PaginationItem>
          {current === pages ? (
            <Button disabled variant="ghost">
              Last
            </Button>
          ) : (
            <PaginationLink onClick={() => handleChange(pages)} className="cursor-pointer">
              Last
            </PaginationLink>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
