import { IPost } from "./common/interface";
import "./styles.css"

interface IPostProps {
    post: IPost,
    gap: number
}
function Post({post, gap} : IPostProps) {
    return (
        <li className="post" style={({ marginLeft: `${3*gap}rem` })}>
            <div className="post__header">
                <div className="post__user-date">
                    <div className="post__username">
                        { post.username }
                    </div>
                    <div className="post__email">
                        { post.email }
                    </div>
                </div>
                <div className="post__date">
                    { post.createdAt.toString() }
                </div>
            </div>
            <div className="post__text">
                { post.text }
            </div>
        </li>
    )
}

export default Post;