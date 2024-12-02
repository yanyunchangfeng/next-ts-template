export interface Note {
  title: string;
  id: string;
}
export interface Notes {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: Note[];
}
