import DashboardGrid from '@/components/dashboard/DashboardGrid';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6 overflow-y-auto h-full">
      {/* Hero Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome to <span className="text-[#00d4ff]">Urbanscapes-LK</span>
        </h1>
        <p className="text-[#94a3b8] text-lg">
          Spatial Intelligence Platform for Urban Planning & Development
        </p>
      </div>
      
      <DashboardGrid />
    </div>
  );
}
