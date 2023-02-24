"use client";

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"


const AddPost = () => {
    const [ content, setContent ] = useState( "" );
    const [ isDisabled, setIsDisabled ] = useState( false );
    const queryClient = useQueryClient()
    let toastPostID: string

    const { mutate } = useMutation(
        async ( content: string ) => await axios.post( "/api/posts/addPost", { content } ),
        {
            onError: ( err ) => {
                if ( err instanceof AxiosError ) toast.error( err?.response?.data.message, { id: toastPostID } )
            },
            onSuccess: ( data ) => {
                toast.success( "Post made successfully! 🔥", { id: toastPostID } )
                queryClient.invalidateQueries( [ "posts" ] )
                setContent( "" )
                setIsDisabled( false )
            }
        }
    )

    const submitPost = async ( e: React.FormEvent ) => {
        e.preventDefault()
        toastPostID = toast.loading( "Creating...🔃", { id: toastPostID } )
        setIsDisabled( true )
        mutate( content )
    }

    return (
        <form onSubmit={submitPost} className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea onChange={(e)=>setContent(e.target.value)} name="content" value={content} placeholder="What's on your mind ?" className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
            </div>
            <div className="flex items-center justify-between gap-2">
                <p className={`font-bold text-sm ${content.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${content.length}/300`}</p>
                <button disabled={isDisabled} className="text-sm uppercase bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25" type="submit">
                    post
                </button>
            </div>
        </form>
    );
}

export default AddPost