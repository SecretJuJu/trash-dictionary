import { useHistory} from "react-router-dom";
import '../styles/feedList.css'

const NewFeedBtn = () => {

    const history = useHistory()
    const moveToNewFeed = () => {
        history.push("/newFeed")
    }
    return (
        <div className="newFeed">
            <button className="newFeed-button"onClick={moveToNewFeed}>
                NEW FEED
            </button>
        </div>
    )
}

export default NewFeedBtn