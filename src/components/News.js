import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResult] = useState(0);

  const capitalLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    props.setProgress(50);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResult(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }
  useEffect(() => {
    document.title = `${capitalLetter(props.category)} - Latest News Updates `
    updateNews()
    // eslint-disable-next-line
  }, [])
  // const  handleNext = async () => {
  // setPage(page + 1)
  // updateNews()
  //   }

  // const  handlePrew = async () => {
  //   setPage(page - 1)
  //   updateNews()
  // }

  const fetchMoreData = async () => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
    setPage(page + 1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat(parsedData.articles));
    setTotalResult(parsedData.totalResults);
  };
  return (
    <>
      <h2 className='text-center head'>India's Top Headlines - Latest News Updates From {capitalLetter(props.category)}</h2>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >

        <div className="container">
          <div className="row" >
            {!loading && articles.map((element, index) => {
              return <div className="col-md-4" key={element.url + index}>
                <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
        </div>

      </InfiniteScroll>
      {/* previous or next button */}
      {/* <div className="container d-flex justify-content-between my-6">
        <button disabled = {state.page<=1} type="button" className="btn btn-outline-dark" onClick={handlePrew}> &larr; Previous</button>
        <button disabled = {state.page + 1 > Math.ceil(state.totalResults/props.pageSize) }  type="button" className="btn btn-outline-dark" onClick={handleNext}>Next &rarr; </button>
        </div> */}
    </>
  )
}
News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  apiKey: PropTypes.string.isRequired,
  setProgress: PropTypes.func.isRequired,
}

export default News
