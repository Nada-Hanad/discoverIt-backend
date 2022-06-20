import mongoose, { Schema } from 'mongoose';

const EventSchema: Schema = new Schema({
  name: String,
  description: String,
  media: Array,
  location: String
});
const EventModel = mongoose.model('events', EventSchema);
export default EventModel;
