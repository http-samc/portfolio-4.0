import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug }: any = req.query
  try {
    res.redirect(307, `https://legacy.smrth.dev/api/${slug.join('/')}`)
  } catch (err) {
    res.status(500).send({ error: 'Error! API servers down.' })
  }
}