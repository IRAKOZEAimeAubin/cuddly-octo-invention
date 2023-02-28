// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import {getServerSession} from 'next-auth/next'
import {authOptions} from '../auth/[...nextauth]'
import prisma from '../../../prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions)
      if ( !session ) return res.status( 401 ).json( { message: 'Please login!' } )
      
      const prismaUser = await prisma.user.findUnique( {
          where: {
              email: session?.user?.email
          }
      } )
    try {
        const { content, postId } = req.body.data
        if ( !content.length ) {
            return res.status( 401 ).json( { message: "Please don't leave this empty" })
        }
        const result = await prisma.comment.create( {
            data: {
                message: content,
                userId: prismaUser?.id,
                postId
            }
        })
        res.status( 200 ).json( result )
    } catch (error) {
      res.status(403).json({err: 'Error(s) occured while commenting the post'})
    }
  }
}
