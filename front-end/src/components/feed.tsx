import { useHistory } from "react-router-dom"
import "../styles/feed.css"

const Feed = (props: any) => {
    const history = useHistory()
    const moveToModify = () => {
        const id = props?.feedData?._id
        history.push(`/modifyFeed/${id}`)
    }
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
                <>
                    {
                        props.isLogined? 
                            <div className="modify-or-delete">
                                <button onClick={moveToModify}>수정/삭제</button>
                            </div>
                        : <></>
                    }
                </> 
            </div>
        </>
    )
}

export default Feed