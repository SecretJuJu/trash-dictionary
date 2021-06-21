import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import FeedComponent from "../components/feed"
import env from "../config/env"

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
    useEffect(() => {
        const feedId = props?.match?.params?.id
        if (!feedId) {
            alert("잘못된 URL입니다.")
            history.push("/")
            return
        }
        const fetchData = async() => {
            const feed = await getFeed(feedId)
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
            console.log(err)
            return tmp
        }
    }
    const fetchFeedData = async (id: string) => {
        console.log("fetched")
        const feed = await getFeed(id)
        setFeedData(feed)
    }

    return (
        <>
            <FeedComponent feedData={feedData} fetchFeedData={fetchFeedData}/>
        </>
    )
}

export default Feed