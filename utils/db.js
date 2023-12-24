import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const db = process.env.DB_DATABASE || 'files_manager';

    MongoClient(`mongodb://${host}:${port}`)
      .then((client) => {
        this.client = client;
        this.db = client.db(db);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      });
  }

  isAlive() {
    if (this.client) {
      return true;
    }
    return false;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

module.exports = new DBClient();
