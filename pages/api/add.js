import { connectToDatabase } from '../../util/mongodb';

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const data = await db.collection('aircraft').find().toArray();

  res.json(data);
};
