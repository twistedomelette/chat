import axios from "axios";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Chat from './components/chat/chat';
import { IPost } from "./components/chat/common/interfaces";
import Modal from "./components/chat/modal";
import { BaseURL } from "./helpers/constants/path";
import IPostState from "./store/common/interfaces";

function App() {
    const [posts, setPosts] = useState<IPost[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const isReload = useSelector((state: IPostState) => state.posts.isReload)
    const dispatch = useDispatch()

    useEffect( () => {
        const loadData = async () => {
            const getPosts = await axios.get(`${BaseURL}/api/post`, { params: { page: page } })
            setPosts(getPosts.data)
        }
        loadData()
        setLoading(false)
        dispatch({type: "RELOAD", payload: false})
    }, [page, isReload, dispatch])

    return (
        <div className="App">
            {!loading ? <Chat
                posts={posts}
                setPage={setPage}
            /> : <h1>Loading...</h1>}
            <Modal />
        </div>
    );
}

export default App;
