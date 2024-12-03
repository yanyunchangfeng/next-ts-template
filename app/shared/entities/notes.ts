export interface Note {
  title: string;
  id: string;
  created_at: number;
  updated_at?: number;
}
export interface Notes {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  data: Note[];
}
