import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        let { title, des, ImageUrl, NewsUrl, author, date } = this.props;
        return (
            <div className='container'>
                <div className="card" style={{ width: "18rem" }}>
                    <img src={ImageUrl ? ImageUrl : "https://cdn.cnn.com/cnnnext/dam/assets/220504154141-02-lviv-railways-power-station-super-tease.jpg"} className="card-img-top" alt="News Image" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{des}</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unkown":author} on {new Date(date).toGMTString()}</small></p>
                        <a href={NewsUrl} target="_blank" rel="noreferrer" className="btn btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
    }

}
