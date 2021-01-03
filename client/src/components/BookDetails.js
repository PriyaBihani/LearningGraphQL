import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
  const { loading, error, data: { book } = {} } = useQuery(getBookQuery, {
    variables: { id: bookId },
  });
  console.log(book);
  const displayBookDetails = () => {
    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author && book.author.name}</p>
          <p>All books by this author:</p>
          <ul className="other-books">
            {book.author &&
              book.author.books.map((item) => (
                <li key={item.id}>{item.name}</li>
              ))}
          </ul>
        </div>
      );
    } else {
      return <div>NO Book Selected</div>;
    }
  };
  return <div id="book-details">{displayBookDetails()}</div>;
};

export default BookDetails;
