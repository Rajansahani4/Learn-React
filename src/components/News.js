import React, { Component } from "react";
import NewsItem from "./NewsItems";
import Button from "./Button";
import Spinner from "./Spinner";



export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      pageSize: 5,
      loading: false,
    };
  }

  /**
   * Getting data from API
   */
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=47d573b392ed4d5a894c74798d717397&page=${this.state.page- 1}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    
    this.setState({ articles: parsedData.articles ,totalResults: parsedData.totalResults , loading: false});
  }

/**
 * Handle previous button click
 */ 
  handlePrevious = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=47d573b392ed4d5a894c74798d717397&page=${this.state.page- 1}&pageSize=${this.state.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    });
  };

  /**
   * Handle next button click
   */
  handleNext = async () => {
    
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)) {
      console.log("No more pages");
      return;
    }else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=47d573b392ed4d5a894c74798d717397&page=${this.state.page+1}&pageSize=${this.state.pageSize}`;
      this.setState({ loading: true });
   
      let data = await fetch(url);
      let parsedData = await data.json();
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      });
    }
  };

  render() {

    const isPreviousDisabled = this.state.page <= 1;
    const isNextDisabled = this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize);

    return (
      <div>
        {/* Spinner component */}

        {this.state.loading && <Spinner></Spinner>}

        <div className="container my-3">
          <h2 className="text-center">NewsMonkey - Top Headlines</h2>
          <div className="row">
            {!this.state.loading &&  this.state.articles.map((element) => {
              return (
                <div className="col-md-4 py-3" key={element.url}>
                  <NewsItem
                    title={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>

          <div className="container d-flex justify-content-between">
            {/* Component of button */}
            <Button isDisabled={isPreviousDisabled} disabled={this.state.page >=1} label="Previous" onClick={this.handlePrevious} className="dark"/>
            <Button isDisabled={isNextDisabled}  label="Next" onClick={this.handleNext} className="dark"/>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
