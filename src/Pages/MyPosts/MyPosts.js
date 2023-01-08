import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DeleteModal from "../../Components/DeleteModal";
import EditModal from "../../Components/EditModal";
import { AuthContext } from "../../Contexts/AuthProvider";

const MyPosts = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  let [editModalOpen, setEditModalOpen] = useState(false);
  let [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [postData, setPostData] = useState([]);

  const closeModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/myposts?email=${user?.email}`)
      .then((res) => {
        setPosts(res.data);
      });
  }, [posts.length, user?.email, posts]);
  return (
    <>
      {posts.length === 0 ? (
        <div className="h-screen flex justify-center items-center text-3xl">
          No Post Available
        </div>
      ) : (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 ">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white text-gray-700 rounded shadow-sm relative"
            >
              <img
                className="rounded-t h-60 w-full object-cover"
                src={post.image}
                alt="img"
              />
              <div className="p-5">
                <p className="text-gray-600">{post.description}</p>
              </div>
              <div className="p-5 pt-2 flex justify-between">
                <div>
                  <button
                    onClick={() => {
                      setDeleteModalOpen(true);
                      setPostData(post);
                    }}
                  >
                    <TrashIcon className="inline-block h-6 w-6 mr-2" />
                  </button>
                  <button
                    onClick={() => {
                      setEditModalOpen(true);
                      setPostData(post);
                    }}
                  >
                    <PencilSquareIcon className="inline-block h-6 w-6 mx-2" />
                  </button>
                </div>
              </div>
            </article>
          ))}
          <EditModal
            editModalOpen={editModalOpen}
            setEditModalOpen={setEditModalOpen}
            closeModal={closeModal}
            postData={postData}
          />
          <DeleteModal
            deleteModalOpen={deleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            closeModal={closeModal}
            postData={postData}
          />
        </section>
      )}
    </>
  );
};

export default MyPosts;
