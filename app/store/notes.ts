import { createPersistStore } from '@/app/utils';
import { Note, Notes } from '@/app/shared';
import RequestService from '@/app/platform/request/browser/RequestService';

const DEFAULT_NOTES = {
  notes: {
    pageNo: 1,
    pageSize: 5,
    totalCount: 0,
    totalPages: 0,
    data: [] as Note[]
  },
  isOpen: false,
  openNote: { id: '', title: '' },
  editNoteId: '',
  addNoteTitle: '',
  pending: true,
  selectedPerPage: { id: 1, name: `5 / page`, pageSize: 5 }
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
      async fetchNotes(page?: { pageNo: number; pageSize: number }) {
        set(() => ({ pending: true }));
        page = page ?? { pageNo: 1, pageSize: get().selectedPerPage.pageSize };
        const notes = await RequestService.notes.fetchData(page);
        set(() => ({ notes, pending: false }));
      },
      async addNote() {
        const id = await RequestService.notes.addNote(get().addNoteTitle);
        if (!id) return;
        set(() => ({ addNoteTitle: '' }));
        get().fetchNotes();
      },
      async updateNote(note: Note) {
        const data = await RequestService.notes.updateNote(note);
        if (!data) return;
        get().fetchNotes();
      },
      async deleteNote(id?: string) {
        const data = await RequestService.notes.deleteNote(id || get().openNote.id);
        if (!data) return;
        set(() => ({ isOpen: false, openNote: { id: '', title: '' } }));
        get().fetchNotes();
      },
      setNotes(notes: Notes) {
        set(() => ({ notes }));
      },
      setIsOpen(isOpen: boolean) {
        set(() => ({ isOpen }));
      },
      setOpenNote(note: Note) {
        set(() => ({ openNote: note }));
      },
      setEditNoteId(id: string) {
        set(() => ({ editNoteId: id }));
      },
      setAddNoteTitle(title: string) {
        set(() => ({ addNoteTitle: title }));
      },
      setSelectedPerPage(selectedPerPage: typeof DEFAULT_NOTES.selectedPerPage) {
        set(() => ({ selectedPerPage }));
        get().fetchNotes();
      }
    };
    return methods;
  },
  { name: 'notes' }
);
