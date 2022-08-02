import "./singleNewsPage.scss"
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {INews} from "../../models/INews";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {clearComments, getComments} from "../../store/commentSlice";
import Comments from "../comments/comments";
import {dateServices} from "../../services/dateServices";
import Spinner from "../spinner/spinner";

const SingleNewsPage = () => {

    const {newsId} = useParams()

    const dispatch = useAppDispatch()
    const {news} = useAppSelector(state => state.news)

    const {comments, isLoading, error} = useAppSelector(state => state.comments)

    const singleNews: INews = news.find((news: INews) => news.id === Number(newsId))!

    const commentsCount = "kids" in singleNews ? singleNews.kids.length : 0

    const updateComments = () => {
        dispatch(clearComments())
        if (singleNews.kids) {
            singleNews.kids.map(id => dispatch(getComments(id)))
        }
    }

    useEffect(() => {
        updateComments()
        const interval = setInterval(() => {
            dispatch(clearComments())
            updateComments()
        }, 60000)
        return () => {
            dispatch(clearComments())
            clearInterval(interval)
        }
    }, [])

    return (
        <div className="single-news__info">
            <a href={singleNews.url} target="_blank">{singleNews.title}</a>
            <p>{singleNews.score} point by {singleNews.by}</p>
            <p>{dateServices(singleNews.time)}</p>
            <p>Count comments {commentsCount}</p>
            <button className="single-news__back__button">
                <Link to="/">back to news</Link>
            </button>
            <button onClick={() => updateComments()} className="single-news__update__button">
                update comments
            </button>
            <div className="single-news__comments">
                {isLoading && <Spinner/>}
                {error && <h1>{error}</h1>}
                <ul className="single-news__comments__grid">
                    {comments.map(comment => (
                        <Comments key={comment.id} comment={comment}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default SingleNewsPage