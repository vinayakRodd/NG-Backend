const mongodb=require('mongodb')

// const connectionUrl = "mongodb+srv://notegobmsce:SpMVp1TnwezwT0HM@cluster1.q0uhg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
// const connectionUrl = "mongodb://localhost:27017/NoteGo"
const connectionUrl = "mongodb+srv://notegobmsce:CUG6jysyvSXcVqZO@cluster1.q0uhg.mongodb.net/NoteGo?retryWrites=true&w=majority&appName=Cluster1";
// const connectionUrl = "mongodb+srv://notegobmsce:SpMVp1TnwezwT0HM@cluster1.q0uhg.mongodb.net/NoteGo?retryWrites=true&w=majority&tlsAllowInvalidCertificates=true";

// const connectionUrl = "mongodb+srv://notegobmsce:SpMVp1TnwezwT0HM@cluster1.q0uhg.mongodb.net/NoteGo?retryWrites=true&w=majority&appName=Cluster1";


const client=new mongodb.MongoClient(connectionUrl)

var db;

try{
    
    client.connect();
    console.log("Connected to Mongodb")
    db=client.db()
}

catch(err)
{
    console.log(err)
}

module.exports=db
