import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  blogName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,  
  },
  content: {           
    type: String,
    required: true,
  }
}, {
  timestamps: true   
});

export default mongoose.model('Blog', blogSchema);
