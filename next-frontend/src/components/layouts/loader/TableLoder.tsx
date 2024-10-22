const TableLoader = () => {
  return (
    <div className="p-6">
      <div className="mb-4 w-1/3">
        <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
      </div>
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead>
          <tr>
            {[
              "ID",
              "Company Name",
              "Contact Name",
              "Status",
              "Phone",
              "Email",
              "Actions",
            ].map((header, index) => (
              <th key={index} className="px-4 py-2 bg-gray-50">
                <div className="h-4 bg-slate-200 rounded w-full animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array(10)
            .fill(0)
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="animate-pulse">
                <td className="px-4 py-2">
                  <div className="h-4 bg-slate-200 rounded w-8"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-slate-200 rounded w-32"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-slate-200 rounded w-24"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-slate-200 rounded w-16"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-6 w-6 bg-slate-200 rounded-full"></div>
                </td>
                <td className="px-4 py-2">
                  <div className="h-4 bg-slate-200 rounded w-8"></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;
