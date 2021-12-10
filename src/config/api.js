import axios from "axios";

export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;


export class UserService  {

  baseUrl = "https://metainvest.et.r.appspot.com/user/"

  getAll(){
    return axios.get(this.baseUrl + "getAll").then(res => res.data)
  }

  insertUser(user) {
    return axios.post(this.baseUrl + "add", user).then(res => res.data)
  }

  updateUser(user) {
    return axios.post(this.baseUrl + "update", user).then(res => res.data)
  }

  delete(user) {
    return axios.post(this.baseUrl + "remove", user).then(res => res.data)
    .catch(error => console.log(error.response));
  }

  getUserByMailAndPassword(user) {
    return axios.post(this.baseUrl + "getUserByMailAndPass", user).then(res => res.data)
  }

  getById(user) {
    return axios.post(this.baseUrl + "getById", user).then(res => res.data)
  }

}