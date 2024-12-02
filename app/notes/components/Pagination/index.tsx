/* eslint-disable */
import { useNotesStore } from '@/app/store';
import React from 'react';

export const Paganition: React.FC = () => {
  const { notes, fetchNotes } = useNotesStore();
  const currentPage = notes.pageNo;
  const totalPages = notes.totalPages;
  const renderPageButton = (pageNo: number) => (
    <button
      key={pageNo}
      disabled={pageNo === notes.pageNo}
      onClick={() => fetchNotes({ pageNo, pageSize: notes.pageSize })}
      className="rounded-md shadow-md ml-2 hover:bg-pink-600 bg-pink-500 text-white px-4  py-2 disabled:bg-pink-300 disabled:text-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {pageNo}
    </button>
  );
  const renderRange2Buttons = () => {
    const buttons = [];
    const range = 2;
    if (notes.totalPages <= 5) {
      buttons.push(...Array.from({ length: 5 }, (_, i) => renderPageButton(i + 1)));
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
    if (currentPage > 1) {
      buttons.push(renderPageButton(currentPage - range)); // 显示前一页
    }

    // 显示当前页按钮
    buttons.push(renderPageButton(currentPage)); // 显示当前页

    // 显示后一页按钮
    if (currentPage < totalPages) {
      buttons.push(renderPageButton(currentPage + range)); // 显示后一页
    }

    return buttons;
  };

  const pages = React.useMemo(() => {
    return (
      <>
        {notes.pageNo > 1 && (
          <button
            className="rounded-md shadow-md ml-2 hover:bg-pink-600 bg-pink-500 text-white p-2"
            onClick={() => fetchNotes({ pageNo: notes.pageNo - 1, pageSize: notes.pageSize })}
          >
            Prev
          </button>
        )}

        {renderRange1Buttons()}
        {notes.pageNo < notes.totalPages && (
          <button
            className="rounded-md shadow-md ml-2 hover:bg-pink-600 bg-pink-500 text-white p-2 "
            onClick={() => fetchNotes({ pageNo: notes.pageNo + 1, pageSize: notes.pageSize })}
          >
            Next
          </button>
        )}
        <span className="text-pink-500">Total {notes.totalCount}</span>
      </>
    );
  }, [notes]);
  return <div className="flex jusi gap-4 justify-center items-center">{pages}</div>;
};
