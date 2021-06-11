import axios from 'axios'
import React, { useState } from 'react'
import env from "../config/env"
import '../styles/search.css'

export const Search = (props: any) => {
  const [keyword, setKeyword] = useState("")
  const handleChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
  }
  const searchWithKeyword = async (keyword: string) => {
    try {
      const response = await axios.get(env.BACKEND_BASEURL+"/api/feed/searchFeed?search="+keyword)
      const data = response?.data?.hits
      const total = response?.data?.total
      return {data,total}
    } catch (err) {
      console.log(err)
      alert("error on searching!")
      return null
    }
  }
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    
    const data = await searchWithKeyword(keyword);
    if (data) {
      props.onSearchResponse(data)
    }
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
