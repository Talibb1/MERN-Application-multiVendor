const CallsComponent = ({ data }: { data: any[] }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Calls</h2>
    {data.map((item) => (
      <div key={item.id} className="flex items-center space-x-3">
        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200">
          <span className="font-bold">{item.icon}</span>
        </div>
        <div className="flex-1">
          <p className="font-medium">{item.text}</p>
          <p className="text-sm text-gray-500">{item.date}</p>
        </div>
      </div>
    ))}
  </div>
);

export default CallsComponent;
