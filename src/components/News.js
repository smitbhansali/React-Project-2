import React, { Component } from 'react'
import Newsitems from './Newsitems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: "in",
        pagesize: 8,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    capsfirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalres: 0
        }
        document.title = `Times of World-${this.capsfirstletter(this.props.category)}`
    }
    async updatenews() {
        this.props.setprogress(10)
        this.setState({ loading: true })
        const apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7df813485db54355bab63343469f9c02&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        this.props.setprogress(30)
        let data = await fetch(apiurl);
        this.props.setprogress(50)
        let parseddata = await data.json();
        this.props.setprogress(70)
        this.setState({
            articles: parseddata.articles,
            totalres: parseddata.totalResults,
            loading: false
        })
        this.props.setprogress(100)
    }
    async componentDidMount() {
        this.updatenews()
    }
    fetchMoreData = async() => {
        this.setState({ page: this.state.page + 1 })
        const apiurl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7df813485db54355bab63343469f9c02&page=${this.state.page}&pageSize=${this.props.pagesize}`;
        let data = await fetch(apiurl);
        let parseddata = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalres: parseddata.totalResults
        })
      };
    render() {
        return (
            <div className="container my-3">
                <h1 className={`text-center text-${this.props.mode === 'light'?'dark':'white'}`} style={{marginTop: "65px"}}>{this.capsfirstletter(this.props.category)} News</h1>
                {this.state.loading && <Spinner mode={this.props.mode}/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalres}
                    loader={<Spinner mode={this.props.mode}/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((elements) => {
                            return <div className="col-md-4" key={elements.url}>
                                <Newsitems title={elements.title ? elements.title.slice(0, 50) : ""} description={elements.description ? elements.description.slice(0, 150) : ""} imgurl={elements.urlToImage ? elements.urlToImage : "https://previews.123rf.com/images/liravega258/liravega2581802/liravega258180200024/95982540-news-update-online-news-newspaper-news-website-flat-vector-illustration-news-webpage-information-abo.jpg"} newsurl={elements.url} source={elements.source.name ? elements.source.name : "Anonymous"} author={elements.author ? elements.author : "Anonymous"} date={elements.publishedAt ? elements.publishedAt : "-"} mode={this.props.mode}/>
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
