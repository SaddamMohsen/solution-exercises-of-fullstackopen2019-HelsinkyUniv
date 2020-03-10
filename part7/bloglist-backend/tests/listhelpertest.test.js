const supertest = require('supertest')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/Blog')
const User=require('../models/User')
const bcrypt= require('bcryptjs')
const app = require('../app')
const api = supertest(app)


beforeEach(async() => {
    await Blog.deleteMany({})
    for (let blog of listHelper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
    //const blogObjects = listHelper.initialBlogs.map(blog => new Blog(blog))
    //const promiseArray = blogObjects.map(blog => blog.save())
    //await Promise.all(promiseArray)
})
describe('when there is initially some Blogs saved', () => {
    test('all blogs are returned', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body.length).toBe(listHelper.initialBlogs.length)
    })
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
})
describe('total likes', () => {
    const listWithOneBlog = [{
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }]
    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
            //console.log(result)
        expect(result).toBe(5)
    })
    test('when list has many blogs', async() => {
        const response = await api.get('/api/blogs')
        const result = listHelper.totalLikes(response.body)
        expect(result).toBe(36)
    })
    test('when list has 0 blogs', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})
describe('test post one Blog', () => {
    const newBlog = {
        title: 'async and test',
        author: 'Saddam Mohsen',
        url: 'http://www.u.arizona.edu',
        likes: 10,
        userId:'5df8cb8bfe725c0bc8576ef1'

    }
    //this test will fail becuase of user id is not added here
    test('one blog added succefully', async() => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const titles = response.body.map(r => r.title)
        expect(response.body.length).toBe(listHelper.initialBlogs.length + 1)
        expect(titles).toContain('async and test')
    })
})
   
describe('when there is initially one user at db', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret',10)
    const user = new User({ username: 'root',name:'manager root', passwordHash })
    await user.save()
    
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await listHelper.usersInDb()
    
    const newUser ={
      username: 'ali',
      name: 'Ali hsan',
      password:'sad12345'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await listHelper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart =  listHelper.usersInDb()
    
    const newUser ={
      username: 'root',
      name: 'Superuser',
      'password':'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    //const usersAtEnd = await listHelper.usersInDb()
    //expect(usersAtEnd.length).toBe(usersAtStart.length+1)
  })
})
 afterAll(async () => {
      await mongoose.connection.close()
    })