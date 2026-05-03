import axios from "axios";

// GET
export const getBooks = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_BOOKS_REQUEST" });

    const res = await axios.get("http://localhost:5000/books");

    dispatch({
      type: "GET_BOOKS_SUCCESS",
      payload: res.data.data
    });

  } catch (error) {
    dispatch({
      type: "GET_BOOKS_FAIL",
      payload: error.message
    });
  }
};


// ADD
export const addBook = (bookData) => async (dispatch) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/books/add",
      bookData
    );

    dispatch({
      type: "ADD_BOOK_SUCCESS",
      payload: res.data.data
    });

  } catch (error) {
    console.log(error);
  }
};


// UPDATE
export const updateBook = (id, updatedData) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/books/update/${id}`,
      updatedData
    );

    dispatch({
      type: "UPDATE_BOOK_SUCCESS",
      payload: res.data.data
    });

  } catch (error) {
    console.log(error);
  }
};


// DELETE
export const deleteBook = (id) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/books/delete/${id}`
    );

    dispatch({
      type: "DELETE_BOOK_SUCCESS",
      payload: id
    });

  } catch (error) {
    console.log(error);
  }
};