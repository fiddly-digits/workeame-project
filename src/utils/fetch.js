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

export const fetchMS = async (method, headers) => {
  const plainPayload = handleToken();
  var options = {
    method,
    url: `http://localhost:8080/api/v1/ms/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchMS = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method: 'PATCH',
    url: `http://localhost:8080/api/v1/ms/update/`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const fetchServices = async (method, headers) => {
  const plainPayload = handleToken();
  var options = {
    method,
    url: `http://localhost:8080/api/v1/service/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchService = async (serviceID, body) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method: 'PATCH',
    url: `http://localhost:8080/api/v1/service/update/${serviceID}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const createService = async (body) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method: 'POST',
    url: `http://localhost:8080/api/v1/service/create`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const deleteService = async (serviceID) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method: 'DELETE',
    url: `http://localhost:8080/api/v1/service/delete/${serviceID}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let data = await axios.request(options);
  return data;
};

export const fetchSchedule = async (method, headers) => {
  const plainPayload = handleToken();
  var options = {
    method,
    url: `http://localhost:8080/api/v1/schedule/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchSchedule = async (scheduleID, body) => {
  const token = sessionStorage.getItem('token');
  var options = {
    method: 'PATCH',
    url: `http://localhost:8080/api/v1/schedule/update/${scheduleID}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};
