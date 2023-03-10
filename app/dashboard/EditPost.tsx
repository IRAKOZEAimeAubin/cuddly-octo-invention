"use client"

import Image from "next/image"
import { useState } from "react"
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast"

type EditProps = {
    id: string
    name: string
    avatar: string
    content: string
    comments?: {
        id: string
        postId: string
        userId: string
    }[]
}

const EditPost = ( { avatar, name, content, comments, id }: EditProps ) => {
    const [ toggle, setToggle ] = useState( false );
    let deleteToastID: string
    const queryClient = useQueryClient()
    const { mutate } = useMutation(
        async ( id: string ) => await axios.delete( "/api/posts/deletePost", { data: id } ),
        {
            onError: ( err ) => {
                toast.error( "Error deleting post", { id: deleteToastID } )
            },
            onSuccess: ( data ) => {
                toast.success( "Post deleted successfully", { id: deleteToastID } )
                queryClient.invalidateQueries( [ "auth-posts" ] )
            },
        }
    );

    const deletePost = () => {
        deleteToastID = toast.loading( "Deleting your post.", { id: deleteToastID } )
        mutate( id );
    };
    return (
        <>
            <div className="bg-white my-8 p-8 rounded-lg">
                <div className="flex items-center gap-2">
                    <Image width={32} height={32} src={avatar} alt={name} className="rounded-full" />
                    <h3 className="font-bold text-gray-700">{name}</h3>
                </div>
                <div className="my-8">
                    <p className="break-all">{content}</p>
                </div>
                <div className="flex items-center gap-4">
                    <p className="text-sm font-bold text-gray-700">
                        {comments?.length} Comments
                    </p>
                    <button onClick={( e ) => { setToggle( true ); }} className="text-sm font-bold text-red-600 uppercase">Delete</button>
                </div>
            </div>
            {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
        </>
    );
}

export default EditPost