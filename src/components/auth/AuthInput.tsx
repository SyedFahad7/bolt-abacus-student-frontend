import React, { useState } from 'react';

export interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, type = 'text', ...props }) => {
  const [hover, setHover] = useState(false);
  const [mx, setMx] = useState('50%');
  const [my, setMy] = useState('50%');

  const onMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    setMx(`${e.clientX - rect.left}px`);
    setMy(`${e.clientY - rect.top}px`);
  };

  return (
    <div className="w-full">
      {label && (
        <label className="text-sm font-medium text-white/90 mb-1 block">{label}</label>
      )}
      <div
        className="input-hover-wrap"
        data-hover={hover}
        style={{ ["--mx" as any]: mx, ["--my" as any]: my }}
        onMouseMove={onMove}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <input
          {...props}
          type={type}
          className="h-10 w-full rounded-md bg-[#0f0f10] text-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#facb25]/60 placeholder:text-white/40 border border-[#2a2a2d]"
        />
      </div>
    </div>
  );
};

export default AuthInput;
