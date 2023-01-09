import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import SaveUserToDB from "../../Api/SaveUserToDB";
import SmallSpinner from "../../Components/SmallSpinner";
import { AuthContext } from "../../Contexts/AuthProvider";
import UseToken from "../../Hooks/UseToken";

const Register = () => {
  const { updateUser, createUser, googleSignIn } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [token] = UseToken(email);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
      window.location.reload();
    }
  }, [navigate, token]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setAuthError("");
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
          // Create user
          createUser(data.email, data.password)
            .then((result) => {
              const user = result.user;
              setLoading(false);
              reset();
              setImgUrl("");
              // Update user
              updateUser(data.name, imgData.data.display_url)
                .then((result) => {
                  SaveUserToDB(user, setEmail);
                  toast.success("Registration successful");
                })
                .catch((err) => {
                  setAuthError(err);
                });
            })
            .catch((err) => {
              setAuthError(err);
              setLoading(false);
            });
        }
      });
  };

  // Google signin
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        toast.success("Login successful");
        setEmail(user?.email);
        SaveUserToDB(user);
      })
      .catch((err) => {
        setAuthError(err);
      });
  };

  return (
    <section className="min-h-screen flex flex-wrap lg:justify-center lg:items-center">
      <div className="w-full h-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2">
        <div className="my-6">
          <h1 className="my-t text-center text-3xl font-extrabold text-gray-100">
            Register your account
          </h1>
          <p className="mt-2 text-center text-sm text-gray-200">
            Or
            <Link
              to="/login"
              className="font-medium text-indigo-300 border-b border-indigo-600"
            >
              {" "}
              Login in your account{" "}
            </Link>
          </p>
        </div>
        <div className="max-w-md w-full mx-auto text-gray-600 font-medium bg-white shadow rounded-lg p-7 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex flex-col">
              <label
                className="text-sm font-bold text-gray-600 mb-1"
                htmlFor="email"
              >
                Name
              </label>
              <input
                className="border rounded-md bg-white px-3 py-2 fo"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your Full Name"
                {...register("name", { required: true })}
              />
              {errors?.name && (
                <p className="text-red-500 mt-1">Name is required</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="text-sm font-bold text-gray-600 mb-2"
              >
                Profile Photo
              </label>
              <label
                htmlFor="dropzone-file"
                className="flex items-center text-gray-600 border focus:ring ring-gray-100 rounded outline-none transition duration-100 px-3 py-2 cursor-pointer"
              >
                <h2 className="overflow-hidden">
                  {imgUrl ? imgUrl : <p>Choose photo..</p>}
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
                <p className="text-red-500 mt-1">Profile photo is required</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="text-sm font-bold text-gray-600 mb-1"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                className="border rounded-md bg-white px-3 py-2 fo"
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email Address"
                {...register("email", { required: true })}
              />
              {errors?.email && (
                <p className="text-red-500 mt-1">Email adress is required</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                className="text-sm font-bold text-gray-600 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="border rounded-md bg-white px-3 py-2"
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                {...register("password", { required: true })}
              />
              {errors?.password && (
                <p className="text-red-500 mt-1">Password is required</p>
              )}
            </div>
            <div>
              {authError && (
                <p className="text-red-500 my-1">{authError.message}</p>
              )}
              <button className="w-full bg-indigo-600 text-white rounded-md p-2">
                {loading ? <SmallSpinner /> : "Register"}
              </button>
            </div>
          </form>
          <div className="relative pb-2">
            <div className="absolute top-0 left-0 w-full border-b"></div>
            <div className="absolute -top-3 left-0 w-full text-center">
              <span className="bg-white text-gray-600 px-3 text-sm">
                or continue via
              </span>
            </div>
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-50 "
          >
            <div className="px-4 py-2">
              <svg className="w-6 h-6" viewBox="0 0 40 40">
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>

            <span className="py-3 font-bold text-center">
              Register with Google
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Register;
