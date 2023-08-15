import React from 'react';

interface ItemProps {
  id: number;
  name: string;
  email: string;
  image: string;
}

const Sidebar = () => {
  return (
    <div className="w-[300px] flex justify-center items-center rounded-r-lg h-full bg-[#015249] p-4">
      <button type="button" className="focus:outline-none text-white bg-[#043933] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">CUSTOMERS</button>
    </div>
  );
};

export default Sidebar;
