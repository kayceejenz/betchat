const FeedServ = require("./../services/feed.service");
const response = require("./../utils/response");

class FeedContoller {
  async create(req, res) {
    const result = await FeedServ.create(req.body,req.$user);
    res.status(200).send(response("Feed created", result));
  }

  async getAll(req, res) {
    const result = await FeedServ.getAll();
    res.status(200).send(response("All feeds", result));
  }

  async getOne(req, res) {
    const result = await FeedServ.getOne(req.params.id);
    res.status(200).send(response("Feed data", result));
  }

  async update(req, res) {
    const result = await FeedServ.update(req.params.id, req.body,req.$user);
    res.status(200).send(response("Feed updated", result));
  }

  async delete(req, res) {
    const result = await FeedServ.delete(req.params.id,req.$user);
    res.status(200).send(response("Feed deleted", result));
  }
}

module.exports = new FeedContoller();