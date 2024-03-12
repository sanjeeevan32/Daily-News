import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResult: 0,

    }
    document.title = ` ${this.capitalizeFirstLetter(this.props.category)} - DailyNews`;



  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7256e4cb98754e43990b1ffc568d57a3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    this.setState({
      articles: parsedData.articles,
      totalResult: parsedData.totalResult,
      loading: false
    })
    this.props.setProgress(100);
    
  }
 

  async componentDidMount() {
    this.updateNews();
  }
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();


  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7256e4cb98754e43990b1ffc568d57a3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResult: parsedData.totalResult,
    })




  };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>Daily News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
         {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResult}
          loader={<Spinner />}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((Element) => {
              return <div className="col-md-4" key={Element.url}>
                <Newsitem title={Element.title ? Element.title : ""} description={Element.description ? Element.description : ""} imageUrl={Element.urlToImage} newsUrl={Element.url} author={Element.author} date={Element.publishedAt} source={Element.source.name} />
              </div>
            }
            )
            }

          </div>
          </div>
        </InfiniteScroll>

      </>



    )
  }
}

export default News
