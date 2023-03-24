import axios from "../axios";

// 获取学生列表/根据姓名查询学生列表
const getStudentList = (params) => {
  return new Promise((resolve, reject) => {
    axios
      .get("/students", {params})
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log(err, 222);
        reject(err);
      });
  });
};

// 删除指定学生
const deleteStudent = () => {
  return new Promise((resolve, reject) => {
    axios
      .delete("/students/:id")
      .then((res) => resolve(res.data))
      .catch((err) => {
        console.log(err, 222);
        reject(err);
      });
  });
};

export { getStudentList, deleteStudent };
