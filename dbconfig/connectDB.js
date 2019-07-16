const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://test:admin123@muahexanh-vwmur.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err, client) => {
  if (err) throw err;
  const collection = client.db("muahexanh").collection("expressscore");
  console.log("connected to database");
});
