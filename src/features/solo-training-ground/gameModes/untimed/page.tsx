import Sidebar from '../../../../components/Sidebar';
import MainContent from '../../../../components/layout/MainContent';

export default function UntimedPage() {
  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <MainContent>
        <h1 className="text-2xl font-bold text-white mb-4">No Rush Mastery</h1>
        <p className="text-white/80">Settings form coming next...</p>
      </MainContent>
    </div>
  );
}
