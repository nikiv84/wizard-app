import axios from 'axios'

class DataService {
  getGenres() {
    return axios.get('../genres.json')
  }
}

export const dataService = new DataService()
