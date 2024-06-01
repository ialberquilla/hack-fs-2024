"use client"
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useScore } from "~~/hooks/scaffold-eth/useScore";
import { getFiles } from "~~/utils/api";

const Debug: NextPage = () => {

  const [files, setFiles] = useState([]);
  const { addScore } = useScore();

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    const files = await getFiles();
    setFiles(files.map((file: any) => {
      return {
        score: file.filename.split("-")[1],
        user: file.filename.split("-")[0],
        date: new Date(parseInt(file.filename.split("-")[2])),
      };
    }));
  };

  const saveScore = async (score: any) => {
    console.log(score);
    await addScore(score);
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Game
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {files.map((file: any, index: number) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {'Amanzing track'}
                  </th>
                  <td className="px-6 py-4">
                    {file.score}
                  </td>
                  <td className="px-6 py-4">
                    {file.date.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => saveScore(file.score)}>Mint</a>
                  </td>
                </tr>
              ))}

               <tr key={4} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {'Amanzing track'}
                </th>
                <td className="px-6 py-4">
                  {78}
                </td>
                <td className="px-6 py-4">
                  {"5/31/2024"}
                </td>
                <td className="px-6 py-4">
                  <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline" 
                  
                  onClick={() => saveScore(68)}>Mint</a>
                </td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Debug;
