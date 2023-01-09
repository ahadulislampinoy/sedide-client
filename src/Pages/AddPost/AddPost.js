import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "../../Components/SmallSpinner";
import { AuthContext } from "../../Contexts/AuthProvider";

const AddPost = () => {
  const [imgUrl, setImgUrl] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    // Add image to imgbb
    const imgbbKey = process.env.REACT_APP_imgbb_apiKey;
    const formData = new FormData();
    formData.append("image", data.image[0]);
    fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          const postDetails = {
            description: data.description,
            image: imgData.data.display_url,
            author: user?.displayName,
            authorEmail: user?.email,
            authorImg: user?.photoURL,
            time: new Date().toString(),
          };
          axios
            .post(`${process.env.REACT_APP_url}/post`, postDetails, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("sedide-token")}`,
              },
            })
            .then((res) => {
              if (res.data.insertedId) {
                toast.success("Post uploaded");
                setImgUrl("");
                setLoading(false);
                reset();
                navigate("/myposts");
              }
            });
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-5">
          <div className="lg:col-span-2 lg:py-12">
            <h1 className="max-w-xl mx-auto text-center lg:text-start text-4xl sm:text-5xl lg:text-6xl drop-shadow-lg font-bold text-gray-400">
              Upload Your Latest Update
              <ArrowUpTrayIcon className="inline-block h-10 w-10 ml-1" />
            </h1>
          </div>

          <div className="rounded-lg lg:col-span-3 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="sr-only" htmlFor="description">
                  Post Image
                </label>
                <label
                  htmlFor="dropzone-file"
                  className="flex items-center text-gray-600 border focus:ring ring-gray-100 rounded outline-none transition duration-100 px-3 py-2 cursor-pointer w-full bg-gray-50  border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring-opacity-40 p-3 sm:text-lg"
                >
                  <h2 className="overflow-hidden">
                    {imgUrl ? imgUrl : <p>Choose Photo..</p>}
                  </h2>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onInputCapture={(e) => setImgUrl(e.target.value.slice(12))}
                    {...register("image", { required: true })}
                  />
                </label>
                {errors?.image && (
                  <p className="text-red-500 mt-1 font-semibold">
                    Photo is required
                  </p>
                )}
              </div>

              <div>
                <label className="sr-only" htmlFor="description">
                  Post Description
                </label>
                <textarea
                  className="w-full rounded-lg text-gray-600 bg-gray-50 border border-gray-200 focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40 p-3 sm:text-lg"
                  placeholder="Post Description"
                  rows="6"
                  name="description"
                  id="description"
                  {...register("description", { required: true })}
                ></textarea>
                {errors?.description && (
                  <p className="text-red-500 mt-1 font-semibold">
                    Description is required
                  </p>
                )}
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="px-4 py-3 inline-block mt-2 font-medium border-2 border-indigo-300 rounded-lg bg-white transition text-gray-600"
                >
                  {loading ? (
                    <SmallSpinner borderColor={"border-black"} />
                  ) : (
                    "Add Service"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default AddPost;
