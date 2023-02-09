import React, { useEffect, useState } from 'react';
import Chat from './components/chat/chat';
import { IPost } from "./components/chat/common/interface";
function App() {
    let [posts, setPosts] = useState<IPost[]>([])

    useEffect(() => {
        fetch('http://localhost:3001/api/post/3d75732d-0a9c-4af6-ab8b-e165d7018035')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setPosts(data.reverse())
            });
    }, [])

    return (
        <div className="App">
            {posts ? <Chat posts={posts}/> : <>Loading...</>}
        </div>
    );
}

export default App;
