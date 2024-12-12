export interface Note {
  title: string;
  id: number;
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
export interface NoteSearchParams {
  pageNo: number;
  pageSize: number;
  keyWord?: string;
}
