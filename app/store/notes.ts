import { createPersistStore } from '@/app/utils';
import { Note, Notes, NoteSearchParams } from '@/app/shared';
import RequestService from '@/app/platform/request/browser/RequestService';

const DEFAULT_NOTES = {
  notes: {
    pageNo: 1,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0,
    data: [] as Note[]
  },
  searchNote: { keyWord: '' },
  deleteIsOpen: false,
  editIsOpen: false,
  openNote: { id: '', title: '' } as Note,
  addNoteTitle: '',
  pending: true,
  selectedPerPage: '5',
  perPages: [
    { label: `5/page`, value: '5' },
    { label: `10/page`, value: '10' },
    { label: `15/page`, value: '15' },
    { label: `20/page`, value: '20' }
  ]
};

export const useNotesStore = createPersistStore(
  { ...DEFAULT_NOTES },
  (set, _get) => {
    function get() {
      return {
        ..._get(),
        ...methods
      };
    }
    const methods = {
      async fetchNotes(searchParams?: NoteSearchParams) {
        set(() => ({ pending: true }));
        searchParams = Object.assign(
          {
            pageNo: get().notes.pageNo,
            pageSize: get().notes.pageSize,
            keyWord: get().searchNote.keyWord
          },
          searchParams
        );
        const notes = await RequestService.notes.fetchData(searchParams);
        set(() => ({
          selectedPerPage: get().perPages.find((item) => Number(item.value) === notes.pageSize)?.value
        }));
        set(() => ({ notes, pending: false }));
      },
      async addNote() {
        set(() => ({ pending: true }));
        const id = await RequestService.notes.addNote(get().addNoteTitle);
        if (!id) return;
        set(() => ({ addNoteTitle: '' }));
        set(() => ({ searchNote: { ...get().searchNote, keyWord: '' } }));
        get().fetchNotes({ pageNo: 1, pageSize: get().notes.pageSize, keyWord: get().searchNote.keyWord });
      },
      async updateNote(note: Note) {
        set(() => ({ editIsOpen: false, pending: true }));
        const data = await RequestService.notes.updateNote(note);
        if (!data) return;
        get().fetchNotes();
      },
      async deleteNote(id?: string) {
        set(() => ({ deleteIsOpen: false, pending: true }));
        const data = await RequestService.notes.deleteNote(id || get().openNote.id);
        if (!data) return;
        set(() => ({ openNote: { id: '', title: '' } as Note }));
        get().fetchNotes();
      },
      setNotes(notes: Notes) {
        set(() => ({ notes }));
      },
      setDeleteIsOpen(deleteIsOpen: boolean) {
        set(() => ({ deleteIsOpen }));
      },
      setEditIsOpen(editIsOpen: boolean) {
        set(() => ({ editIsOpen }));
      },
      setOpenNote(note: Note) {
        set(() => ({ openNote: note }));
      },
      setAddNoteTitle(title: string) {
        set(() => ({ addNoteTitle: title }));
      },
      setSelectedPerPage(selectedPerPage: string) {
        set(() => ({ selectedPerPage }));
        set(() => ({ notes: { ...get().notes, pageSize: Number(selectedPerPage) } }));
        get().fetchNotes();
      },
      setSearchNote(searchNote: typeof DEFAULT_NOTES.searchNote) {
        set(() => ({ searchNote: { ...get().searchNote, ...searchNote } }));
      }
    };
    return methods;
  },
  { name: 'notes' }
);
