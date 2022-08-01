import {useAppSelector, useAppDispatch} from "../../hooks/hooks";
import {useEffect} from "react";
import {getNews} from "../../store/newsSlice";
import {INews} from "../../models/INews";
import {Link} from "react-router-dom";
import {dateServices} from "../../services/dateServices";
import "./mainPage.scss"
import Spinner from "../spinner/spinner";

const MainPage = () => {

    const dispatch = useAppDispatch()
    const {news, isLoading, error} = useAppSelector(state => state.news)

    useEffect(() => {
        dispatch(getNews())
        const interval = setInterval(() => {
            dispatch(getNews())
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="news__list">
            {isLoading && <Spinner/>}
            {error && <h1>{error}</h1>}
            <ul className="news__grid">
                {news.map((news: INews) => (
                    <li
                    className="news__item"
                    key={news.id}>
                        <Link to={`/${news.id}`}>
                            <p>{news.title}</p>
                            <p>{news.score} point by {news.by}</p>
                            <p>{dateServices(news.time)}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default MainPage