import jwt from 'jsonwebtoken'
import { nanoid } from 'nanoid'
import { Session } from '../../models'

export function signNew(payload, options) {
    const data = {
        uuid: nanoid(),
        ...payload
    }

    const token = jwt.sign(data, options.secretOrKey, {
        expiresIn: options.expiresIn ?? "1h",
        algorithm: options.algorithm ?? "HS256"
    })

    let newSession = new Session({
        uuid: data.uuid,
        user_id: data.user_id,
        token: token,
        date: new Date().getTime(),
    })

    newSession.save()

    return token
}