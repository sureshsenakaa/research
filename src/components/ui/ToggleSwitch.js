'use client';

export default function ToggleSwitch({ label, checked, onChange, color = '#00d4ff' }) {
  return (
    <div className="flex items-center gap-3 cursor-pointer" onClick={() => onChange(!checked)}>
      <div 
        className="relative w-[44px] h-[24px] rounded-full transition-colors duration-300 ease-in-out"
        style={{ backgroundColor: checked ? color : '#374151' }}
      >
        <div 
          className={`absolute top-[2px] left-[2px] bg-white w-[20px] h-[20px] rounded-full transition-transform duration-300 ease-in-out shadow-sm ${checked ? 'translate-x-[20px]' : 'translate-x-0'}`}
        />
      </div>
      {label && <span className="text-sm font-medium text-gray-300 select-none">{label}</span>}
    </div>
  );
}
