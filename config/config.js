
var env = process.env.NODE_ENV || 'development';
console.log('Current Environment : ' +  env);

if (env === 'development') {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/GOT';
}

console.log('MongoDb Path : ' +  process.env.MONGODB_URI);