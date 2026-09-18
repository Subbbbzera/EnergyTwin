import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-medium text-et-text">{label}</label>}
      <input
        className={`bg-et-block border border-et-border text-et-text text-sm rounded-[10px] px-4 py-2.5 outline-none focus:border-et-accent focus:ring-1 focus:ring-et-accent transition-colors ${className}`}
        {...props}
      />
    </div>
  );
}
