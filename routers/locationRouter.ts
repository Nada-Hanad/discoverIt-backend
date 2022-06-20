import { Router } from 'express';
import {
  addLocation,
  deleteAllLocations,
  deleteLocation,
  getLocationByID,
  getLocations,
  getLocationsByWilaya
} from '../controllers/locationController';

var path = require('path');
var appDir = path.dirname(require?.main?.filename);

import multer from 'multer';
// Config
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, appDir + '/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toLocaleString() + file.originalname);
  }
});

var upload = multer({ storage: storage });

const initRouter = (router: Router) => {
  router
    .route('/locations')
    .get(getLocations)
    .post(upload.array('media'), addLocation)
    .delete(deleteAllLocations);
  router.route('/locations/:id').get(getLocationByID).delete(deleteLocation);
  router.route('/locationsByWilaya').get(getLocationsByWilaya);
};

export default initRouter;
