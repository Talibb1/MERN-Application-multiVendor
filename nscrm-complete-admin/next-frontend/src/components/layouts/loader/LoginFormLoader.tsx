export default function LoginFormLoader() {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="mx-auto max-w-md bg-white dark:bg-gray-800 animate-pulse">
          <div className="p-6 space-y-6">
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div> 
            <div className="h-4 bg-slate-200 rounded w-1/2"></div> 
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="h-10 bg-slate-200 rounded w-full"></div> 
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                <div className="ml-auto h-4 bg-slate-200 rounded w-1/3"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded w-full"></div> 
            </div>
            <div className="h-12 bg-slate-200 rounded w-full"></div>
            <div className="h-12 bg-slate-200 rounded w-full mt-4"></div>
            <div className="mt-4 h-4 bg-slate-200 rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }
  