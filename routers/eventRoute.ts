import { Router } from 'express';

var path = require('path');
var appDir = path.dirname(require?.main?.filename);

import multer from 'multer';
import {
  addEvent,
  deleteAllEvents,
  getEventsById
} from '../controllers/EventController';
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
  router.route('/event').post(addEvent).delete(deleteAllEvents);

  router.route('/eventsById').get(getEventsById);
};

export default initRouter;
