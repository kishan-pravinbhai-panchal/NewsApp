import React from 'react'
import photo from './photo.jpg'
import './App.css'

const NewsItem  = (props) => {

    let { title, description, imageUrl, NewsUrl, author, date , source } = props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{left:"90%",zIndex:"1"}}>
    {source}
  </span>
          <img src={imageUrl?imageUrl:photo} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description?description:"No description available for this news article."}</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unkonwn" : author} and {new Date(date).toGMTString()}</small></p>
            <a href={NewsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-outline-dark">Read More</a>
          </div>
        </div>
      </div>
    )

}

export default NewsItem
 