export type PostType = {
    id: string
    createdAt: string
    content: string
    user: {
        name: string
        image: string
    }
    comments?: {
        id: string
        createdAt: string
        postId: string
        userId: string
    }[]
}