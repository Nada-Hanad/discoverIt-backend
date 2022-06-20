interface event {
  name: String;
  date: String;
  time: String;
  description: String;
  location: String;
  images: String[];
}

export interface Location {
  _id?: String;
  name: String;
  category: String;
  description: String;
  Wilaya: String;
  events: event[];
  media: String[];
}
