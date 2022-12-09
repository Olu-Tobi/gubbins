import mongoose from 'mongoose';

mongoose.set('strictQuery', true);

export async function initMongoose(){
    if (mongoose.Connection. readyState === 1){
        return mongoose.Connection.asPromise();
    }
  return await  mongoose.connect(process.env.MONGODB_URL);
}