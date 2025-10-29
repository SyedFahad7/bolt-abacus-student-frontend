import React, { useState } from 'react';
import AuthInput from './AuthInput';
import { Eye, EyeSlash, ArrowRight } from '@phosphor-icons/react';

interface SignInFormProps {
  onSubmit?: (email: string, password: string) => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const nextErrors: { email?: string; password?: string } = {};
    if (!email) nextErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Invalid email';
    if (!password) nextErrors.password = 'Password is required';
    else if (password.length < 6) nextErrors.password = 'At least 6 characters';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) onSubmit?.(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
      <div>
        <h1 className="text-3xl font-bold text-white mb-1">Welcome back</h1>
        <p className="text-sm text-white/60">Sign in to your account</p>
      </div>

      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}

      <div>
        <div className="relative">
          <AuthInput
            label="Password"
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-[34px] text-white/70 hover:text-white"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <Eye size={18} /> : <EyeSlash size={18} />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
      </div>

      <div className="flex items-center justify-between pt-1">
        <a href="#" className="text-sm text-[#facb25] hover:underline">Forgot password?</a>
      </div>

      <button
        type="submit"
        className="w-full h-10 rounded-md bg-[#facb25] text-[#1b1b1b] font-semibold hover:brightness-95 transition flex items-center justify-center gap-2"
      >
        Sign in <ArrowRight size={18} />
      </button>
    </form>
  );
};

export default SignInForm;
