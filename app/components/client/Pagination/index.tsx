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
          <PaginationLink onClick={() => handleChange(1)} className="cursor-pointer">
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious onClick={() => handleChange(current - 1)} className="cursor-pointer" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive className="text-black cursor-pointer">
            {current}
          </PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext onClick={() => handleChange(current + 1)} className="cursor-pointer" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handleChange(pages)} className="cursor-pointer">
            Last
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
