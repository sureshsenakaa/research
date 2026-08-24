'use client';

export default function Badge({ variant = 'info', children }) {
  const variants = {
    compliant: 'bg-green-500/20 text-green-400',
    violation: 'bg-red-500/20 text-red-400 animate-[pulse_2s_ease-in-out_infinite]',
    warning: 'bg-amber-500/20 text-amber-400',
    info: 'bg-cyan-500/20 text-cyan-400'
  };

  const currentVariant = variants[variant] || variants.info;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-transparent backdrop-blur-sm ${currentVariant}`}>
      {children}
    </span>
  );
}
