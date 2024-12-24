export const Sidebar = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-center flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-400"></div>
          <div>
            <p className="font-bold text-gray-500">hr@shft.co</p>
            <p className="text-sm font-bold mt-4">Applied Jobs</p>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((job) => (
            <div
              key={job}
              className="flex flex-col gap-2 border rounded-lg p-2 bg-white shadow-sm text-sm"
            >
              <p className="flex justify-center font-bold">Job Name</p>
              <p>Company Name: Ipsum Dolor</p>
              <p>Location: Irving</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  