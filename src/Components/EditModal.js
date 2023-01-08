import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";

const EditModal = ({
  editModalOpen,
  closeModal,
  setEditModalOpen,
  postData,
}) => {
  const [newDescription, setNewDescription] = useState(postData.description);
  const handleUpdate = () => {
    axios
      .patch(`http://localhost:5000/updatepost/${postData._id}`, {
        newDescription,
      })
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Post updated successfully");
          setEditModalOpen(false);
        }
      });
  };
  return (
    <Transition appear show={editModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-lg font-medium leading-6 text-gray-900 capitalize"
                >
                  <span>Update</span>
                  <span onClick={closeModal}>
                    <XMarkIcon className="h-5 w-5 text-gray-800 cursor-pointer inline-block" />
                  </span>
                </Dialog.Title>
                <div className="text-sm text-gray-800 mt-1">
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    onChange={(e) => setNewDescription(e.target.value)}
                    defaultValue={postData?.description}
                    className="w-full shadow-lg shadow-gray-300 rounded-lg my-3 p-3 border border-gray-300"
                  ></textarea>
                  <button
                    type="button"
                    onClick={handleUpdate}
                    className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg "
                  >
                    Update
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
