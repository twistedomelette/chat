import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import IPostState from "../../store/common/interfaces";
import { IMessage, IPost } from "./common/interfaces";
import Post from "./post";
import { useNavigate } from 'react-router-dom';
import "./styles.css"

interface IChatProps {
    posts: IPost[]
    setPage: Dispatch<SetStateAction<number>>
}
function Chat({posts, setPage}: IChatProps) {
    const dispatch = useDispatch()
    const queuePosts = useSelector((state: IPostState) => state.posts.queuePosts)
    const [selectedOption, setSelectedOption] = useState<string>()
    const [flag, setFlag] = useState<boolean>(true)
    const [nowPage, setNowPage] = useState<number>(1)
    const [sortPosts, setSortPosts] = useState<IPost[]>([])
    const orderOptions = [
        { value: 'createdAt', label: 'CreatedAt' },
        { value: 'username', label: 'Username' },
        { value: 'email', label: 'Email' },
    ]
    const navigate = useNavigate();

    const chat: React.ReactNode[] = []
    if (queuePosts.length) {
        for (let j = 0; j < queuePosts.length; j++)
            chat[j] = queuePosts[j].posts.map((post: IPost, i: number) => {
                return <Post
                    key={post.id}
                    post={post}
                    gap={queuePosts[j].gaps[i] - 1}
                />
            })
    }

    useEffect(() => {
        navigate({ search: `` });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (posts.length) {
            setSortPosts(posts.sort(sortByMainId))
            setFlag(false)
        }
    }, [posts])

    useEffect(() => {
        if (!flag) {
            setFlag(true)
            const loadData = async () => {
                const messagesBlocks = await getContainerOfMessages(sortPosts)
                const correctQueues = await getCorrectQueue(messagesBlocks)
                dispatch({type: "ADD_ALL_POSTS", payload: correctQueues})
            }
            loadData()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sortPosts, nowPage, flag, dispatch])

    function sortByMainId(a: IPost, b: IPost) {
        if (a.main_id > b.main_id)
            return -1
        return 1
    }

    async function getContainerOfMessages(sortPosts: IPost[]) {
        const messagesBlocks = [[sortPosts[0]]]
        for (let i = 1; i < sortPosts.length; i++) {
            if (sortPosts[i].main_id !== sortPosts[i-1].main_id) {
                messagesBlocks.push([sortPosts[i]])
            } else {
                messagesBlocks[messagesBlocks.length - 1].push(sortPosts[i])
            }
        }
        return messagesBlocks
    }

    function getGapByPointer(posts: IPost[], putPosts: number[], pointer: string): number {
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

    function getMessageBlock(posts: IPost[]) {
        let pointer: string = posts[0].id
        let gaps: Array<number> = [1]
        let queue: Array<[string, number]> = [[posts[0].id, 1]]
        let result: Array<IPost> = [posts[0]]
        let putPosts: Array<number> = [0]

        while (posts.length > result.length) {
            let flagPut = false
            for (let i = 0; i < posts.length; i++) {
                if (posts[i].post_id === pointer && isPut(putPosts, i)) {
                    putPosts.push(i)
                    pointer = posts[i].id
                    gaps.push(queue[queue.length - 1][1] + 1)
                    const selectPost = getGapByPointer(posts, putPosts, pointer)
                    queue.push([pointer, gaps[selectPost]])
                    result.push(posts[i])
                    flagPut = true
                }
            }

            if (queue.length && !flagPut) {
                queue.pop()
                pointer = queue[queue.length - 1][0]
            }
        }
        return { "posts": result, "gaps": gaps }
    }

    async function getCorrectQueue (messagesBlocks: Array<IPost[]>) {
        const correctQueue: IMessage[] = []
        messagesBlocks.forEach(arr => {
            arr.forEach((el, i) => {
                if (!el.post_id && i !== 0) {
                    [arr[0], arr[i]] = [arr[i], arr[0]]
                }
            })
            correctQueue.push(getMessageBlock(arr))
        })
        return correctQueue
    }

    function handlePreviousClick () {
        const query = new URLSearchParams(window.location.search);
        const pageNumber = query.get('page')
        if (pageNumber)
            if (+pageNumber > 1) {
                setPage(+pageNumber - 1)
                setNowPage(+pageNumber - 1)
                navigate({ search: `?page=${+pageNumber - 1}` });
            }
    }

    const handleNextClick = () => {
        const query = new URLSearchParams(window.location.search);
        const pageNumber = query.get('page')
        if (pageNumber) {
            setPage(+pageNumber + 1)
            setNowPage(+pageNumber + 1)
            navigate({ search: `?page=${+pageNumber + 1}` });
        } else {
            setPage(2)
            setNowPage(2)
            navigate({ search: `?page=2` });
        }
    }

    const handleChangeOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value)
        dispatch({type: "ORDER_BY", payload: e.target.value})
    }

    function handleAddPost () {
        dispatch({type: "SELECT_POST", payload: null})
        dispatch({type: "SET_MODAL", payload: true})
    }

    return (
        <>
            <div className="posts__navigation">
                <div className="posts__btns">
                    <button className="posts__btn" onClick={handlePreviousClick}><h2>Previous</h2></button>
                    <button className="posts__btn" onClick={handleNextClick}><h2>Next</h2></button>
                </div>
                <select onChange={handleChangeOrder} value={selectedOption}>
                    {orderOptions.map(op => {
                       return <option key={op.value} value={op.value}>{op.label}</option>
                    })}
                </select>
            </div>
            <div className="posts__add-block">
                <button className="posts__btn" onClick={handleAddPost}><h2>ADD POST</h2></button>
            </div>
            <ul className="posts">
                { queuePosts.length && posts.length ? chat : <h1>Empty</h1>}
            </ul>
        </>
    )
}

export default Chat;