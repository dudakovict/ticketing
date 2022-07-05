import express, { Request, Response } from 'express';
import { currentUser } from '@dudakovict-ticketing/common'

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
    res.send({ currentUser: req.currentUser || null })
})

export { router as currentUserRouter }