const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')


//get token from browser authentication
const getTokenFrom = request=> {  
    const authorization = request.get('authorization')  
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) { 
         return authorization.substring(7)  
         }  
        
        return null
}
blogsRouter.get('/', async(request, response) => {
    //console.log('from get')
    const blogs = await Blog
    .find({}).populate('user',{username:1,name:1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async(request, response, next) => {
    const body = request.body

     const token = getTokenFrom(request)

  try {    
      const decodedToken = jwt.verify(token,process.env.SECRET) 
     if (!token || !decodedToken.id){   
            return response.status(401).json({ error: 'token missing or invalid' }) 
     } 
     
        const user = await User.findById(decodedToken.id)
    console.log('in blog post',user)
       const blogg = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user._id,
		comments:[]
    })
        const blogSaved = await blogg.save()
        user.blogs = user.blogs.concat(blogSaved._id)
        await user.save()
        response.json(blogSaved.toJSON())
    } catch (err) {
        next(err)
    }
})
blogsRouter.delete('/:id', async(req, resp, next) => {
	console.log('from deletw',req.params.id)
    try {
      const blog=await Blog.findById(req.params.id)
	    const user = await User.findById(blog.user.id)
		console.log(user)
		User.updateMany(
        {user.id },
        { "$pull": { "blogs":req.params.id} },
        { "multi": true }
    );
        resp.status(204).end()
    } catch (exception) {
        next(exception)
    }
})
blogsRouter.put('/:id', async(req, resp, next) => {
    const body = req.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    console.log('from put')
    try {
        const updateblog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
        console.log('inside ', updateblog)
        resp.json(updateblog.toJSON())

    } catch (excep) { next(excep) }
})

module.exports = blogsRouter