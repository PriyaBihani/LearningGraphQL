import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, { updateD }] = useMutation(addBookMutation);
  const [state, setState] = useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const displayAuthors = () => {
    return (
      !loading &&
      data &&
      data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))
    );
  };
  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    addBook({
      variables: { ...state },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };

  return (
    <div>
      <form id="add-book" onSubmit={handleSubmit}>
        <div className="field">
          <label>Book name:</label>
          <input type="text" id="name" onChange={handleChange} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input type="text" id="genre" onChange={handleChange} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select id="authorId" onChange={handleChange}>
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default AddBook;
