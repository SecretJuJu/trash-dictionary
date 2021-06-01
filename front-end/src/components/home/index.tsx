import { ToLogin } from './toLogin'
import { Search } from './search'
import { FeedList } from './feedList'
import React from 'react'

import './home.css'


export const Home = () => {
  return (
    <>
      <div className="home">
          <Search />
          <FeedList />
          <ToLogin />
      </div>
    </>
  )
}