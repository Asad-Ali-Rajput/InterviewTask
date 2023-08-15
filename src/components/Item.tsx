import Image from 'next/image';
import React, {useState, useEffect} from 'react';
import { useDispatch } from "react-redux";
import Modal from "./reuseable/modal";
import DeleteImg from '../../public/e8dad4d260c33c98d5d7c49ac3cb712d.svg'
import { updateItem, deleteItem } from "../store/action";

interface ItemProps {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  image: string;
}

const Item: React.FC<ItemProps> = ({ id, firstname, lastname, email, image }) => {
  console.log(firstname, lastname)
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isEmail, setIsEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCardView, setIsCardView] = useState(window.innerWidth < 900);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleInput = (e: any, setter: any) => {
    setter(e.target.value);
  };

  const editSubmit = () => {
    const editedItem = {
      id: id,
      firstname: firstName ? firstName : firstname,
      lastname: lastName ? lastName : lastname,
      email: isEmail ? isEmail : email,
      avatar: selectedImage ? URL.createObjectURL(selectedImage) : image,
    };
    dispatch(updateItem(editedItem)); // Dispatch the action to edit the item
    setFirstName("");
    setLastName("");
    setIsEmail("");
    setSelectedImage(null);
    setIsModalOpen(false);
    setIsEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteItem(id)); // Dispatch the action to delete the item
    setIsDelete(false); // Close the delete mode
    setIsModalOpen(false); // Close the modal
  };

  const closeModal = (name: string) => {
    if (name === 'edit') {
      setIsEdit(!isEdit); // Toggle the edit mode
      setIsModalOpen(!isModalOpen); // Toggle the modal
    } else {
      setIsDelete(!isDelete); // Toggle the delete mode
      setIsModalOpen(!isModalOpen); // Toggle the modal
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className={`${isCardView ? 'w-[210px] py-0 px-0' : 'w-full'} flex justify-between items-center py-2 px-2 mb-2 rounded-lg bg-white`}>
       <div className={`fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center bg-slate-800 ${isModalOpen ? "" : "hidden"}`}>
       {isEdit ? (
        <Modal heading={"Edit Customer"} handlemodal={() => closeModal('edit')}>
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
              onChange={(e) => handleInput(e, setIsEmail)}
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
          <button className="text-white w-full bg-gradient-to-r from-[#57BC90] via-[#004B40] to-[#004B40] hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center" type="button" onClick={editSubmit}>Edit Customer</button>
        </Modal>
        ) : isDelete ? (
          <Modal heading={"Delete Customer"} handlemodal={() => closeModal('delete')}>
            <div className='flex w-full h-full justify-center items-center'>
              <div className='block'>
              <Image className='' src={DeleteImg} alt='Image Not Found' />
              <div className='my-4'>
                <p className='text-center'>Are you sure?</p>
                <p className='text-center'>Do you really want to delete this customer? This process can not be undone.</p>
                <div className='flex justify-center items-center my-4'>
                  <button className='px-10 py-3 bg-slate-200 rounded-lg mr-3' type='button' onClick={() => closeModal('delete')}>Close</button>
                  <button className='px-10 py-3 bg-red-500 text-white rounded-lg' type='button' onClick={() => handleDelete()}>Delete</button>
                </div>
              </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
      {isCardView ? (
        <div className="w-500px bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <img className="rounded-t-lg w-full" src={image} alt={`${firstname}'s avatar`} />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{firstname} {lastname}</h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{email}</p>
            <div className="w-[280px] flex justify-between">
            <button
              type="button"
              className="bg-[#bae6dc] rounded-lg text-green-600 px-10 py-3"
              onClick={() => closeModal("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-red-200 rounded-lg text-red-600 px-10 py-3"
              onClick={() => closeModal("delete")}
            >
              Delete
            </button>
          </div>
          </div>
        </div>
      ) : (
        <div className='flex justify-between items-center w-full'>
          <Image
            src={image}
            alt={`${firstname}'s avatar`}
            width={50}
            height={50}
            className="w-[100px] h-[100px] rounded-lg"
          />
          <p>ID: {id}</p>
          <p>Name: {firstname + " " + lastname}</p>
          <p>Email: {email}</p>
          <div className="w-[280px] flex justify-between">
            <button
              type="button"
              className="bg-[#bae6dc] rounded-lg text-green-600 px-10 py-3"
              onClick={() => closeModal("edit")}
            >
              Edit
            </button>
            <button
              type="button"
              className="bg-red-200 rounded-lg text-red-600 px-10 py-3"
              onClick={() => closeModal("delete")}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;
