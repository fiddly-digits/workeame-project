import axios from 'axios';

const handleToken = () => {
  const token = sessionStorage.getItem('token');
  const payload = token.split('.')[1];
  return JSON.parse(atob(payload));
};

const { VITE_API_URL } = process.env;

export const fetchUser = async (headers, params) => {
  const plainPayload = params || handleToken();
  const options = {
    method: 'GET',
    url: `${VITE_API_URL}user/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const completeUser = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}user/complete/`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const patchUser = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}user/update/`,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const patchUserToWorker = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}user/workerUpdate/`,
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
    url: `${VITE_API_URL}ms/${plainPayload.micrositeURL}`,
    headers
  };

  console.log(options.url);
  let data = await axios.request(options);
  return data.data.data;
};

export const patchMS = async (headers, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}ms/update/`,
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
    url: `${VITE_API_URL}service/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchService = async (serviceID, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}service/update/${serviceID}`,
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
    url: `${VITE_API_URL}service/create`,
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
    url: `${VITE_API_URL}service/delete/${serviceID}`,
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
    url: `${VITE_API_URL}schedule/${plainPayload.id}`,
    headers
  };
  let data = await axios.request(options);
  return data.data.data;
};

export const patchSchedule = async (scheduleID, body) => {
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}schedule/update/${scheduleID}`,
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
    url: `${VITE_API_URL}booking/create/${serviceID}`,
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
    url: `${VITE_API_URL}booking/?type=${queryParam}`,
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
    url: `${VITE_API_URL}booking/statusUpdate/${bookingID}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const fetchWorkersData = async (filters) => {
  if (filters) {
    const { category, state } = filters;
    let query = '';
    if (category && state) {
      query = `?category=${category}&state=${state}`;
    } else if (category) {
      query = `?category=${category}`;
    } else if (state) {
      query = `?state=${state}`;
    }
    const options = {
      method: 'GET',
      url: `${VITE_API_URL}ms/${query}`
    };
    let data = await axios.request(options);
    return data.data.data;
  } else {
    const options = {
      method: 'GET',
      url: `${VITE_API_URL}ms/`
    };
    let data = await axios.request(options);
    return data.data.data;
  }
};

export const passwordResetRequest = async (body) => {
  const options = {
    method: 'POST',
    url: `${VITE_API_URL}auth/forgotten-password`,
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const passwordReset = async (body, params) => {
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}auth/reset-password/${params}`,
    data: body
  };
  let data = await axios.request(options);
  return data;
};

export const bookingPaymentUpdate = async (params, body) => {
  console.log('params', params);
  const token = sessionStorage.getItem('token');
  const options = {
    method: 'PATCH',
    url: `${VITE_API_URL}booking/paymentUpdate/${params}`,
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: body
  };
  let data = await axios.request(options);
  return data;
};
