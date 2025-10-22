import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Form from './Form';

export default function SetPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const operation = params.get('op');

  useEffect(() => {
    if (!operation || !['addition', 'multiplication', 'division'].includes(operation)) {
      navigate('/student/solo-training-ground');
    }
  }, [operation, navigate]);

  if (!operation) return null;

  return <Form />;
}
