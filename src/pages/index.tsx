import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import Home from '@/components/home';
import { addItem } from '../store/action';

const Index: React.FC = () => {
  const dispatch = useDispatch();
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=1')
      .then(response => {
        const fetchedItems = response.data.data.map((item: any) => ({
          id: item.id,
          firstname: item.first_name,
          lastname: item.last_name,
          email: item.email,
          avatar: item.avatar,
        }));
        console.log(fetchedItems, "1")
        dispatch(addItem(fetchedItems));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  useEffect(() => {
    // Define a function to update the state based on screen width
    const updateSidebarVisibility = () => {
      setShowSidebar(window.innerWidth >= 1020);
    };

    // Call the function once to set the initial state
    updateSidebarVisibility();

    // Attach the event listener on the client side
    window.addEventListener('resize', updateSidebarVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateSidebarVisibility);
    };
  }, []);

  return (
    <div className='w-screen h-screen flex overflow-hidden'>
      {showSidebar && <Sidebar />}
      <div className='w-full h-full overflow-y-scroll'>
        <Navbar />
        <Home />
      </div>
    </div>
  );
};

export default Index;
