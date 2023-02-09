import { IPost } from "./common/interface";
import Post from "./post";

interface IChatProps {
    posts: IPost[]
}
function Chat({posts}: IChatProps) {
    let pointer: string = ""
    let gaps: Array<number> = []
    let queue: Array<[string, number]> = []
    let correctPosts: Array<IPost> = []
    let putPosts: Array<number> = []

    function getGapByPointer(posts: IPost[], putPosts: number[]): number {
        for (let k = 0; k < posts.length; k++) {
            if (posts[k].id === pointer) {
                for (let l = 0; l < putPosts.length; l++) {
                    if (putPosts[l] === k) {
                        return  l
                    }
                }
            }
        }
        return 0
    }

    function isPut(putPosts: number[], i: number): boolean {
        return putPosts.find(el => el === i) === undefined
    }

    if (posts.length) {
        pointer = posts[0].id
        queue.push([posts[0].id, 1])
        correctPosts.push(posts[0])
        gaps.push(1)
        putPosts.push(0)

        while (posts.length > correctPosts.length) {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].post_id === pointer && isPut(putPosts, i)) {
                    putPosts.push(i)
                    pointer = posts[i].id
                    gaps.push(queue[queue.length - 1][1] + 1)
                    const selectPost = getGapByPointer(posts, putPosts)
                    queue.push([pointer, gaps[selectPost]])
                    correctPosts.push(posts[i])
                }
            }
            if (queue.length) {
                queue.pop()
                pointer = queue[queue.length - 1][0]
            }
        }
    }

    return (
        <ul className="posts">
            { correctPosts.map((post, i) => {
                return <Post key={post.id} post={post} gap={gaps[i] - 1} />
            })}
        </ul>
    )
}

export default Chat;