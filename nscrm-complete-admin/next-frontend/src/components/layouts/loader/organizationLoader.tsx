export default function OrganizationLoader() {
    return (
      <div className="container mx-auto p-3 max-w-md animate-pulse">
        <div className="bg-white rounded-lg p-6 shadow-lg space-y-4">
          {/* Organization Name Input Skeleton */}
          <div className="flex flex-col">
            <div className="h-4 bg-slate-200 rounded w-40 mb-3"></div> {/* Label Placeholder */}
            <div className="h-10 bg-slate-200 rounded w-full"></div>  {/* Input Placeholder */}
          </div>
  
          {/* Submit Button Skeleton */}
          <div className="mt-6">
            <div className="h-10 bg-slate-200 rounded w-full"></div> {/* Button Placeholder */}
          </div>
  
          {/* Organization Dropdown Skeleton */}
          <div className="mt-4">
            <div className="h-4 bg-slate-200 rounded w-40 mb-2"></div> {/* Dropdown Label */}
            <div className="h-10 bg-slate-200 rounded w-full"></div> {/* Dropdown Placeholder */}
          </div>
        </div>
      </div>
    );
  }
  