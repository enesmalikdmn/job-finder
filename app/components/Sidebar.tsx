export const Sidebar = () => {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          <div>
            <p className="font-bold">hr@shft.co</p>
            <p className="text-sm text-gray-500">Applied Jobs</p>
          </div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((job) => (
            <div
              key={job}
              className="border rounded-lg p-2 bg-white shadow-sm text-sm"
            >
              <p className="font-bold">Job Name</p>
              <p>Company Name: Ipsum Dolor</p>
              <p>Location: Irving</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  