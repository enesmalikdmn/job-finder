'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getJobs } from '../services/jobService';

const JobListingsPage = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]); // Job listesini tutmak için state

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('accessToken');

        if (!token) {
          router.push('/login');
          return;
        }

        const jobList = await getJobs(); 
        console.log('Fetched jobs:', jobList.data);

        setJobs(jobList.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, [router]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: '20px' }}>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job: any) => (
            <li key={job.id}>{job.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
};

export default JobListingsPage;
