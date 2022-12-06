import axios from "axios";
//http://localhost:5000/api/subscription/register
const baseUrl = `${process.env.REACT_APP_BACKEND_APP_URL}`;




const login = async (body) => {
  try {
    return axios({
      method: "post",
      url:`${baseUrl}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(body),
    }).then(
      (result) => {
        return result;
      },
      (error) => {
        console.log({ error: "Error: " + error.message });
        return { error: "Error: " + error.message };
      }
    );
  } catch (err) {
    return { error: "Error: " + err.message };
  }
};

const register = async (body) => {
    try {
      return axios({
        method: "post",
        url:`${baseUrl}/auth/register`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(body),
      }).then(
        (result) => {
          return result;
        },
        (error) => {
          console.log({ error: "Error: " + error.message });
          return { error: "Error: " + error.message };
        }
      );
    } catch (err) {
      return { error: "Error: " + err.message };
    }
  };


export {
  login,
  register,
};
