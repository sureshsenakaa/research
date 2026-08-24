'use client';

export default function SliderControl({ label, value, min = 0, max = 100, step = 1, onChange, unit = '', showValue = true }) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {label && <label className="text-sm font-medium text-gray-300">{label}</label>}
        {showValue && (
          <span className="text-sm font-bold text-cyan-400">
            {value}{unit}
          </span>
        )}
      </div>
      
      <div className="relative h-6 flex items-center">
        <style dangerouslySetInnerHTML={{__html: `
          .custom-slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0);
            transition: box-shadow 0.2s ease;
          }
          .custom-slider:hover::-webkit-slider-thumb {
            box-shadow: 0 0 12px rgba(0, 212, 255, 0.8);
          }
          .custom-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border: none;
            border-radius: 50%;
            background: #ffffff;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 212, 255, 0);
            transition: box-shadow 0.2s ease;
          }
          .custom-slider:hover::-moz-range-thumb {
            box-shadow: 0 0 12px rgba(0, 212, 255, 0.8);
          }
        `}} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="custom-slider w-full h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer relative z-10 focus:outline-none"
          style={{
            background: `linear-gradient(to right, #00d4ff 0%, #7c3aed ${percentage}%, #374151 ${percentage}%, #374151 100%)`
          }}
        />
      </div>
    </div>
  );
}
