// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"
import prisma from "../../../prisma/client"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if ( req.method === "POST" ) {
        const session = await getServerSession( req, res, authOptions )
        if ( !session ) return res.status( 401 ).json( { message: "Please login before making a post!" } )
        const content: string = req.body.content

        const prismaUser = await prisma.user.findUnique( {
            where: { email: session?.user?.email },
        })

        if ( content.length > 300 ) return res.status( 403 ).json( { message: "Please limit your post to 300 characters." } )
        if ( !content.length ) return res.status( 403 ).json( { message: "Please do not leave your post empty." } )

        try {
            const result = await prisma.post.create( {
                data: {
                    content,
                    userId: prismaUser.id,
                },
            } )
            res.status( 200 ).json( result )
        } catch (error) {
            res.status( 403 ).json( { err: "Error(s) occured while creating the post" } )
        }
  }
}
