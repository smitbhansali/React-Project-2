import React, { Component } from 'react'

export class Newsitems extends Component {
    render() {
        let { title, description, imgurl, newsurl, source, author, date } = this.props;
        return (
            <div className="my-3">
                <div className={`card bg-${this.props.mode} text-${this.props.mode === 'light'?'dark':'white'}`}>
                    <img src={imgurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text">
                            <small className="text-muted">Source: {source}</small><br />
                            <small className="text-muted">Author: {author}</small><br />
                            <small className="text-muted">Published At: {new Date(date).toGMTString()}</small>
                        </p>
                        <a href={newsurl} className={`btn btn-sm btn-outline-${this.props.mode === 'light'?'dark':'light'}`} target="_blank" rel="noreferrer">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitems
