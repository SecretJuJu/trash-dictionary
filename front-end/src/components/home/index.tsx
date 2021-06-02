import { ToLogin } from './toLogin'
import { Search } from './search'
import { FeedList } from './feedList'
import React from 'react'

import './home.css'

export const Home = () => {
  const handleSearchResponse = (response:any) => {
    console.log(response)
  }
  return (
    <>
      <div className="home">
          <Search onSearchResponse={handleSearchResponse}/>
          <FeedList />
          <ToLogin />
      </div>
    </>
  )
}