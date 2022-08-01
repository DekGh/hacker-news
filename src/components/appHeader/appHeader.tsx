import "./appHeader.scss"
import {useAppDispatch} from "../../hooks/hooks";
import {getNews} from "../../store/newsSlice";

const AppHeader = () => {
    const dispatch = useAppDispatch()


    return (
        <div className="header">
            Hacker News
            <button className="header__button" onClick={() => dispatch(getNews())}>update news</button>
        </div>
    )
}

export default AppHeader