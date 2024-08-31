'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [hostname, setHostname] = useState<string>('');

  useEffect(() => {
    setHostname(`${window.location.protocol}//${window.location.host}`);
  }, []);

  return (
    <section className='w-full py-12 md:py-24 lg:py-32 bg-background'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>AuthScam</h1>
          </div>
          <div className='w-full max-w-md space-y-4'>
            <h2 className='text-2xl font-semibold'>An oauth2 mocker</h2>
            <ul className='text-left space-y-2 text-lg'>
              <li className='flex items-center space-x-2'>
                <svg
                  className=' h-6 w-6 text-primary'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <polyline points='9 11 12 14 22 4' />
                  <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                </svg>
                <span>
                  Set OAuth2 server URL to{' '}
                  {hostname ? (
                    <a className='underline' href={hostname}>
                      {hostname}
                    </a>
                  ) : (
                    'this page'
                  )}
                </span>
              </li>
              <li className='flex items-center space-x-2'>
                <svg
                  className=' h-6 w-6 text-primary'
                  fill='none'
                  height='24'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  viewBox='0 0 24 24'
                  width='24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <polyline points='9 11 12 14 22 4' />
                  <path d='M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11' />
                </svg>
                <span>Change your client ID to the redirectUri</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
