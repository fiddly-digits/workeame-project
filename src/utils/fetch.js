import axios from 'axios';

const handleToken = () => {
  const token = sessionStorage.getItem('token');
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

export const fetchUser = async (method, headers) => {
  const plainPayload = handleToken();
  var options = {
    method,
    url: `http://localhost:8080/api/v1/user/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchUser = async (method, headers, body) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method,
    url: `http://localhost:8080/api/v1/user/update/`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};
