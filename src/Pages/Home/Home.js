import axios from "axios";
import React, { useEffect, useState } from "react";
import LargeSpinner from "../../Components/LargeSpinner";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_url}/post`).then((res) => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading ? (
        <LargeSpinner />
      ) : (
        <div className="px-4 pb-4 pt-1 md:pt-0">
          {posts.map((post) => (
            <article
              key={post._id}
              className="bg-white text-gray-700 rounded shadow-sm relative mt-4"
            >
              <div style={{ boxShadow: "inset 0 0 10px #6b4ce645" }}>
                <img
                  className="rounded-t max-h-[460px] w-full object-contain py-4"
                  src={post.image}
                  alt="Post"
                />
              </div>
              <div className="p-5 bg-gray-200">
                <p className="text-gray-700">{post.description}</p>
              </div>
              <div className="p-5 pt-2 flex bg-gray-200 rounded">
                <img
                  className="h-10 w-10 object-cover rounded-full mr-3"
                  src={post.authorImg}
                  alt="author"
                />
                <div>
                  <h6>{post.author}</h6>
                  <p className="text-gray-700 text-sm">
                    {post.time.substring(4, 15)}
                  </p>
                </div>
              </div>
            </article>
          ))}{" "}
        </div>
      )}
    </>
  );
};

export default Home;
