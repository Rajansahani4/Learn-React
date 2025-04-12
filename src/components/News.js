import React, { Component } from "react";
import NewsItem from "./NewsItems";
import Button from "./Button";

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: 20,
    };
  }

  /**
   * Getting data from API
   */
  async componentDidMount() {
    let url =
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=47d573b392ed4d5a894c74798d717397";
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({ articles: parsedData.articles ,totalResults: parsedData.totalResults});
  }

/**
 * Handle previous button click
 */ 
  handlePrevious = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=47d573b392ed4d5a894c74798d717397&page=${this.state.page- 1}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    });
  };

  /**
   * Handle next button click
   */
  handleNext = async () => {
    console.log("Next");
    
    console.log(this.state.page, this.state.totalResults, this.state.pageSize);
    
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
      console.log("No more pages");
      return;
    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=47d573b392ed4d5a894c74798d717397&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      });
    }
  };

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>NewsMonkey - Top Headlines</h2>
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4 py-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>

          <div className="container d-flex justify-content-between">
            {/* Component of button */}
            <Button label="Previous" onClick={this.handlePrevious} className="dark"/>
            <Button label="Next" onClick={this.handleNext} className="dark"/>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
