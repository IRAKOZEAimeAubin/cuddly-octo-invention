"use client"

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type CommentProps = {
    id?: string
}

type Comment = {
    postId?: string
    content: string
}

const AddComment = ( { id }: CommentProps ) => {
    const [ content, setContent ] = useState( "" );
    const [isDisabled,setIsDisabled]=useState(false)
    const queryClient = useQueryClient()
    let toastCommentID: string
    
    const { mutate } = useMutation(
        async ( data: Comment ) => await axios.post( "/api/posts/addComment", { data } ),
        {
            onError: ( err ) => {
                if ( err instanceof AxiosError ) toast.error( err?.response?.data.message, { id: toastCommentID } );
                setIsDisabled( false )
            },
            onSuccess: ( data ) => {
                toast.success( "Added your comment! 🔥", { id: toastCommentID } );
                queryClient.invalidateQueries( [ "detail-post" ] );
                setContent( "" );
                setIsDisabled( false );
            }
        }
    )

    const submitComment = async ( e: React.FormEvent ) => {
        e.preventDefault()
        toastCommentID = toast.loading( "Creating...🔃", { id: toastCommentID } )
        setIsDisabled( true )
        mutate( { content, postId: id } )
    }

    return (
        <form onSubmit={submitComment} className="my-8">
            <h3>Add a comment</h3>
            <div className="flex flex-col my-2">
                <input onChange={( e ) => setContent( e.target.value )} value={content} type="text" className="p-4 text-lg rounded-md my-2" />
            </div>
            <div className="flex items-center gap-2">
                <button disabled={isDisabled} type="submit" className="text-sm bg-teal-600 text-white uppercase py-2 px-6 rounded-xl disabled:opacity-25">Add Comment 🚀</button>
                <p className={`font-bold text-sm ${content.length > 300 ? "text-red-700" : "text-gray-700"}`}>{`${content.length}/300`}</p>
            </div>
        </form>
    );
}

export default AddComment