import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`);
    return response.data.data; // Access the notes property
  } catch (error) {
    console.error('Error fetching notes:', error);
    return []; // Return an empty array to avoid errors
  }
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

export const updateNoteStrikeThrough = async (id, strikethrough) => {
  const response = await axios.put(`${API_BASE_URL}/note/${id}`, { strikethrough });
  return response.data;
};