import axios from 'axios';

const API_BASE_URL = 'https://gmwrezbzf9.execute-api.us-east-1.amazonaws.com/dev'; // API endpoint

export const getNotes = async () => {
  const response = await axios.get(`${API_BASE_URL}/notes`);
  return response.data;
};

export const getNote = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/note/${id}`);
  return response.data;
};

export const createNote = async (note) => {
  const response = await axios.post(`${API_BASE_URL}/note`, note);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await axios.put(`${API_BASE_URL}/note/${id}`, note);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/note/${id}`);
  return response.data;
};
