import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import FeedComponent from "../components/feed"
import env from "../config/env"
import C404 from "../components/404"
interface IFeed {
    _id: string
    title: string
    content: string
    writterId: string
    createdAt: Date
    updatedAt: Date
    "writter.username": string
    "writter.email": string
}

let tmp:IFeed

const Feed = (props: any) => {
    const history = useHistory()
    const [feedData,setFeedData] = useState(tmp)
    const [feedExist,setFeedExist] = useState(true)

    useEffect(() => {
        const feedId = props?.id
        console.log(`feedId : ${feedId}`)
        if (!feedId) {
            alert("잘못된 URL입니다.")
            history.push("/")
            return
        }
        const fetchData = async() => {
            const feed = await getFeed(feedId)
            if ( feed === null) {
                console.log("feed is null")
                setFeedExist(false)
                return
            }
            setFeedData(feed)
        }
        fetchData()
    },[])
    const getFeed = async (id: string) => {
        try {
            const response = await axios.get(`${env.BACKEND_BASEURL}/api/feed/browse/${id}`)
            const feed: IFeed = response.data
            return feed
        } catch (err) {
            
            if (err?.response?.data?.errorType === "notExist") { // notExist
                alert("게시물이 존재하지 않습니다.")
                return null
            }
            
            return null
        }
    }
    const fetchFeedData = async (id: string) => {
        const feed = await getFeed(id)
        if (feed === null) {
            setFeedExist(false)
            return
        }
        setFeedData(feed)
    }

    return (
        <>  
            {
                feedExist?
                <FeedComponent feedData={feedData} fetchFeedData={fetchFeedData} isLogined={props.isLogined}/>
                :
                <C404 />
            }
             
        </>
    )
}

export default Feed