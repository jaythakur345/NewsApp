import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            article: [],
            loading: false,
            page: 1
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News Monkey`
    }

    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fdeaecbce8c64110a54f4c8817cc37a5&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
    }
    async componentDidMount() {
        this.updateNews();
    }

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1, })
        this.updateNews();
    }

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1, })
        this.updateNews();
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
        }
        
    render() {
        return (
            <div className='container my-3'>
                <h2 className='text-center' style={{marginTop:"75px",marginBotton:"40px"}}>News Monkey 	
&#128053; - Top {this.capitalizeFirstLetter(this.props.category)} Hedlines</h2>
                {this.state.loading && <Spinner />}
                <div className='row my-3'>
                    {!this.state.loading && this.state.article.map((elements) => {
                        return <div className='col-md-4 my-3' key={elements.url}>
                            <NewsItem title={elements.title ? elements.title : ""} des={elements.description ? elements.description : ""} ImageUrl={elements.urlToImage} NewsUrl={elements.url} author={elements.author} date={elements.publishedAt} />
                        </div>
                    })}
                </div>
                <div className='container my-3 d-flex justify-content-between'>
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePrevClick}>&laquo; Previous</button>
                    <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &raquo;</button>
                </div>
            </div>
        )
    }
}
