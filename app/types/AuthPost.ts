export type AuthPost = {
    id: string
    name: string
    email: string
    image: string
    posts: {
        id: string
        createdAt: string
        content: string
        comments?: {
            id: string
            createdAt: string
            message: string
            postId: string
            userId: string
        }
    }
}