import axios from "axios";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import "./styles.css"
import { useDispatch, useSelector } from "react-redux";
import { BaseURL } from "../../helpers/constants/path";
import IPostState from "../../store/common/interfaces";
import { IPostErrors, IPostForSend, IPostTake } from "./common/interfaces";
import ReCAPTCHA from "react-google-recaptcha";

function Modal() {
    const selectedPost = useSelector((state: IPostState) => state.posts.selected)
    const isShowModal = useSelector((state: IPostState) => state.posts.isShowModal)
    const dispatch = useDispatch()

    const captcha = useRef<ReCAPTCHA>(null)
    const [isReloadFlag, setIsReloadFlag] = useState<boolean>(false)
    const [newPost, setNewPost] = useState<IPostForSend>({
        username: "",
        email: "",
        url: "",
        image: null,
        text: "",
        post_id: "",
        main_id: ""
    })
    const [isTakePost, setIsTakePost] = useState<IPostTake>({
        username: false,
        email: false,
        text: false,
    })
    const [errorsPost, setErrorsPost] = useState<IPostErrors>({
        username: "Empty field",
        email: "Empty field",
        url: "",
        image: "",
        text: "Empty field",
        captcha: "Get tested"
    })

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3001')

        if (isReloadFlag) {
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    type: "reload"
                }))
            }
        }
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            if (data.type === "reload") {
                setIsReloadFlag(false)
                dispatch({type: "RELOAD", payload: true})
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isReloadFlag])


    function checkErrorsPost() {
        let flag = false
        Object.values(errorsPost).forEach(el => {
            if (el)
                flag = true
        })
        return flag
    }
    const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "username":
                setIsTakePost({...isTakePost, username: true})
                break
            case "email":
                setIsTakePost({...isTakePost, email: true})
                break
            case "text":
                setIsTakePost({...isTakePost, text: true})
                break
        }
    }
    function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, username: e.target.value })
        setErrorsPost({ ...errorsPost, username: "" })
        if (!/^[a-z0-9]+$/i.test(e.target.value)) {
            setErrorsPost({ ...errorsPost, username: "Incorrect username" })
        }
        if (!e.target.value) {
            setErrorsPost({ ...errorsPost, username: "Empty field" })
        }
    }
    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, email: e.target.value })
        setErrorsPost({ ...errorsPost, email: "" })
        if (!/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
            setErrorsPost({ ...errorsPost, email: "Incorrect email" })
        }
        if (!e.target.value) {
            setErrorsPost({ ...errorsPost, email: "Empty field" })
        }
    }
    function onChangeUrl(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, url: e.target.value })
        setErrorsPost({ ...errorsPost, url: "" })
        if (!/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)/.test(e.target.value)) {
            setErrorsPost({ ...errorsPost, url: "Incorrect url" })
        }
        if (!e.target.value) {
            setErrorsPost({ ...errorsPost, url: "" })
        }
    }
    function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        setErrorsPost({ ...errorsPost, image: "" })
        if (e.target.files) {
            setNewPost({ ...newPost, image: e.target.files[0] })
        }
        const ext = e.target.value.match(/\.([^]+)$/)

        if (ext) {
            switch (ext[0]) {
                case '.jpg':
                case '.png':
                case '.gif':
                case '.txt':
                    break;
                default:
                    setErrorsPost({ ...errorsPost, image: "Permission not available" })
                    e.target.value = ''
            }
        }
    }
    function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, text: e.target.value })
        setErrorsPost({ ...errorsPost, text: "" })
        if (!e.target.value) {
            setErrorsPost({ ...errorsPost, text: "Empty field" })
        }
    }
    function onClose(e: FormEvent) {
        e.preventDefault();
        setNewPost({
            username: "",
            email: "",
            url: "",
            image: null,
            text: "",
            post_id: "",
            main_id: ""
        })
        setIsTakePost({
            username: false,
            email: false,
            text: false,
        })
        setErrorsPost({
            username: "Empty field",
            email: "Empty field",
            url: "",
            image: "",
            text: "Empty field",
            captcha: "Get tested"
        })
        if (captcha.current) {
            captcha.current.reset()
        }
        dispatch({type: "SET_MODAL", payload: false})
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        let post
        if (selectedPost) {
            post = { ...newPost, post_id: selectedPost.id, main_id: selectedPost.main_id }
        } else {
            post = { ...newPost }
        }
        const formData = new FormData();
        formData.append("image", post.image ? post.image : '');
        formData.append("post", JSON.stringify(post));
        await axios.post(`${BaseURL}/api/post`, post, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=------WebKitFormBoundaryGEmKHDASGjB7QEah',
            },
        })
            .then(_ => {
                dispatch({type: "RELOAD", payload: true})
                setIsReloadFlag(true)
            })
            .catch(err => {
                alert(`Oh no, ${err.message}`);
            });


        dispatch({type: "SET_MODAL", payload: false})
    }

    function onChange(value: string | null) {
        if (value) {
            setErrorsPost({ ...errorsPost, captcha: "" })
        }
    }


    return (
        <form onSubmit={handleSubmit} className={`modal ${!isShowModal ? "modal__show" : ""}`} >
            <h1>Add new post</h1>
            <div className="modal__content">
                <div className="content__username">
                    <h2>Username</h2>
                    { (isTakePost.username && errorsPost.username)
                        && <div style={{color: "red"}}>{ errorsPost.username }</div> }
                    <input
                        onBlur={blurHandler}
                        name="username"
                        className="content__username-input"
                        type="text"
                        placeholder="Username"
                        value={newPost.username}
                        onChange={onChangeName}
                    />
                </div>
                <div className="content__email">
                    <h2>Email</h2>
                    { (isTakePost.email && errorsPost.email)
                        && <div style={{color: "red"}}>{ errorsPost.email }</div> }
                    <input
                        onBlur={blurHandler}
                        name="email"
                        className="content__email-input"
                        type="text"
                        placeholder="Email"
                        value={newPost.email}
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="content__url">
                    <h2>Url</h2>
                    { errorsPost.url && <div style={{color: "red"}}>{ errorsPost.url }</div> }
                    <input
                        className="content__url-input"
                        type="text"
                        placeholder="Url"
                        value={newPost.url}
                        onChange={onChangeUrl}
                    />
                </div>
                <div className="content__img">
                    <h2>Image</h2>
                    { errorsPost.image && <div style={{color: "red"}}>{ errorsPost.image }</div> }
                    <input
                        className="content__img-input"
                        type="file"
                        placeholder="Image"
                        key={newPost.image ? newPost.image.name : ''}
                        onChange={onChangeFile}
                        accept=".jpg,.png,.gif,.txt"
                    />
                </div>
                <div className="content__text">
                    <h2>Enter the text</h2>
                    { (isTakePost.text && errorsPost.text)
                        && <div style={{color: "red"}}>{ errorsPost.text }</div> }
                    <input
                        onBlur={blurHandler}
                        name="text"
                        className="content__text-input"
                        placeholder="Text"
                        value={newPost.text}
                        onChange={onChangeText}
                    />
                </div>
                <ReCAPTCHA
                    className="captcha"
                    sitekey="6Ley-ngkAAAAAC84RfqpLKhMYIPL3qAmd8ccPgYr"
                    onChange={onChange}
                    ref={captcha}
                />
            </div>
            <div className="modal__actions">
                <button disabled={checkErrorsPost()} className="modal__btn" type="submit">
                    <h2>Add</h2>
                </button>
                <button className="modal__btn" onClick={onClose}>
                    <h2>Close</h2>
                </button>
            </div>
        </form>
    )
}

export default Modal;