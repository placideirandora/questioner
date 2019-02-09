
class meetup {
    constructor(location, topic, happeningOn, images,  tags) {
      this.location = location;
      this.topic = topic;
      this.happeningOn = new Date(happeningOn);
      this.images = images;
      this.tags = tags;
    }
  }
  
  export default meetup;
  