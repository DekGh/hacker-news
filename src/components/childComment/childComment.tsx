import "../singleNewsPage/singleNewsPage.scss"
import {dateServices} from "../../services/dateServices";
import {IComment} from "../../models/INews";

type Props = {
    childComment: IComment;
}

const ChildComment = ({childComment}: Props) => {
    return (
        <li
        className="single-news__comment__item">
            <p>{childComment.by} {dateServices(childComment.time)}</p>
            <p>{childComment.text}</p>
        </li>
    )
}

export default ChildComment