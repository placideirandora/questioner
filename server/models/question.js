
class question {
    constructor(id, meetup, title, body) {
      this.id = id,
      this.meetup = meetup,
      this.title = title;
      this.body = body;
      this.upvotes = 0;
      this.downvotes = 0;
    }
  }

  export default question;

