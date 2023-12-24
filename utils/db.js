import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const db = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}/${db}`, { useNewUrlParse: true, useUnifiendTopology: true });
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Connected successfully to server');
    } catch (err) {
      console.log(err);
      throw err;
    } finally {
      await this.client.close();
    }
  }

  isAlive() {
    return !!this.client;
  }

  async nbUsers() {
    const usersCollection = this.client.collection('users');
    const count = await usersCollection.countDocuments();
    return count;
  }

  async nbFiles() {
    const filesCollections = this.client.collection('files');
    const count = await filesCollections.countDocuments();
    return count;
  }
}

module.exports = new DBClient();
