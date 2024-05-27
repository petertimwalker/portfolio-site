import axios from 'axios'

class BookApiService {
  constructor(apiKey) {
    this.apiKey = apiKey
  }

  async fetchBooksByAuthor(author) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&key=${this.apiKey}&orderBy=newest&maxResults=40`
      )
      return response.data.items
    } catch (error) {
      console.error('Error fetching books by author:', error)
      throw error
    }
  }
}
export default BookApiService
