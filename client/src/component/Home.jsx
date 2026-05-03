import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBook,
  deleteBook,
  updateBook,
  getBooks
} from "../redux/actions/bookActions";

const Home = () => {
  const dispatch = useDispatch();
  const { books, loading, error } = useSelector((state) => state);

  const [formData, setFormData] = useState({
    _id: null,
    bookName: "",
    bookTitle: "",
    author: "",
    sellingPrice: "",
  });

  const [editMode, setEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  // ✅ Validation Function
  const validate = () => {
    let newErrors = {};

    if (!formData.bookName.trim()) {
      newErrors.bookName = "Book name is required";
    }

    if (!formData.bookTitle.trim()) {
      newErrors.bookTitle = "Book title is required";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author name is required";
    }

    if (!formData.sellingPrice) {
      newErrors.sellingPrice = "Price is required";
    } else if (formData.sellingPrice <= 0) {
      newErrors.sellingPrice = "Price must be greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // ✅ remove error while typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    if (editMode) {
      dispatch(updateBook(formData._id, formData));
      setEditMode(false);
    } else {
      dispatch(addBook(formData));
    }

    setFormData({
      _id: null,
      bookName: "",
      bookTitle: "",
      author: "",
      sellingPrice: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteBook(id));
    }
  };

  const handleEdit = (book) => {
    setFormData(book);
    setEditMode(true);
  };

  return (
    <div className="p-6">
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">

        <input
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          className="border p-2 w-full"
        />
        {errors.bookName && <p className="text-red-500">{errors.bookName}</p>}

        <input
          name="bookTitle"
          value={formData.bookTitle}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 w-full"
        />
        {errors.bookTitle && <p className="text-red-500">{errors.bookTitle}</p>}

        <input
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 w-full"
        />
        {errors.author && <p className="text-red-500">{errors.author}</p>}

        <input
          name="sellingPrice"
          value={formData.sellingPrice}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 w-full"
        />
        {errors.sellingPrice && (
          <p className="text-red-500">{errors.sellingPrice}</p>
        )}

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          {editMode ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Error from API */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Table */}
      {loading ? (
        <p className="text-center mt-4">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-center mt-4">No books found</p>
      ) : (
        <table className="mt-6 w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book._id} className="text-center border-t">
                <td>{book.bookName}</td>
                <td>{book.bookTitle}</td>
                <td>{book.author}</td>
                <td>₹{book.sellingPrice}</td>

                <td>
                  <button
                    onClick={() => handleEdit(book)}
                    className="bg-yellow-400 px-2 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-500 text-white px-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;