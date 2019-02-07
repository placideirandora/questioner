
class meetup {
    constructor(id, location, images, topic, happeningOn, tags) {
      this.id = id,
      this.location = location;
      this.images = images;
      this.topic = topic;
      this.happeningOn = new Date(happeningOn);
      this.tags = tags;
    }
  }

  export default meetup;

