"use client";

import { useRouter } from 'next/navigation'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFoundError() {
  const router = useRouter();

  return (
    <div className="h-screen dark:bg-gray-900">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-4 text-gray-900 dark:text-gray-100">
        <h1 className="text-[7rem] font-bold leading-tight dark:text-gray-100">404</h1>
        <span className="font-medium">Oops! Page Not Found!</span>
        <p className="text-center text-gray-500 dark:text-gray-400">
          It seems like the page youre looking for <br />
          does not exist or might have been removed.
        </p>
        <div className="mt-6 flex gap-4">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-300"
          >
            Go Back
          </Button>
          <Link href="/">
            <Button variant="outline" className="hover:bg-gray-100 dark:hover:bg-gray-800">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
