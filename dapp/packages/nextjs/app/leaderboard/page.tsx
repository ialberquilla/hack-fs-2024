import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const metadata = getMetadata({
  title: "Leaderboard",
  description: "Here you can see the leaderboard of the game.",
});

const Debug: NextPage = () => {
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
                  user
                </th>
                <th scope="col" className="px-6 py-3">
                  Score
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Amazing track
                </th>
                <td className="px-6 py-4">
                  ialberquilla.eth
                </td>
                <td className="px-6 py-4">
                  78
                </td>
                <td className="px-6 py-4">
                 31-05-2024
                </td>
              </tr>

              <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Amazing track
                </th>
                <td className="px-6 py-4">
                  tereth.eth
                </td>
                <td className="px-6 py-4">
                  130
                </td>
                <td className="px-6 py-4">
                 30-05-2024
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
