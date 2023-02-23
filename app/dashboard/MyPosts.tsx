"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { AuthPost } from "../types/AuthPost"
import EditPost from "./EditPost";

const fetchAuthPosts = async () => {
    const response = await axios.get( "/api/posts/authPost" )
    return response.data
}

const MyPosts = () => {
    const { data, isLoading } = useQuery<AuthPost>( {
        queryFn: fetchAuthPosts,
        queryKey: [ "auth-posts" ]
    } )
    if ( isLoading ) return <h1>Your posts are loading...</h1>
    console.log(data);
  return (
    <div>
      {data?.posts?.map( ( post ) => (
        <EditPost id={post.id} key={post.id} avatar={data.image} name={data.name} content={post.content} comments={post.comments} />
      ))}
    </div>
  )
}

export default MyPosts