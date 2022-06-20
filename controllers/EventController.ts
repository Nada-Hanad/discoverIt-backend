import { Request, Response } from 'express';
import EventModel from '../models/EventModel';
import LocationModel from '../models/locationModel';
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'wildme',
  api_key: '697235533458487',
  api_secret: 'W7C06RxFgL53KFbarGgRKFX4_RU',
  secure: true
});

export const getEventsById = (req: Request, res: Response) => {
  const locationId = req.body.location;
  console.log({ location: locationId });
  EventModel.find()
    .then((user: any) => res.json(user))
    .catch((err: any) => res.status(500).json(err));
};
export const addEvent = async (req: Request, res: Response) => {
  const media = req.files as any[];
  var mediaUrls: String[] = [];
  var event;

  if (!(media == undefined)) {
    await Promise.all(
      media.map(async (file: any): Promise<void> => {
        await cloudinary.uploader.upload(file.path, (err: any, result: any) => {
          if (err) {
            console.log(err);
          } else {
            mediaUrls.push(result.url);
          }
        });
      })
    );
    event = { ...req.body, media: mediaUrls };
  } else {
    event = { ...req.body };
  }

  const newEvent = new EventModel(event);
  newEvent
    .save()
    .then((event) => res.json(event))
    .catch((err) => res.json(err));
};
export const deleteAllEvents = (req: Request, res: Response) => {
  EventModel.deleteMany({})
    .then((data: any) => res.json({ message: 'Deleted Successfully' }))
    .catch((err: any) =>
      res.sendStatus(400).json({
        error: 'Unable to delete!'
      })
    );
};
