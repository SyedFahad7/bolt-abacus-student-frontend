import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedOrbit from '../../../components/auth/AnimatedOrbit';
import SignInForm from '../../../components/auth/SignInForm';

const StudentSignInPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        {/* Left side animated scene */}
  <div className="relative hidden md:block bg-[#0b0b0b] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          <div className="h-full w-full flex items-center justify-center">
            <AnimatedOrbit />
          </div>
        </div>

        {/* Right side form */}
        <div className="flex items-center justify-center p-6 md:p-10">
          <SignInForm onSubmit={() => navigate('/student/dashboard')} />
        </div>
      </div>
    </div>
  );
};

export default StudentSignInPage;
