import axios from "../axios";

const getWorkList = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/works", {params})
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export {
    getWorkList
}
