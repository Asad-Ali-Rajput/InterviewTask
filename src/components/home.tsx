import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/reducer";
import Item from "./Item";
import SortArrow from "../../public/Screenshot 2023-08-15 at 9.06.01 PM.png";
import Modal from "./reuseable/modal";
import { addItem, sortItems } from "../store/action";

const Home = () => {
  const items = useSelector((state: RootState) => state.items);
  console.log(items);
  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const sortById = () => {
    dispatch(sortItems("id"));
  };

  const sortByName = () => {
    dispatch(sortItems("name"));
  };

  const sortByEmail = () => {
    dispatch(sortItems("email"));
  };

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleInput = (e: any, setter: any) => {
    setter(e.target.value);
  };

  const handleSubmit = () => {
    const newItem = {
      id: items.length + 1, // Assuming you generate IDs sequentially
      firstname: firstName,
      lastname: lastName,
      email: email,
      avatar: selectedImage ? URL.createObjectURL(selectedImage) : "",
    };
    console.log(newItem);
    dispatch(addItem(newItem)); // Dispatch the action to store the new item
    setFirstName("");
    setLastName("");
    setEmail("");
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(isModalOpen ? false : true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 900) {
        setIsDropdownOpen(true);
      }
      else{
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full px-10 overflow-scroll">
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center bg-slate-800 ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <Modal
          heading={"Add New Customer"}
          handlemodal={closeModal}
          handleSubmit={handleSubmit}
        >
          <div className="mb-6">
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => handleInput(e, setFirstName)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your first name"
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => handleInput(e, setLastName)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your last name"
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => handleInput(e, setEmail)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
            />
          </div>
          <label className="block mt-4 text-[#57BC90] underline">
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="mt-2">
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-32 h-32 mx-auto"
                />
              )}
            </div>
          </label>
          <button
            className="text-white w-full bg-gradient-to-r from-[#57BC90] via-[#004B40] to-[#004B40] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center"
            type="button"
            onClick={handleSubmit}
          >
            ADD CUSTOMER
          </button>
        </Modal>
      </div>
      <button
        type="button"
        className="text-white my-10 bg-gradient-to-r from-[#57BC90] via-[#004B40] to-[#004B40] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
        onClick={closeModal}
      >
        <span className="pr-4">+</span>
        <span>ADD NEW CUSTOMER</span>
      </button>
      {isDropdownOpen ? (
        <div className="iabsolute mt-2 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[135px] dark:bg-gray-700 mb-4">
          <button
            type="button"
            onClick={toggleDropdown}
            className="text-white w-full flex justify-center items-center bg-gradient-to-r from-[#57BC90] via-[#004B40] to-[#004B40] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
          >
            Sort By
            <svg
              className="w-2.5 h-2.5 ml-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700"
              aria-labelledby="dropdownHoverButton"
            >
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <button
                    type="button"
                    onClick={sortById}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort by ID
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={sortByName}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort by Name
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={sortByEmail}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Sort by Email
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center py-4 bg-[#bae6dc] rounded-lg my-10 text-[#015249]">
          <button
            className="mr-[100px] flex justify-center items-center"
            onClick={sortById}
          >
            CustomerID#
            <Image className="w-4" src={SortArrow} alt="Sorting Image" />
          </button>
          <button
            className="mr-[90px] flex justify-center items-center"
            onClick={sortByName}
          >
            Customer Name
            <Image className="w-4" src={SortArrow} alt="Sorting Image" />
          </button>
          <button
            className="mr-[190px] flex justify-center items-center"
            onClick={sortByEmail}
          >
            CustomerEmail
            <Image className="w-4" src={SortArrow} alt="Sorting Image" />
          </button>
        </div>
      )}
      {items.map((item: any) => (
        <Item
          key={item.id}
          id={item.id}
          firstname={item.firstname}
          lastname={item.lastname}
          email={item.email}
          image={item.avatar}
        />
      ))}
    </div>
  );
};

export default Home;
