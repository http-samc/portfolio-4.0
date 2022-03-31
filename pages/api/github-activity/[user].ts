import type { NextApiRequest, NextApiResponse } from 'next'

const EVENT_LOOKUP: any = {
    'PushEvent': ['Committed to', 'cyan'],
    'CreateEvent': ['Created', 'green'],
    'DeleteEvent': ['Deleted', 'red'],
    'ForkEvent': ['Forked', 'purple'],
    'IssuesEvent': ['Raised Issue in', 'yellow'],
    'PullRequestEvent': ['Pull Request in', 'blue'],
    'WatchEvent': ['Watched', 'yellow'],
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { user }: any = req.query
    try {
        if (!user) {
            res.status(400).send({ error: 'No user specified.' })
        }
        let apiCall = await fetch(`https://api.github.com/users/${user}/events`)
        let apiResponse = await apiCall.json()

        // extract most recent event
        var event = null;
        for (let i = 0; i < apiResponse.length; i++) {
            event = apiResponse[i]
            if (event.type in EVENT_LOOKUP && event.actor.login === user) {
                break
            }
        }

        if (!event) {
            res.status(400).send({ error: 'No recognized events found.' })
        }

        let [action, color]: any = EVENT_LOOKUP[event.type]
        let date = new Date(event.created_at)
        let datetimestr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
        let message = `"${event.payload.commits[0].message}"` || '';
        let html = `
        <div style="font-family: monospace; background-color: #121212; padding: 5px; border-radius: 5px; color: white; display: flex; align-items: center; justify-content: space-between">
        <div style="display: flex; align-items: center; margin-left: 5px">
        <img src="${event.actor.avatar_url}" style="width: 30px; height: 30px; border-radius: 50px; margin-right: 10px;">
        <p><span style="color: ${color}">${action}</span> ${event.repo.name.split('/')[1]} <span style="color: orange">${message}</span></p>
        </div>
        <p style="margin-right: 10px">${datetimestr}</p>
        </div>
        `

        res.status(200).send(html)
    } catch (err) {
        res.status(500).send({ error: 'Error! API servers down.' })
    }
}