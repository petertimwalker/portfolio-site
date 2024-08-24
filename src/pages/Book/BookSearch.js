import React from 'react';
import BookSearchForm from './BookSearchForm';
import BookList from './BookList';
import axios from 'axios';
import noImg from '../../assets/images/no_img_available.png';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http:// localhost:3001'
    : 'https:// api.peterwalker.xyz';

class BookSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: '',
      authors: [],
      height: 99,
      hasSpinner: false,
      hasNoResults: false,
      hasError: false,
    };
  }

  searchBook = (event) => {
    event.preventDefault();
    let req = `${baseUrl}/api/books?author=${this.state.searchField}`;
    this.setState({ books: [], hasSpinner: true, hasNoResults: false });
    axios
      .get(req)
      .then((data) => {
        if (data.data.totalItems !== 0) {
          //fill in missing attributes
          const cleanData = this.cleanData(data.data);
          //filter books for specific author
          //const filterAuthor = this.filterAuthor(cleanData);
          //only english
          const filterLanguage = this.filterLanguage(cleanData);
          //filter books thst havent been published yet
          const filterPublishedDate = this.filterPublishedDate(filterLanguage);
          //remove duplicates
          const removeDuplicates = this.removeDuplicates(filterPublishedDate);
          // formatAuthors
          const formatAuthors = this.formatAuthors(removeDuplicates);

          Promise.all(this.addHeight(formatAuthors))
            .then((data) => {
              const filterHeight = this.filterHeight(data);

              if (filterHeight.length === 0) {
                this.setState({ hasNoResults: true });
              }

              this.setState({ hasSpinner: false });

              this.setState({ books: filterHeight });
            })
            .catch((error) => {
              console.error('caught in add hieght promise', error);
              this.setState({ hasError: true, hasSpinner: false });
            });
        } else {
          this.setState({ hasNoResults: true, hasSpinner: false });
        }
      })
      .catch((error) => {
        console.error('caught in axios call', error);

        this.setState({ hasError: true, hasSpinner: false });
      });
  };

  filterPublishedDate = (data) => {
    const filterPublishedDate = data.filter((book) => {
      var available = false;
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      today = yyyy + '-' + mm + '-' + dd;

      //this compares todays date to the books date
      if (
        book.volumeInfo.publishedDate.substring(0, 4) === today.substring(0, 4)
      ) {
        if (book.volumeInfo.publishedDate.length === 4) {
          available = true;
        } else if (
          book.volumeInfo.publishedDate.substring(5, 7) ===
          today.substring(5, 7)
        ) {
          available =
            parseInt(today.substring(8, 10)) -
            parseInt(book.volumeInfo.publishedDate.substring(8, 10));
        } else {
          available =
            parseInt(today.substring(5, 7)) -
            parseInt(book.volumeInfo.publishedDate.substring(5, 7));
        }
      } else {
        available =
          parseInt(today.substring(0, 4)) -
          parseInt(book.volumeInfo.publishedDate.substring(0, 4));
      }
      return available > 0;
    });

    return filterPublishedDate;
  };

  removeDuplicates = (data) => {
    let removeDuplicates = [];
    let bookTitles = [];

    //for each book
    for (var bookIndexFirst in data) {
      let book = data[bookIndexFirst];
      //if bookTitles includes this title then we know the shortest book is already pushed to removeDuplicates
      if (!bookTitles.includes(book.volumeInfo.title)) {
        //push shortest book of same title
        for (var bookIndexSecond in data) {
          if (
            book.volumeInfo.title === data[bookIndexSecond].volumeInfo.title &&
            data[bookIndexSecond].height < book.height
          ) {
            book = data[bookIndexSecond];
          }
        }
        bookTitles.push(book.volumeInfo.title);
        removeDuplicates.push(book);
      }
    }

    return removeDuplicates;
  };

  addHeight = (data) => {
    const addHeight = data.map(async (book) => {
      return axios
        .get('https://api.peterwalker.xyz/api/books/book?bookId=' + book.id)
        .then((data) => {
          if (data.data.volumeInfo?.dimensions?.height) {
            book['height'] = (
              data.data.volumeInfo.dimensions.height.split(' ')[0] / 2.54
            ).toFixed(2); //convert cm to in
          } else {
            book['height'] = '999';
          }
          return book;
        })
        .catch((error) => {
          console.error('caught in add height axios', error);
          this.setState({ hasError: true, hasSpinner: false });
        });
    });
    return addHeight;
  };

  cleanData = (data) => {
    const cleanedData = data.map((book) => {
      if (book.volumeInfo.hasOwnProperty('publishedDate') === false) {
        book.volumeInfo['publishedDate'] = '0000';
      } else if (book.volumeInfo.hasOwnProperty('imageLinks') === false) {
        book.volumeInfo['imageLinks'] = { thumbnail: noImg };
      }
      return book;
    });
    return cleanedData;
  };

  filterAuthor = (data) => {
    const filterAuthor = data.filter((book) => {
      if (book.volumeInfo.hasOwnProperty('authors') === false) {
        return false;
      }
      if (book.volumeInfo.authors.length > 4) {
        return false;
      }
      for (var index in book.volumeInfo.authors) {
        if (
          book.volumeInfo.authors[index].toLowerCase() ===
          this.state.searchField.toLowerCase()
        ) {
          return true;
        }
      }
      return false;
    });
    return filterAuthor;
  };

  filterLanguage = (data) => {
    const filterLanguage = data.filter((book) => {
      return book.volumeInfo.language === 'en';
    });
    return filterLanguage;
  };

  //takes an array of books and filters out books with height greater than state.height
  filterHeight = (data) => {
    const filterHeight = data.filter((book) => {
      return parseInt(book.height, 10) < this.state.height;
    });
    return filterHeight;
  };

  formatAuthors = (data) => {
    const formatAuthors = data.map((book) => {
      let authors = book.volumeInfo.authors.reduce((total, str) => {
        return total + str + ', ';
      }, '');

      book.volumeInfo.authors = authors;
      return book;
    });

    return formatAuthors;
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleHeight = (event) => {
    this.setState({ height: event.target.value });
  };

  handleRemove = () => {
    this.forceUpdate();
  };

  handleClickSearch = () => {};

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Error, check console
          </div>
        </div>
      );
    }

    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BookSearchForm
            handleClickSearch={this.handleClickSearch}
            searchBook={this.searchBook}
            handleSearch={this.handleSearch}
            handleHeight={this.handleHeight}
          ></BookSearchForm>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <BookList
            hasSpinner={this.state.hasSpinner}
            hasNoResults={this.state.hasNoResults}
            handleRemove={this.handleRemove}
            books={this.state.books}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;
