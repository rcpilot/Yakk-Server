import { Response, Request } from 'express';
import Server, { IServer } from '../models/Server';

const ServerController = {
  create: async (req: Request, res: Response, next: any) => {
    const { name } = req.body;
    Server.create({ name }).then((server) => {
      res.status(200).json({
        message: "Server created",
        data: server
      })
    }, (err) => next(err))
  }
}

export default ServerController