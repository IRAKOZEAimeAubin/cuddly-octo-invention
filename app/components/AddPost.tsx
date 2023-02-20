"use client";

import { useState } from "react"

const AddPost = () => {
    const [ content, setContent ] = useState( "" );
    return (
        <form className="bg-white my-8 p-8 rounded-md">
            <div className="flex flex-col my-4">
                <textarea onChange={(e)=>setContent(e.target.value)} name="content" value={content} placeholder="What's on your mind ?" className="p-4 text-lg rounded-md my-2 bg-gray-200"></textarea>
            </div>
        </form>
    );
}

export default AddPost