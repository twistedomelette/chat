import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import "./styles.css"
import { IPostForSend } from "./common/interfaces";

interface IModal {
    setIsModal: Dispatch<SetStateAction<boolean>>
    isModal: boolean
    setIsSubmit: Dispatch<SetStateAction<boolean>>
    setNewestPost: Dispatch<SetStateAction<IPostForSend | undefined>>
}
function Modal({setIsModal, isModal, setIsSubmit, setNewestPost}: IModal) {
    const [newPost, setNewPost] = useState<IPostForSend>({
        username: "",
        email: "",
        url: "",
        image: "",
        text: "",
        post_id: "",
        main_id: ""
    })

    function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, username: e.target.value })
    }
    function onChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, email: e.target.value })
    }
    function onChangeUrl(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, url: e.target.value })
    }
    function onChangeText(e: React.ChangeEvent<HTMLInputElement>) {
        setNewPost({ ...newPost, text: e.target.value })
    }
    function onClose(e: FormEvent) {
        e.preventDefault();
        setIsModal(false)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.warn(newPost)
        setIsModal(false)
        setIsSubmit(true)
        setNewestPost(newPost)
    }

    return (
        <form onSubmit={handleSubmit} className={`modal ${!isModal ? "modal__show" : ""}`} >
            <h1>Add new post</h1>
            <div className="modal__content">
                <div className="content__username">
                    <h2>Username</h2>
                    <input
                        className="content__username-input"
                        type="text"
                        placeholder="Username"
                        onChange={onChangeName}
                    />
                </div>
                <div className="content__email">
                    <h2>Email</h2>
                    <input
                        className="content__email-input"
                        type="text"
                        placeholder="Email"
                        onChange={onChangeEmail}
                    />
                </div>
                <div className="content__url">
                    <h2>Url</h2>
                    <input
                        className="content__url-input"
                        type="text"
                        placeholder="Url"
                        onChange={onChangeUrl}
                    />
                </div>
                <div className="content__img">
                    <h2>Image</h2>
                    <input
                        className="content__img-input"
                        type="file"
                        placeholder="Image"
                    />
                </div>
                <div className="content__text">
                    <h2>Enter the text</h2>
                    <input
                        className="content__text-input"
                        placeholder="Text"
                        onChange={onChangeText}
                    />
                </div>
            </div>
            <div className="modal__actions">
                <button className="modal__btn" type="submit">
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