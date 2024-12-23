'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const JobListingsPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) router.push('/login');
  }, [router]);

  return (
    <div style={{ display: 'flex' }}>
      Job listing
    </div>
  );
};

export default JobListingsPage;
