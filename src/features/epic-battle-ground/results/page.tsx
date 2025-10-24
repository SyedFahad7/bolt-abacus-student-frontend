import { useSearchParams } from 'react-router-dom';
import EBGWinner from './winner';
import EBGLoser from './loser';

export default function EpicResultsPage() {
  const [searchParams] = useSearchParams();
  const outcome = searchParams.get('outcome') || 'loser';

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {outcome === 'winner' ? <EBGWinner /> : <EBGLoser />}
    </div>
  );
}
