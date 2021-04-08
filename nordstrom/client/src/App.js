import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";
import chalk from "chalk";

let products = null;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      top: 3,
      keyword: "black shirt",
    };
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchProducts(this.state.top, this.state.keyword);
  }

  async fetchProducts(top, keyword) {
    const response = await fetch(
      `http://localhost:5000/nordstrom?top=${top}&keyword=${keyword}`
    );
    const json = await response.json();
    console.log(json);
    this.setState({ json });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fetchProducts(this.state.top, this.state.keyword);
  }

  handleAmountChange(event) {
    this.setState({ top: event.target.value });
  }

  handleKeywordChange(event) {
    this.setState({ keyword: event.target.value });
  }

  render() {
    if (this.state.json.Products) {
      products = this.state.json.Products.map((product) => {
        // console.log("media path = " + product.Media[0].Path);
        let imageUrl = `https://n.nordstrommedia.com/ImageGallery/store/product/Zoom${product.Media[0].Path}`;

        return (
          <div key={product.SkuId}>
            <div>{product.Name}</div>
            <img width="300" src={imageUrl}></img>
          </div>
        );
      });
    }
    return (
      <div className="App">
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Top Results Amount</label>
            <input
              type="number"
              value={this.state.top}
              onChange={this.handleAmountChange}
            />
            <input
              type="text"
              value={this.state.keyword}
              onChange={this.handleKeywordChange}
            />
            <input type="submit" value="submit" />
          </form>
        </div>
        {products}
      </div>
    );
  }
}
