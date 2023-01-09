import axios from "axios";

const SaveUserToDB = (user, setEmail) => {
  if (user) {
    const userDetails = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };
    axios
      .post(
        `${process.env.REACT_APP_url}/userdata?email=${user?.email}`,
        userDetails
      )
      .then((res) => setEmail(user?.email));
  }
};

export default SaveUserToDB;
