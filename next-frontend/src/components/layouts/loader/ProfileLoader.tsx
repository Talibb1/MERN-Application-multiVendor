export default function ProfileLoader() {
    return (
      <div className="container mx-auto p-3 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl animate-pulse">
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col items-center space-y-4">
          <div className="relative w-24 h-24">
            <div className="w-full h-full bg-slate-200 rounded-full"></div>
          </div>
          <p className="h-4 bg-slate-200 rounded w-32"></p>
          <p className="h-4 bg-slate-200 rounded w-20"></p>
          <div className="flex items-center justify-between w-full">
            <p className="h-4 bg-slate-200 rounded w-24"></p>
            <div className="h-6 w-11 bg-slate-200 rounded-full"></div>
          </div>
          <div className="flex items-center justify-between w-full">
            <p className="h-4 bg-slate-200 rounded w-32"></p>
            <div className="h-6 w-11 bg-slate-200 rounded-full"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded w-full"></div>
        </div>
        <div className="col-span-2 bg-white rounded-lg p-6 shadow-lg space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <div className="h-4 bg-slate-200 rounded w-32"></div>
                <div className="h-10 bg-slate-200 rounded w-full"></div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="h-10 bg-slate-200 rounded w-full"></div> {/* Placeholder for button */}
          </div>
        </div>
      </div>
    );
  }
  