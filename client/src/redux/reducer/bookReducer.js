const initialState = {
  books: [],
  loading: false,
  error: null
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_BOOKS_REQUEST":
      return { ...state, loading: true };

    case "GET_BOOKS_SUCCESS":
      return {
        ...state,
        loading: false,
        books: action.payload
      };

    case "GET_BOOKS_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case "ADD_BOOK_SUCCESS":
      return {
        ...state,
        books: [...state.books, action.payload]
      };

    case "UPDATE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        )
      };

    case "DELETE_BOOK_SUCCESS":
      return {
        ...state,
        books: state.books.filter(
          (book) => book._id !== action.payload
        )
      };

    default:
      return state;
  }
};