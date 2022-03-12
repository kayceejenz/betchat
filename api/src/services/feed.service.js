const Feed = require("./../models/feed.model");
const CustomError = require("./../utils/custom-error");

class FeedService {

  async create(data,user) {
    data.postedBy = user._id;
    const feed = await new Feed(data).save();
    return feed.populate("postedBy","-__v -password")
  }

  async getAll() {
    return await Feed.find({}, { __v: 0 }).populate("postedBy","-__v -password");
  }

  async getOne(id) {
    const feed = await Feed.findOne(
      { _id: id },
      { __v: 0 }
    ).populate("postedBy","-__v -password");
    if (!feed) throw new CustomError("Feed does not exist");

    return feed
  }

  async update(id, data,user) {
    const postedByUser = await Feed.findOne({_id: id, postedBy:user._id});
    if(!postedByUser) throw new CustomError("Owner denied, Can't modify post you didn't create")

    const feed = await Feed.findByIdAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    if (!feed) throw new CustomError("Feed dosen't exist", 404);

    return feed;
  }

  async delete(id,user) {
    const feed = await Feed.findOne({_id: id, postedBy:user._id});
    if(!feed) throw new CustomError("Owner denied, Can't modify post you didn't create")

    feed.remove()
    return feed
  }
}

module.exports = new FeedService();