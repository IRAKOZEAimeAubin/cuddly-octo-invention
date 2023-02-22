"use client"

import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { AuthPost } from "../types/AuthPost"

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
    <div>MyPosts</div>
  )
}

export default MyPosts