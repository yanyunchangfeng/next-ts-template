import { isDynamic, Note } from '@/app/shared';

export const fetchData = async (page = { pageNo: 1, pageSize: 10 }) => {
  if (!isDynamic) {
    return [];
  }
  const res = await fetch(`/api/notes?pageNo=${page.pageNo}&pageSize=${page.pageSize}`);
  const data = await res.json();
  return data;
};

export const addNote = async (title: string) => {
  const res = await fetch(`/api/notes`, { method: 'POST', body: JSON.stringify({ title }) });
  if (res.status !== 200) {
    console.log('Error adding note');
    return;
  }
  const data = await res.json();
  const newId = data?.[0]?.id; // 获取新增记录的 id
  return newId;
};

export const updateNote = async (note: Note) => {
  const res = await fetch(`/api/notes`, { method: 'PUT', body: JSON.stringify(note) });
  if (res.status !== 200) {
    console.log('Error update note');
    return;
  }
  const data = await res.json();
  const newData = data?.[0];
  return newData;
};

export const deleteNote = async (id: string) => {
  const res = await fetch(`/api/notes`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id })
  });

  if (res.status !== 200) {
    console.log('Error deleting note');
    return;
  }
  const data = await res.json();
  const effectRows = data?.length;
  return effectRows;
};
