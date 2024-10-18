export default function SecurityLoader() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      <div className="bg-white rounded-lg p-6 shadow-lg space-y-6 max-w-2xl mx-auto">
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-32"></div>
          <div className="h-10 bg-slate-200 rounded w-full"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-32"></div>
          <div className="h-10 bg-slate-200 rounded w-full"></div>
        </div>

        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-48"></div>
          <div className="h-10 bg-slate-200 rounded w-full"></div>
        </div>
        <div className="mt-6">
          <div className="h-12 bg-slate-200 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
}
