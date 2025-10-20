import type { FC, PropsWithChildren } from 'react';


const MainContent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main
      className="flex-1 min-h-screen flex items-center justify-center"
      style={{ paddingLeft: 'var(--sidebar-width, 0px)' }}
    >
      <div className="w-full max-w-5xl p-6 flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
