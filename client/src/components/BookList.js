import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [state, setState] = useState({ selected: null });
  return !loading ? (
    <div>
      <ul id="book-list">
        {data &&
          data.books.map((book) => (
            <li key={book.id} onClick={(e) => setState({ selected: book.id })}>
              {book.name}
            </li>
          ))}
      </ul>
      <BookDetails bookId={state.selected} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default BookList;
