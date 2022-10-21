// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../utils/client'
import { v4 as uuidv4 } from "uuid";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if(req.method === 'PUT'){
       const { userId, postId, like} = req.body

       const data = 
       like ? await client
       .patch(postId)
       .setIfMissing({likes: []})
       .insert('after', 'likes[-1]', [
        {
            _key: uuidv4(),
            _type:"reference",
            _ref: userId 
        }
       ])
       .commit()
       : await client
       .patch(postId)
       .unset([`likes[_ref=="${userId}"]`])
       .commit()

       console.log(data)
       res.status(200).json(data)
    }
}
