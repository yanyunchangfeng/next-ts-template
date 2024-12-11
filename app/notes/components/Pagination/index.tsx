/* eslint-disable */
import { useNotesStore } from '@/app/store';
import React from 'react';
import { Button } from '@/components/ui/button';
import { PageSelect } from '@/app/notes/components/PageSelect';
import { Paginations } from '@/app/components';

export const Paganition: React.FC = () => {
  const { notes, fetchNotes, pending } = useNotesStore();
  const currentPage = notes.pageNo;
  const totalPages = notes.totalPages;

  const renderPageButton = (pageNo: number) => (
    <Button
      key={pageNo}
      disabled={pageNo === notes.pageNo}
      onClick={() => fetchNotes({ pageNo, pageSize: notes.pageSize })}
    >
      {pageNo}
    </Button>
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
        {notes.pageNo > 1 && <Button onClick={() => fetchNotes({ pageNo: 1, pageSize: notes.pageSize })}>first</Button>}
        {notes.pageNo > 1 && (
          <Button
            className="rounded-md shadow-md  hover:bg-red-600 bg-red-500 text-white px-4 py-2"
            onClick={() => fetchNotes({ pageNo: notes.pageNo - 1, pageSize: notes.pageSize })}
          >
            &lt;
          </Button>
        )}
        {renderRange1Buttons()}

        {notes.pageNo < notes.totalPages && (
          <Button onClick={() => fetchNotes({ pageNo: notes.pageNo + 1, pageSize: notes.pageSize })}>&gt;</Button>
        )}
        {notes.pageNo !== totalPages && (
          <Button onClick={() => fetchNotes({ pageNo: totalPages, pageSize: notes.pageSize })}>last</Button>
        )}
      </>
    );
  }, [notes]);

  if (pending) return null;
  if (totalPages === 0) return null;
  const onChange = (pageNo: number) => {
    fetchNotes({ pageNo, pageSize: notes.pageSize });
  };
  return (
    <div className="flex justify-center gap-2 items-center mb-4 mt-2 flex-wrap">
      {/* {pages} */}
      <Paginations current={notes.pageNo} onChange={onChange} pages={notes.totalPages} total={notes.totalCount} />
      <PageSelect />
    </div>
  );
};
