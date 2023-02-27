"use client"

import Post from "@/app/components/Post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchDetails = async ( slug: string ) => {
    const response = await axios.get( `/api/posts/${ slug }` )
    return response.data
};

const PostDetail = () => {
  return (
    <div>PostDetail</div>
  )
}

export default PostDetail