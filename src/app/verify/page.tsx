'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createHash } from 'crypto';

export default function VerificationForm() {
  const [userInput, setUserInput] = useState('');
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const router = useRouter();

  // Generate today's verification code (last 4 chars of MD5 hash)
  const generateVerificationCode = (): string => {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const hash = createHash('md5').update(currentDate).digest('hex');
    return hash.slice(-4);
  };

  const verificationCode = generateVerificationCode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userInput === verificationCode) {
      setMessage({ text: 'Success! Code matched.', isError: false });
      // Redirect or perform action on success
       router.push('/');
    } else {
      setMessage({ text: 'Wrong OTP entered.', isError: true });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
         <p>Today's Date: {new Date().toISOString().split('T')[0]}</p>
          <p className='text-white'>API Key: {createHash('md5').update(new Date().toISOString().split('T')[0]).digest('hex')}</p>
        <h1 className="text-2xl font-bold mb-6 text-center">Today's OTP Verification</h1>
        
        {message && (
          <div className={`mb-4 p-3 rounded-md ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-1">
              Enter Today's OTP
            </label>
            <input
              type="text"
              id="verificationCode"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              maxLength={4}
              pattern="[a-fA-F0-9]{4}"
              title="Enter a 4-character hexadecimal code"
            />
            <p className="mt-1 text-xs text-gray-500">
              For OTP Contact The Administrator of the APP
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Verify
          </button>
        </form>

        {/* Debug view (remove in production) */}
        <div className="mt-6 p-3 bg-white-100 rounded-md text-xs">
          <p className="font-mono">Debug Info:</p>
        
          <p className='text-white'>Expected Code: {verificationCode}</p>
        </div>
      </div>
    </div>
  );
}