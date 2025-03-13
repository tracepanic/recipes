import { MongoClient } from 'mongodb';

const user = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASS;
const cluster = process.env.MONGODB_CLUSTER;

const uri = `mongodb+srv://${user}:${password}@${cluster}.icauh.mongodb.net`;

if (!uri) {
    throw new Error('Please add your Mongo URI to Environment Variables.');
}

const client = new MongoClient(uri);
const clientPromise = client.connect();

export default clientPromise;