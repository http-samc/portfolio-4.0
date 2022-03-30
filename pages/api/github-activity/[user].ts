import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user }: any = req.query
    try {
        if (!user) {
            res.status(400).send({ error: 'No user specified.' })
        }
        let apiCall = await fetch(`https://api.github.com/users/${user}/events`)
        let apiResponse = await apiCall.json()

        res.status(200).json({ hello: user })
    } catch (err) {
        res.status(500).send({ error: 'Error! API servers down.' })
    }
}