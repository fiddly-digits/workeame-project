import axios from 'axios';

const handleToken = () => {
  const token = sessionStorage.getItem('token');
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

export const fetchUser = async (headers, params) => {
  const plainPayload = params || handleToken();
  const options = {
    method: 'GET',
    url: `http://localhost:8080/api/v1/user/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchUser = async (method, headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
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

export const fetchMS = async (headers, params) => {
  const plainPayload = params || handleToken();
  const options = {
    method: 'GET',
    url: `http://localhost:8080/api/v1/ms/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchMS = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
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
  const options = {
    method,
    url: `http://localhost:8080/api/v1/service/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchService = async (serviceID, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
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
  const options = {
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
  const options = {
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
  const options = {
    method,
    url: `http://localhost:8080/api/v1/schedule/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchSchedule = async (scheduleID, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
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

export const createBooking = async (body, serviceID) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'POST',
    url: `http://localhost:8080/api/v1/booking/create/${serviceID}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const fetchBookings = async (queryParam) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'GET',
    url: `http://localhost:8080/api/v1/booking/?type=${queryParam}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const updateBookingStatus = async (bookingID, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `http://localhost:8080/api/v1/booking/statusUpdate/${bookingID}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const fetchWorkersData = async (query) => {
  const options = {
    method: 'GET',
    url: query
      ? 'http://localhost:8080/api/v1/ms/'
      : 'http://localhost:8080/api/v1/ms'
  };
  let data = await axios.request(options);
  return data.data.data;
};
