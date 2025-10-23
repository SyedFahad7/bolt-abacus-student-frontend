import { Sparkle } from '@phosphor-icons/react';

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-yellow-900/20 animate-gradient" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-600/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo/Icon with pulse animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-600/20 rounded-full blur-2xl animate-pulse" />
          <div className="relative bg-gradient-to-br from-yellow-600 to-orange-500 p-6 rounded-2xl shadow-2xl">
            <Sparkle size={48} className="text-black animate-spin-slow" weight="fill" />
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-white">
            Loading<span className="animate-pulse">...</span>
          </h2>
                    {/* <div className="w-64 h-1 bg-[#2a2a2d] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-600 via-orange-500 to-yellow-600 animate-loading-bar" />
          </div> */}
          
          <p className="text-white/60 text-sm animate-pulse">Preparing your experience</p>
        </div>

        {/* Rotating ring */}
        {/* <div className="absolute w-32 h-32 border-4 border-transparent border-t-yellow-600 border-r-yellow-600 rounded-full animate-spin-slow" />
        <div className="absolute w-24 h-24 border-4 border-transparent border-b-purple-500 border-l-purple-500 rounded-full animate-spin-reverse" /> */}
      </div>

      <style>{`
        @keyframes gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-gradient {
          animation: gradient 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
