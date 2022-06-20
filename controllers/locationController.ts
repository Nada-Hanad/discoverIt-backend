import { Request, Response } from 'express';
import LocationModel from '../models/locationModel';
var cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'wildme',
  api_key: '697235533458487',
  api_secret: 'W7C06RxFgL53KFbarGgRKFX4_RU',
  secure: true
});

export const getLocations = (req: Request, res: Response) => {
  LocationModel.find()
    .then((data) => res.json(data))
    .catch((e) => res.json(e));
};

export const getLocationsByWilaya = (req: Request, res: Response) => {
  const wilaya = req.body.Wilaya;
  console.log(wilaya);
  LocationModel.find()
    .then((data) => {
      data.map((e) => {
        var results = [];
        if (e.Wilaya == wilaya) {
          results.push(e);
          res.json(results);
        }
      });
      res.json(data);
    })
    .catch((e) => res.json(e));
};
export const getLocationsByCategory = (req: Request, res: Response) => {
  const category = req.body.category;
  console.log(category);
  LocationModel.find()
    .then((data) => {
      data.map((e) => {
        var results = [];
        if (e.category == category) {
          results.push(e);
          res.json(results);
        }
      });
      res.json(data);
    })
    .catch((e) => res.json(e));
};
export const getLocationByID = (req: Request, res: Response) => {
  const { id } = req.params;
  LocationModel.findById(id)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
};
export const addLocation = async (req: Request, res: Response) => {
  const media = req.files as any[];
  var mediaUrls: String[] = [];
  var loc: Location;

  if (!(media == undefined)) {
    await Promise.all(
      media.map(async (file: any): Promise<void> => {
        console.log('start');
        await cloudinary.uploader
          .upload(file.path, (err: any, result: any) => {
            if (err) {
            } else {
              console.log(result);
              console.log(mediaUrls);
            }
          })
          .then((result: any) => mediaUrls.push(result.url))
          .catch((err: any) => console.log(err));
      })
    );
    loc = { ...req.body, media: mediaUrls };
  } else {
    loc = { ...req.body };
  }

  const newLocation = new LocationModel(loc);
  newLocation
    .save()
    .then((location) => res.json(location))
    .catch((err) => res.json(err));
};

export const deleteLocation = (req: Request, res: Response) => {
  LocationModel.findByIdAndDelete(req.params.id)
    .then((data) => res.json({ message: 'Deleted Successfully' }))
    .catch((err) =>
      res.sendStatus(400).json({
        error: 'Unable to delete!'
      })
    );
};
export const deleteAllLocations = (req: Request, res: Response) => {
  LocationModel.deleteMany({})
    .then((data) => res.json({ message: 'Deleted Successfully' }))
    .catch((err) =>
      res.sendStatus(400).json({
        error: 'Unable to delete!'
      })
    );
};
