import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import env from "../config/env"
import '../styles/search.css'
import {useLocation} from "react-router-dom";

export const Search = (props: any) => {
  const [keyword, setKeyword] = useState("")
  const history = useHistory()
  const search = useLocation().search;
  const handleChange = (event: any) => {
    const { value } = event.target;
    setKeyword(value);
    history.push({
      search: `?search=${value}`
    })
    // TODO change params
  }

  useEffect(()=>{

    const tmp = new URLSearchParams(search).get('search')
    const initKeyword: string = (typeof tmp === "string")? tmp: "" 
    setKeyword(initKeyword)
    
    const fetchData = async () => {
      const data: any = await searchWithKeyword(initKeyword)
      if (data) {
        props.onSearchResponse(data)
      }
    }
    fetchData()
  },[])

  const searchWithKeyword = async (keyword: string) => {
    if (!keyword) {
      return null
    }
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
