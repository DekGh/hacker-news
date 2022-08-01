import "../singleNewsPage/singleNewsPage.scss"
import ChildComment from "../childComment/childComment";
import {useState} from "react";
import {dateServices} from "../../services/dateServices";
import {IComment} from "../../models/INews";

type Props = {
    comment: IComment;
}

const Comments = ({comment}: Props) => {

    const [visible, setVisible] = useState(false)

    return (
        <div onClick={() => comment?.kids && setVisible(!visible)}>
            <li
                className="single-news__comment__item"
                key={comment.id}>
                <p>{comment.by} {dateServices(comment.time)}</p>
                <p>{comment.text}</p>
                <p>Count child comments {"kids" in comment ? comment.kids.length : 0}</p>
                {visible ? comment.kids.map((childComment: any) => (
                    <ul className="single-news__comments__grid" key={childComment.id}>
                        <ChildComment  childComment={childComment}/>
                    </ul>
                )) : null}
            </li>
        </div>
    )
}

export default Comments