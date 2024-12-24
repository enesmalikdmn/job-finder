import { create } from 'zustand';

interface Job {
  id: string;
  name: string;
  companyName: string;
  location: string;
  salary: number;
  description: string;
  keywords: string[];
}

interface JobState {
  jobs: Job[];
  addJob: (job: Job) => void;
  removeJob: (jobId: string) => void;
}

const loadJobsFromStorage = (): Job[] => {
  const storedJobs = localStorage.getItem("appliedJobs");
  return storedJobs ? JSON.parse(storedJobs) : [];
};

export const useJobStore = create<JobState>((set) => ({
  jobs: loadJobsFromStorage(),
  addJob: (job) =>
    set((state) => {
      const updatedJobs = [...state.jobs, job];
      localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs)); // localStorage'a kaydet
      return { jobs: updatedJobs };
    }),
  removeJob: (jobId) =>
    set((state) => {
      const updatedJobs = state.jobs.filter((job) => job.id !== jobId);
      localStorage.setItem("appliedJobs", JSON.stringify(updatedJobs)); // localStorage'ı güncelle
      return { jobs: updatedJobs };
    }),
}));
