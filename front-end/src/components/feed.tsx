import { useEffect } from "react"
import "../styles/feed.css"

const Feed = (props: any) => {
    
    return (
        <>
            <div className="feed-container">
                <div className="feed-top">
                    <h1>
                        {
                            (props?.feedData?.title)?
                                props.feedData.title
                            :
                                "loading..."
                        }
                    </h1>
                </div>
                <div className="feed-content" dangerouslySetInnerHTML={
                        {__html: (props?.feedData?.content)? props.feedData.content: "loading..."}
                    }>
                </div>
            </div>
        </>
    )
}

export default Feed