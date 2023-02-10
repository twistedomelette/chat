import axios from "axios";
import React, { useEffect, useState } from 'react';
import Chat from './components/chat/chat';
import { IPost, IPostForSend } from "./components/chat/common/interfaces";
import Modal from "./components/chat/modal";

const URL = `http://localhost:3001`

function App() {
    const [posts, setPosts] = useState<IPost[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedPost, setSelectedPost] = useState<IPost | undefined>()
    const [newestPost, setNewestPost] = useState<IPostForSend | undefined>()
    const [isModal, setIsModal] = useState<boolean>(false)
    const [isSubmit, setIsSubmit] = useState<boolean>(false)


    useEffect( () => {
        const loadData = async () => {
            const getPosts = await axios.get(`${URL}/api/post`, { params: { page: page } })
            setPosts(getPosts.data)
        }
        loadData()
        setLoading(false)
    }, [page])

    useEffect( () => {
        if (selectedPost && isSubmit && newestPost) {
            setNewestPost({...newestPost, main_id: selectedPost.main_id, post_id: selectedPost.id})
        }
        if (newestPost?.post_id) {
            console.log(newestPost)
        }
        setIsSubmit(false)
    }, [isSubmit, newestPost, selectedPost])

    return (
        <div className="App">
            {!loading ? <Chat
                posts={posts}
                setPage={setPage}
                setSelectedPost={setSelectedPost}
                setIsModal={setIsModal}
            /> : <h1>Loading...</h1>}
            <Modal setIsModal={setIsModal} isModal={isModal} setIsSubmit={setIsSubmit} setNewestPost={setNewestPost}/>
        </div>
    );
}

export default App;
