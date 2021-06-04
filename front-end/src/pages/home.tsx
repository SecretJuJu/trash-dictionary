import { ToLogin } from '../components/toLogin'
import { Search } from '../components/search'
import { FeedList } from '../components/feedList'

import '../styles/home.css'

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