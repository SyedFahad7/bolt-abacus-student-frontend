import { Funnel } from '@phosphor-icons/react';
import { Card, CardContent } from '../../../components/Card';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const filters = [
    { id: 'all', label: 'All Activities' },
    { id: 'practice', label: 'Practice' },
    { id: 'pvp', label: 'PvP' },
    { id: 'flashcard', label: 'Flashcards' },
  ];

  return (
    <Card className="bg-[#0f0f10] border-[#2a2a2d]">
      <CardContent className="p-4">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-white/60">
            <Funnel size={20} weight="bold" />
            <span className="text-sm font-medium">Filter:</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${activeFilter === filter.id
                    ? 'bg-yellow-600 text-black'
                    : 'bg-[#161618] text-white/80 hover:bg-[#1f1f21] hover:text-white'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FilterBar;
