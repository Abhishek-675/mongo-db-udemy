const mongodb= require('mongodb');
const mongoClient= mongodb.MongoClient;

let _db;

const mongoConnect= callback=>{
  mongoClient.connect(
    `mongodb+srv://${process.env.MongoUserName}:${process.env.MongoPassword}@cluster0.epovlt4.mongodb.net/shop?retryWrites=true&w=majority`
  )
    .then(client=>{
      console.log('>>>>connected');
      callback(client);
      _db= client.db();
    })
    .catch(err=>{
      console.log(err);
      throw err;
    })
};

const getDb= ()=>{
  if(_db) {
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect= mongoConnect;
exports.getDb= getDb;
