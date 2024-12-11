import { isDynamic, Note, Notes, notes, NoteSearchParams } from '@/app/shared';

export const fetchData = async (searchParams: NoteSearchParams): Promise<Notes> => {
  if (!isDynamic) {
    return notes;
  }
  try {
    const res = await fetch(
      `/api/notes?pageNo=${searchParams.pageNo}&pageSize=${searchParams.pageSize}&keyWord=${searchParams.keyWord}`
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log('Error fetch notes', e);
    return { totalCount: 0, totalPages: 0, data: [], pageNo: searchParams.pageNo, pageSize: searchParams.pageSize };
  }
};

export const addNote = async (title: string) => {
  try {
    const res = await fetch(`/api/notes`, { method: 'POST', body: JSON.stringify({ title }) });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const newId = data?.[0]?.id; // 获取新增记录的 id
    return newId;
  } catch (e) {
    console.log('Error add note', e);
  }
};

export const updateNote = async (note: Note) => {
  try {
    const res = await fetch(`/api/notes`, { method: 'PUT', body: JSON.stringify(note) });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const newData = data?.[0];
    return newData;
  } catch (e) {
    console.log('Error update note', e);
  }
};

export const deleteNote = async (id: string) => {
  try {
    const res = await fetch(`/api/notes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const effectRows = data?.length;
    return effectRows;
  } catch (e) {
    console.log('Error delete note', e);
  }
};
