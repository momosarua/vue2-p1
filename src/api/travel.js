import axios from "../axios";

const getTravel = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/travel")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export {
    getTravel
}