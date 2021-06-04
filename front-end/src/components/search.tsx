import React, { useState } from 'react'
import '../styles/search.css'

export const Search = (props: any) => {
  const [keyword, setKeyword] = useState("")
  const handleChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = [
      {
        "title":"dasdnoajdoa",
        "content":"dasdsadsa"
      }
    ]
    console.log(props)
    props.onSearchResponse(data)
  }
  return (
    <div className="search-wrapper">
      <form onSubmit={handleSubmit}>
        <input type="text" value={keyword} onChange={handleChange}/>
        <button type="submit">search</button>
      </form>
    </div>
  )
}
