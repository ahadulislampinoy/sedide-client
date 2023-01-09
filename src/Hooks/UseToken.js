import axios from "axios";
import { useEffect, useState } from "react";

const UseToken = (email) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    if (email) {
      axios
        .get(`${process.env.REACT_APP_url}/jwt?email=${email}`)
        .then((res) => {
          if (res.data.token) {
            localStorage.setItem("sedide-token", res.data.token);
            setToken(res.data.token);
          }
        });
    }
  }, [email]);
  return [token];
};

export default UseToken;
