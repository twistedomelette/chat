import React from "react";
import { useDispatch } from "react-redux";
import { IPost } from "./common/interfaces";
import "./styles.css"

interface IPostProps {
    post: IPost,
    gap: number,
}
function Post({post, gap} : IPostProps) {
    const dispatch = useDispatch()

    function handleAddPost () {
        dispatch({type: "SELECT_POST", payload: post})
        dispatch({type: "SET_MODAL", payload: true})
    }

    return (
        <li className="post" style={({ marginLeft: `${6*gap}rem` })}>
            <div className="post__header">
                <div className="post__user-date">
                    <div className="post__username">
                        <h1>{ post.username }</h1>
                    </div>
                    <div className="post__email">
                        <h1>{ post.email }</h1>
                    </div>
                </div>
                <div className="post__info">
                    <button className="post__btn" onClick={handleAddPost}><h2>Add Post</h2></button>
                    <div className="post__date">
                        <h2>{ post.createdAt.toString() }</h2>
                    </div>
                </div>
            </div>
            <div className="post__text">
                { post.image && <img src={post.image}  className="post__img" alt="img" /> }
                <h2>{ post.text }</h2>
            </div>
        </li>
    )
}

export default Post;