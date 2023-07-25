'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

export interface IEmailJob {
  id: number;
  count: number;
  sentEmails: number;
}

export interface ICurrentEmailJobUpdate {
  jobId: number;
  sentSoFar: number;
}

export default function Home() {
  const [formData, setFormData] = useState<number>(0);
  const [emailJobs, setEmailJobs] = useState<IEmailJob[]>([]);
  const [newCurrent, setNewCurrent] = useState<ICurrentEmailJobUpdate | null>(
    null,
  );

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    if (newCurrent != null) {
      const currentRow = emailJobs.find((el: any) => el.id == newCurrent.jobId);
      setEmailJobs([
        ...emailJobs.filter((el) => el.id != currentRow!!.id),
        { ...currentRow!!, sentEmails: newCurrent.sentSoFar },
      ]);
    }
  }, [newCurrent]);

  useEffect(() => {
    // Connect to the WebSocket server
    const socket = io(
      process.env.NEXT_PUBLIC_WEBSOCKET_SERVER_URL ?? 'http://localhost:8001',
    );

    // Handle connection
    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    // Handle custom event from the server
    socket.on('email-job', (data: any) => {
      console.log('Received message from server:', data);
      setNewCurrent(data);
    });

    // Clean up the WebSocket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchJobs = async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/email-jobs`,
    );
    setEmailJobs(res.data);
  };

  const sendEmails = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/send-emails`, {
      count: formData,
    });
    fetchJobs();
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData < 1) return;
    sendEmails();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(+e.target.value);
  };

  return (
    <div className='flex flex-col  py-2 mt-4'>
      <div className='w-full max-w-xs mb-2 flex items-center justify-center'>
        <form
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={handleSubmit}
        >
          <div className='mb-4'>
            <label className='block text-gray-700 text-sm font-bold mb-2'>
              Count
            </label>
            <input
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='count'
              type='number'
              placeholder='100'
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
              type='submit'
            >
              Start
            </button>
          </div>
        </form>
      </div>

      <table className='table-auto'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email Count</th>
            <th>Sent Emails</th>
          </tr>
        </thead>
        <tbody>
          {emailJobs.length > 0
            ? emailJobs.map((el: any) => (
                <tr key={el.id} className='text-center'>
                  <td>{el.id}</td>
                  <td>{el.emailCount}</td>
                  <td>{el.sentEmails}</td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>
    </div>
  );
}
