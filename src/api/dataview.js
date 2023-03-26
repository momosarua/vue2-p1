import axios from "@/axios";

const getDataView = () => {
  return new Promise((resolve, reject) => {
    axios
      .get("/dataview")
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export {
    getDataView
}