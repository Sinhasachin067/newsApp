import React, { useEffect, useRef, useState } from "react";
import "./Stories.css";

export const Stories = () => {
  const [newList, setNewList] = useState([]);
  const [query, setQuery] = useState("cricket");
  const queryInputRef = useRef(null);
  const apikey = `https://newsapi.org/v2/everything?q=${query}&from=2023-08-25&sortBy=publishedAt&apiKey=c24b6db74a2945fc824cdc41c221a851`;
  //   const API = `https://hn.algolia.com/api/v1/search?query=${query}`;

  const fetchApidata = async (url) => {
    try {
      const response = await fetch(url);
      const jsondata = await response.json();
      setNewList(jsondata.articles);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApidata(apikey);
  }, [query]);

  function handleSubmit(event) {
    event.preventDefault();
    const queryValue = queryInputRef.current.value;
    setQuery(queryValue);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="inputDes"
          placeholder="Search News"
          type="text"
          ref={queryInputRef}
        />
        <input
          className="inputSubmit"
          type="submit"
          value="Submit"
          onClick={handleSubmit}
        />
      </form>
      <br />
      <div className="newsTitle">
        {newList.map((news) => {
          return (
            <>
              <div id="title">
                <div className="upper">
                  <img src={news.urlToImage} alt="Loading-img..." />

                  <div className="desc">
                    <p>{news.title}</p>
                  </div>
                </div>

                <button className="btn">
                  <a href={news.url}>Read-More</a>
                </button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};
