import { useSearchParams } from 'react-router-dom';

export default function TimedResults() {
  const [searchParams] = useSearchParams();
  const outcome = searchParams.get('outcome') || 'loser';

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Match Results</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#0f0f10] border border-[#2a2a2d] rounded">Leaderboard (static)</div>
        <div className="p-4 bg-[#0f0f10] border border-[#2a2a2d] rounded">
          <h3 className="text-xl text-white mb-2">You {outcome === 'winner' ? 'Won' : 'Lost'}</h3>
          <p className="text-white/80">Check the leaderboard to see player details and correctness.</p>
        </div>
      </div>
    </div>
  );
}
