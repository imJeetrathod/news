import React, { useState, useEffect } from "react";

function Api() {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("react");

  useEffect(() => {
    fetch(`https://hn.algolia.com/api/v1/search?query=${query}&numericFilters=created_at_i>0`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setHits(data.hits))
      .catch((error) => console.error("Error fetching data:", error));
  }, [query]);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Tech News</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search news..."
        style={styles.searchInput}
      />
      <ul style={styles.newsList}>
        {hits.map((hit) => (
          <li key={hit.objectID} style={styles.newsItem}>
            <h2 style={styles.newsTitle}>{hit.title}</h2>
            <p  style={styles.author}>Posted by <b>{hit.author}</b></p>
            <p>{hit.text}</p>
            <a href={hit.url} target="_blank" rel="noopener noreferrer" style={styles.readMoreLink}>Continue reading</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {

  author: {
    color:  "#8b8b8b",
  },
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "20px",
    textAlign: "center",
  },
  searchInput: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    marginBottom: "20px",
  },
  newsList: {
    listStyle: 'none',
    padding: 0,
  },
  newsItem: {
    border: "1px solid #ccc",
    margin: "10px",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  newsTitle: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  readMoreLink: {
    display: "block",
    color: "#007BFF",
    textDecoration: "none",
    marginTop: "10px",
  },
};

export default Api;
