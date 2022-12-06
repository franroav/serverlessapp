import axios from "axios";
//http://localhost:5000/api/subscription/register
const baseUrl = `${process.env.REACT_APP_BACKEND_APP_URL}`;

const getAll = async () => {
  try {
    return axios({
      method: "get",
      url: `${baseUrl}/users`,
    }).then(
      (result) => {
        if (result.status === 200) {
          const data = result.data.payload.map((user) => {
            const {password, ...response} = user
            return response
          })
          return data
        }
        return [];
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

const getById = async (id) => {
  try {
    return axios({
      method: "get",
      url: baseUrl + `/users/${id}`,
    }).then(
      (result) => {
        return result.data;
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

const create = async (body) => {
  try {
    return axios({
      method: "post",
      url: `${baseUrl}/auth/register`,
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

const update = async (id, body) => {
  try {
    return axios({
      method: "put",
      url: baseUrl + `/users/${id}`,
      body: body,
    }).then(
      (result) => {
        return result.data.payload;
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

const deleteById = async (id) => {
  try {
    return axios({
      method: "delete",
      url: baseUrl + `/${id}`,
    }).then(
      (result) => {
        return result.data.payload;
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
  getAll,
  getById,
  create,
  update,
  deleteById,
};
