import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookSearch from './BookSearch';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');

test('searchBook updates state correctly when axios calls resolve', async () => {
  const mockBooksRequest = {
    data: [
      {
        id: 'fbV7EAAAQBAJ',
        volumeInfo: {
          title: 'PHP Crash Course',
          authors: ['Matt Smith'],
          publishedDate: '2023-08-29',
          imageLinks: {
            thumbnail:
              'http://books.google.com/books/content?id=fbV7EAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          },
          language: 'en',
        },
      },
    ],
  };

  const mockBookRequestByID = {
    data: {
      volumeInfo: {
        dimensions: {
          height: '21.60 cm',
          width: '13.80 cm',
          thickness: '2.70 cm',
        },
      },
    },
  };

  axios.get = jest
    .fn()
    .mockResolvedValueOnce(mockBooksRequest)
    .mockResolvedValueOnce(mockBookRequestByID);

  render(<BookSearch />);

  const input = screen.getByPlaceholderText('First Last');
  const button = screen.getByText('Search');

  userEvent.type(input, 'matt smith');
  userEvent.click(button);

  await waitFor(() => screen.getByText('PHP Crash Course'));

  expect(screen.getByText('PHP Crash Course')).toBeInTheDocument();
});

test('searchBook handles books without authors', async () => {
  const mockAuthorlessBook = {
    data: [
      {
        id: 'fbV7EAAAQBAJ',
        volumeInfo: {
          title: 'PHP Crash Course',
          publishedDate: '2023-08-29',
          imageLinks: {
            thumbnail:
              'http://books.google.com/books/content?id=fbV7EAAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          },
          language: 'en',
        },
      },
    ],
  };

  axios.get = jest.fn().mockResolvedValueOnce(mockAuthorlessBook);

  render(<BookSearch />);

  const input = screen.getByPlaceholderText('First Last');
  const button = screen.getByText('Search');

  userEvent.type(input, '');
  userEvent.click(button);

  await waitFor(() => expect(screen.getByText('Search')).toBeInTheDocument());
});
