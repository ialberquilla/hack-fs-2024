"use client"
import type { NextPage } from "next";

const Debug: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-4">
        <div className="px-2">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Chat rooms</span>
            <span className="block text-2xl">Access score gated rooms based on your historical score</span>
          </h1>
        </div>
        <div className="flex-grow bg-base-300 w-full mt-6 px- py-4 flex justify-center items-center">

          <div className="flex flex-wrap justify-between">
            <div className="max-w-sm p-6 ml-9 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full sm:w-1/2">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Gold Tier</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Users that holds a score NFT with an scoring higher than 60 points can join</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Join now
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>

            <div className="max-w-sm p-6 ml-9 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full sm:w-1/2">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Silver Tier</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Users that holds a score NFT with an scoring higher than 40 points can join</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Join now
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>

            <div className="max-w-sm p-6 ml-9 sbg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full sm:w-1/2">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bronze Tier</h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Users that holds a score NFT with an scoring higher than 20 points can join</p>
              <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Join now
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Debug;
