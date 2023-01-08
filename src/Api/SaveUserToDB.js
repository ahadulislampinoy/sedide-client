import axios from "axios";

const SaveUserToDB = (user) => {
  if (user) {
    const userDetails = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };
    axios.post(
      `${process.env.REACT_APP_url}/userdata?email=${user?.email}`,
      userDetails
    );
  }
};

export default SaveUserToDB;
