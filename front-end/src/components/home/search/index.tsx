import React, { useState } from 'react'
import './search.css'

export const Search = (props: any) => {
  const [keyword, setKeyword] = useState("")
  const handleChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(keyword)
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
