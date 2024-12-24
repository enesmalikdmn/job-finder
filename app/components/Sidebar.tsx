import { useJobStore } from '../../store/useJobStore';
import { useUserStore } from '../../store/useAuthStore';

export const Sidebar = () => {
  const { jobs } = useJobStore();
  const { user } = useUserStore();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-center flex-col items-center gap-3">
        <div className="w-[72px] h-[72px] rounded-full bg-gray-400">
          <img
            src={user.profileImage || '/default-profile.png'} 
            alt="Profile"
            className="w-full h-full rounded-full"
            width={72} 
            height={72} 
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-bold text-gray-500">{user.email}</p>
          <p className="text-sm flex justify-center font-bold mt-4">Applied Jobs</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {jobs.length === 0 ? (
          <p className="text-center text-sm text-gray-500">No jobs applied yet</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="flex flex-col gap-2 border rounded-lg p-2 bg-white shadow-sm text-sm"
            >
              <p className="flex justify-center font-bold">{job.name}</p>
              <p><span className="font-bold">Company Name:</span> {job.companyName}</p>
              <p><span className="font-bold">Location:</span> {job.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
