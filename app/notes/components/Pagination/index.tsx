/* eslint-disable */
import { useNotesStore } from '@/app/store';
import React from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';

export const Paganition: React.FC = () => {
  const { notes, fetchNotes, selectedPerPage, setSelectedPerPage, perPages, pending } = useNotesStore();
  const currentPage = notes.pageNo;
  const totalPages = notes.totalPages;

  const renderPageButton = (pageNo: number) => (
    <button
      key={pageNo}
      disabled={pageNo === notes.pageNo}
      onClick={() => fetchNotes({ pageNo, pageSize: notes.pageSize })}
      className="rounded-md shadow-md hover:bg-red-600 bg-red-500 text-white px-4  py-2 disabled:bg-red-300  disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pageNo}
    </button>
  );
  const renderRange2Buttons = () => {
    const buttons = [];
    const range = 2;
    if (notes.totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(renderPageButton(i));
      }
    } else {
      if (currentPage > range + 1) {
        buttons.push(renderPageButton(1));
      }

      // 显示省略号（如果需要）
      if (currentPage > range + 2) {
        buttons.push(<span key="start-ellipsis">...</span>);
      }

      // 当前页前后的页码按钮
      for (let i = Math.max(1, currentPage - range); i <= Math.min(totalPages, currentPage + range); i++) {
        buttons.push(renderPageButton(i));
      }

      // 显示省略号（如果需要）
      if (currentPage < totalPages - range - 1) {
        buttons.push(<span key="end-ellipsis">...</span>);
      }

      // 显示末页按钮
      if (currentPage < totalPages - range) {
        buttons.push(renderPageButton(totalPages));
      }
    }
    return buttons;
  };
  const renderRange1Buttons = () => {
    const range = 1;
    const buttons = [];
    // 显示前一页按钮
    // if (currentPage > 1) {
    //   buttons.push(renderPageButton(currentPage - range)); // 显示前一页
    // }

    // 显示当前页按钮
    buttons.push(renderPageButton(currentPage)); // 显示当前页

    // 显示后一页按钮
    // if (currentPage < totalPages) {
    //   buttons.push(renderPageButton(currentPage + range)); // 显示后一页
    // }

    return buttons;
  };

  const pages = React.useMemo(() => {
    return (
      <>
        <span>{notes.totalCount} </span>
        {notes.pageNo > 1 && (
          <button
            className="rounded-md shadow-md  hover:bg-red-600 bg-red-500 text-white px-4 py-2"
            onClick={() => fetchNotes({ pageNo: 1, pageSize: notes.pageSize })}
          >
            first
          </button>
        )}
        {notes.pageNo > 1 && (
          <button
            className="rounded-md shadow-md  hover:bg-red-600 bg-red-500 text-white px-4 py-2"
            onClick={() => fetchNotes({ pageNo: notes.pageNo - 1, pageSize: notes.pageSize })}
          >
            &lt;
          </button>
        )}
        {renderRange1Buttons()}

        {notes.pageNo < notes.totalPages && (
          <button
            className="rounded-md shadow-md hover:bg-red-600 bg-red-500 text-white px-4 py-2 "
            onClick={() => fetchNotes({ pageNo: notes.pageNo + 1, pageSize: notes.pageSize })}
          >
            &gt;
          </button>
        )}
        {notes.pageNo !== totalPages && (
          <button
            className="rounded-md shadow-md  hover:bg-red-600 bg-red-500 text-white px-4 py-2"
            onClick={() => fetchNotes({ pageNo: totalPages, pageSize: notes.pageSize })}
          >
            last
          </button>
        )}
      </>
    );
  }, [notes]);

  if (pending) return null;
  if (totalPages === 0) return null;
  return (
    <div className="flex jusi gap-2 justify-center items-center mb-4 mt-2">
      {pages}
      <Listbox value={selectedPerPage} onChange={setSelectedPerPage}>
        <ListboxButton className="p-2">{selectedPerPage.name}</ListboxButton>
        <ListboxOptions
          anchor="bottom"
          className="rounded-xl border border-white/5 bg-red-500 p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
        >
          {perPages.map((perPage) => {
            return (
              <ListboxOption
                key={perPage.id}
                value={perPage}
                className="data-[focus]:bg-red-600  p-2 flex items-center justify-center cursor-default rounded-md"
              >
                <div>{perPage.name}</div>
              </ListboxOption>
            );
          })}
        </ListboxOptions>
      </Listbox>
    </div>
  );
};
