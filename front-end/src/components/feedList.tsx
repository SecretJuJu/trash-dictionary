import { useHistory } from 'react-router-dom'
import '../styles/feedList.css'
import {ISource} from '../pages/home'

export const FeedList = (props: any) => {
    const history = useHistory()
    console.log("props feed list")
    console.log(props.feeds)
    const feeds: Array<ISource> = props.feeds
    console.log((feeds!==[] && !!feeds))
    const moveToFeed = (e: any) => {
        const feedId = e.currentTarget.id
        history.push(`/feed/${feedId}`)
    }
    const toggleBackground = (e: any,status: boolean) => {
        const nodes = e.currentTarget.childNodes
        let changeTo = "none"
        if (status) {
            changeTo = "underline"
        }
        nodes.forEach( (element:any) =>{
            element.style.textDecoration = changeTo
        })
    }
    return (
        <>
            <div className="feed-list-wrapper">
                <ul className="feed-list">
                {
                    (feeds?.length !== 0)? <></>
                    :
                    <div className="no-search-result">
                        검색 결과가 없습니다.
                    </div>
                }
                    
                {
                    feeds.map( (item,index) => {
                        return (
                            <li className="feed" 
                                onMouseEnter={(e) => toggleBackground(e,true)}
                                onMouseLeave={(e) => toggleBackground(e,false)}
                                onClick={moveToFeed}
                                key={index}
                                id={item.id}
                            >
                                <h1 className="feed-title">
                                    {item.title}
                                </h1>
                                <p className="feed-content">
                                    {
                                        item.content.replace(/<[^>]*>?/gm, '')
                                    }
                                </p>
                            </li>
                            
                        )
                    })
                } 
                </ul>
            </div>
        </>
    )
}