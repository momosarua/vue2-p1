import axios from "../axios";

const login = (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export { login };
