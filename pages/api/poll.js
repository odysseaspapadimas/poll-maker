import { ObjectId } from "mongodb";
import dbConnect from "../../lib/mongodb";
import Poll from "../../models/Poll";

export default async function poll(req, res) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const { id } = req.query;
        console.log(req.query, "id");
        const questions = await Poll.findById(new ObjectId(id));

        res.status(200).send(questions);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
    case "PUT":
      try {
        const { pollId, optionId } = req.query;
        console.log(pollId, optionId, "option id");
        const poll = await Poll.findOneAndUpdate(
          { _id: new ObjectId(pollId), "options.id": optionId },
          { $inc: { "options.$.votes": 1 } },
          { new: true }
        );

        console.log(poll, "PuT");

        res.status(201).send(poll);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
    case "POST":
      try {
        console.log(req.body, "hii");
        const poll = await Poll.create(req.body);

        console.log(poll);

        res.status(201).send(poll);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
  }
}
