import React from "react";
import { NavLink } from "react-router";


const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleOtsideClick = (e)=>{
    if (e.target=== e.currentTarget){
      onClose();
    }
  }

  return (
    <div onClick={handleOtsideClick} className="fixed  inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-[var(--color-primaryPurple)] font-[var(--font-poppins)]  relative text-black rounded-lg shadow-lg w-96 p-6 z-50">

        <h3 className="font-bold text-lg text-white mb-4">Confirm Logout</h3>
                <button  onClick={onClose}
className="btn btn-sm btn-circle btn-ghost text-red-500  absolute right-2 top-2">✕</button>

        <p className="mb-6 text-white">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-400  text-white rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <NavLink to ="/Login"
            className="px-4 py-2 bg-white hover:bg-gray-200 text-black rounded"
            onClick={onConfirm}
          >
            Login
          </NavLink>
          
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
