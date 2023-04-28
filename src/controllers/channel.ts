import { Response, Request } from 'express';
import Channel, { IChannel } from '../models/Channel';

const ChannelController = {
  create: async (req: Request, res: Response, next: any) => {
    const { name, server } = req.body;
    Channel.create({ name, server }).then((channel) => {
      res.status(200).json({
        message: "Channel created",
        data: channel
      })
    }, (err) => next(err))
  }
}

export default ChannelController