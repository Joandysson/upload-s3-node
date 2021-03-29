import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://srgama:WZiqYbh7WYwkbci2@cluster0.8bgdi.mongodb.net/upload?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch(() => console.log('Error at connet database'))
