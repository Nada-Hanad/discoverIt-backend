import mongoose, { Model, Schema } from 'mongoose';
import { Location } from './interfaceLocation';

const LocationSchema: Schema<Location> = new Schema({
  name: String,
  category: String,
  description: String,
  mediaContent: Array,
  media: {
    type: Array,
    required: false
  },
  Wilaya: String,
  events: {
    type: Array,
    default: [],
    required: false
  }
});
const LocationModel = mongoose.model<Location>('locations', LocationSchema);
export default LocationModel;
