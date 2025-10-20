import type { FC } from 'react';
import { useState } from 'react';

export interface TodoListSectionProps {
  className?: string;
}

const TodoListSection: FC<TodoListSectionProps> = ({ className = '' }) => {
  // Dummy todos
  const [todos] = useState([
    { id: 1, title: 'Complete 1 practice session', completed: false, description: 'Do a session today', priority: 'high', type: 'practice' },
    { id: 2, title: 'Review flashcards', completed: true, description: 'Go through flashcards', priority: 'medium', type: 'practice' },
    { id: 3, title: 'Maintain streak', completed: false, description: 'Don\'t break your streak!', priority: 'low', type: 'streak' },
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState('');

  return (
    <div className={`text-white h-full flex flex-col ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="mr-2">📋</span>
          Personal Goals
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-[#080808]/50 hover:bg-[#191919]/50 text-white px-3 py-2 rounded-lg border border-gold/50 ring-1 ring-gold/20 backdrop-blur-sm transition-colors text-sm min-h-[40px] min-w-[40px] flex items-center justify-center tablet:px-4"
        >
          <span className="tablet:mr-1">➕</span>
          <span className="hidden tablet:inline">Add</span>
        </button>
      </div>
      {showAddForm && (
        <div className="mb-4 p-3 bg-[#080808]/30 rounded-lg border border-gold/30">
          <input
            type="text"
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            placeholder="Add a new goal..."
            className="w-full bg-[#080808]/50 hover:bg-[#191919]/50 text-white px-3 py-2 rounded border border-gold/40 ring-1 ring-gold/20 focus:outline-none focus:border-gold/d40 backdrop-blur-sm transition-colors text-sm"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-[#080808]/50 hover:bg-[#191919]/50 text-white px-4 py-2 rounded-lg border border-gold/50 ring-1 ring-gold/20 backdrop-blur-sm transition-colors text-sm flex items-center justify-center min-h-[40px]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="space-y-3 max-h-48 overflow-y-auto flex-1">
        {todos.map(todo => (
          <div key={todo.id} className={`group p-3 rounded-lg border backdrop-blur-sm transition-all duration-200 ${
            todo.completed ? 'bg-green-500/10 border-green-400/30' : 'bg-[#080808]/30 hover:bg-[#191919]/30 border-gold/30'
          }`}>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
                className="mt-1 h-4 w-4 accent-gold cursor-pointer flex-shrink-0 disabled:opacity-50"
                title="Mark complete"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap gap-1 mb-1">
                  <span className="text-lg flex-shrink-0">📚</span>
                  <span className={`text-xs flex-shrink-0 text-gray-400`}>
                    ●
                  </span>
                  <h3 className={`text-sm font-semibold break-words ${
                    todo.completed ? 'line-through text-gray-400' : 'text-white'
                  }`}>
                    {todo.title}
                  </h3>
                </div>
                <p className={`text-xs break-words ${
                  todo.completed ? 'text-gray-500' : 'text-gray-300'
                }`}>
                  {todo.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListSection;
