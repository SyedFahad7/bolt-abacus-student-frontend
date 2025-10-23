import { 
  CaretDoubleLeft, 
  CaretLeft, 
  CaretRight, 
  CaretDoubleRight 
} from '@phosphor-icons/react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  onPageChange 
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-6 flex flex-col tablet:flex-row items-center justify-between gap-4">
      <div className="text-sm text-white/60">
        Page {currentPage} of {totalPages} • {totalItems} players
      </div>

      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded-lg bg-[#161618] border border-[#2a2a2d] text-white disabled:opacity-40 hover:bg-[#1f1f21] hover:border-yellow-600/50 transition-all duration-200"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          title="First page"
        >
          <CaretDoubleLeft size={16} weight="bold" />
        </button>
        <button
          className="p-2 rounded-lg bg-[#161618] border border-[#2a2a2d] text-white disabled:opacity-40 hover:bg-[#1f1f21] hover:border-yellow-600/50 transition-all duration-200"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          title="Previous"
        >
          <CaretLeft size={16} weight="bold" />
        </button>
        <span className="px-4 py-2 text-white font-semibold bg-[#161618] border border-[#2a2a2d] rounded-lg min-w-[60px] text-center">
          {currentPage}
        </span>
        <button
          className="p-2 rounded-lg bg-[#161618] border border-[#2a2a2d] text-white disabled:opacity-40 hover:bg-[#1f1f21] hover:border-yellow-600/50 transition-all duration-200"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          title="Next"
        >
          <CaretRight size={16} weight="bold" />
        </button>
        <button
          className="p-2 rounded-lg bg-[#161618] border border-[#2a2a2d] text-white disabled:opacity-40 hover:bg-[#1f1f21] hover:border-yellow-600/50 transition-all duration-200"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          title="Last page"
        >
          <CaretDoubleRight size={16} weight="bold" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
