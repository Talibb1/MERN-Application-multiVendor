export default function DashboardLoader() {
    return (
      <div className="animate-pulse">
        <div className="mb-2 flex items-center justify-between space-y-2">
          <div className="h-8 w-32 bg-slate-200 rounded"></div> {/* Title */}
        </div>
  
        <div className="w-full overflow-x-auto pb-2">
          <div className="flex space-x-4">
            <div className="h-8 w-20 bg-slate-200 rounded"></div> {/* Tabs */}
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
            <div className="h-8 w-20 bg-slate-200 rounded"></div>
          </div>
        </div>
  
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Total Revenue Card */}
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-4 w-24 bg-slate-200 rounded mt-2"></div>
            </div>
  
            {/* Total Leads Card */}
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-4 w-24 bg-slate-200 rounded mt-2"></div>
            </div>
  
            {/* Total Companies Card */}
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-4 w-24 bg-slate-200 rounded mt-2"></div>
            </div>
  
            {/* Active Leads Card */}
            <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-slate-200 rounded"></div>
                <div className="h-4 w-4 bg-slate-200 rounded"></div>
              </div>
              <div className="h-6 w-16 bg-slate-200 rounded"></div>
              <div className="h-4 w-24 bg-slate-200 rounded mt-2"></div>
            </div>
          </div>
  
          {/* Overview and Recent Leads Section */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            {/* Overview Card */}
            <div className="col-span-1 lg:col-span-4 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="h-4 w-32 bg-slate-200 rounded mb-4"></div>
              <div className="h-32 bg-slate-200 rounded"></div> {/* Overview Chart */}
            </div>
  
            {/* Recent Leads Card */}
            <div className="col-span-1 lg:col-span-3 p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
              <div className="h-4 w-64 bg-slate-200 rounded mb-4"></div>
              <div className="h-32 bg-slate-200 rounded"></div> {/* Recent Leads */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  