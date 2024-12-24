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

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  addJob: (job) =>
    set((state) => ({
      jobs: [...state.jobs, job],
    })),
  removeJob: (jobId) =>
    set((state) => ({
      jobs: state.jobs.filter((job) => job.id !== jobId),
    })),
}));
