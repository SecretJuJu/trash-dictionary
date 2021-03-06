import { useState } from 'react'
import { ToLogin } from '../components/toLogin'
import { Search } from '../components/search'
import { FeedList } from '../components/feedList'
import NewFeedBtn from '../components/newFeedBtn'
import '../styles/home.css'

export interface ISource {
  readonly timestamp: Date
  readonly content: string
  readonly id: string
  readonly title: string
}

export interface IHit {
  readonly _id: string
  readonly _score: number
  readonly _source: ISource
}

const Home = (props: any) => {
  const tmp:Array<ISource> = []
  const [feeds, setFeeds] = useState(tmp)
  
  const getSources = (hits: Array<IHit>) => {
    const sources: Array<ISource> = []
    hits.forEach( e=> sources.push(e._source))
    return sources
  }
  const handleSearchResponse = (response:any) => {
    console.log(response.data)
    const hits = response.data.hits
    const sources = getSources(hits)
    setFeeds(sources)
    console.log("feeds ------")
    console.log(sources)
  }
  return (
    <>
      <div className="home">
          <Search onSearchResponse={handleSearchResponse}/>
          <FeedList feeds={feeds} />
          {
            props.isLogined?
              
              <NewFeedBtn />
            :
            <></>
          }
          <ToLogin />
      </div>
    </>
  )
}

export default Home