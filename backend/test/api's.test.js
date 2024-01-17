const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const should = chai.should()
const app = require('../index')
const { it, after, before, beforeEach } = require('mocha')
const tough = require('tough-cookie');
const connectToMongoDB = require('../database/connectToMongoDB')
const Users = require('../models/userSchema')
const Blogs = require('../models/blogSchema')
const axios = require('axios').default
const mongoose = require('mongoose')

const cookieJar = new tough.CookieJar();
let token = ''

chai.use(chaiHttp)


describe('Api test cases', () => {

    before(async () => {
        // Connecting to MongoDB
        await connectToMongoDB()
        await Users.deleteMany({})
        await Blogs.deleteMany({})
    }, 5000)


    // { /user/signup api test case }
    it('User should be able to signup to the application', async () => {
        const response = await axios.post('https://blog-app-backend-9a12.onrender.com/user/signup', {
            username: 'SeetaRam.k',
            email: 'user3@gmail.com',
            password: 'User@12345',
            likedBlogs: []
        })
        expect(response.data.msg).to.be.equal('Registered SuccessFully')
    })


    // { /user/login api test case}
    it('User should be able to login in to the application', async () => {
        const response = await axios.post('https://blog-app-backend-9a12.onrender.com/user/login', {
            email: 'user3@gmail.com',
            password: 'User@12345'
        }, {
            jar: cookieJar,
            withCredentials: true,
        })

        const cookies = response.headers['set-cookie'];
        if (cookies) {
            const tokenCookie = cookies.find(cookie => cookie.includes('jwtToken'));
            if (tokenCookie) {
                token = tokenCookie.split(';')[0].split('=')[1];
            }
        }

        // Use the cookieJar to manually set the cookies for subsequent requests
        cookieJar.setCookieSync(response.headers['set-cookie'][0], 'https://blog-app-backend-9a12.onrender.com');

        expect(response.data.msg).to.be.equal('Login SuccessFul')
    })


    // { /blog/create api test case}
    it('User should be able to create a blog', async () => {
        const response = await axios.post('https://blog-app-backend-9a12.onrender.com/blog/create', {
            title: 'TestingBlog',
            aboutBlog: 'TesingAboutBlog',
            ownerId: ''
        },
            {
                headers: {
                    'Cookie': `jwtToken=${token}`
                }
            }
        )

        response.should.have.status(200)
        expect(response.data.msg).to.be.equal('Published SuccessFully')
    })


    // { /blog/edit api test case}
    it('User should be able to edit the blog', async () => {

        const blogsResponse = await axios.get('https://blog-app-backend-9a12.onrender.com/blog/getallblogs', {
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        const allBlogs = blogsResponse.data.msg
        const response = await axios.put('https://blog-app-backend-9a12.onrender.com/blog/edit', {
            title: 'TestingBlog Edited',
            aboutBlog: 'TesingAboutBlog Edited',
            blogId: allBlogs[0]._id
        },
            {
                headers: {
                    'Cookie': `jwtToken=${token}`
                }
            }
        )

        response.should.have.status(200)
        expect(response.data.msg).to.be.equal('Edit SuccessFul')
    })


    // { /blog/getallblogs api test case}
    it('User should be able to get all the blogs', async () => {

        const blogsResponse = await axios.get('https://blog-app-backend-9a12.onrender.com/blog/getallblogs', {
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        blogsResponse.should.have.status(200)
        expect(blogsResponse.data.msg.length).to.be.greaterThan(0)
    })



    // { /blog/browseblogs api test case}
    it('User should be able to get all the blogs to browse', async () => {

        const blogsResponse = await axios.get('https://blog-app-backend-9a12.onrender.com/blog/browseblogs', {
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        blogsResponse.should.have.status(200)
        expect(blogsResponse.data.msg.length).to.be.greaterThanOrEqual(0)
    })



    // { /blog/getblogbyid api test case}
    it('User should be able to get the blog by blogId', async () => {

        const blogsResponse = await axios.get('https://blog-app-backend-9a12.onrender.com/blog/getallblogs', {
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        const blog = blogsResponse.data.msg

        const response = await axios.post('https://blog-app-backend-9a12.onrender.com/blog/getblogbyid', {
            blogId: blog[0]._id
        },
            {
                headers: {
                    'Cookie': `jwtToken=${token}`
                }
            })

        response.should.have.status(200)
        // expect(response.data.msg.blog.title).to.be.equal('TestingBlog Edited')
    })


    // { /blog/delete api test case}
    it('User should be able to delete the blog', async () => {

        const blogsResponse = await axios.get('https://blog-app-backend-9a12.onrender.com/blog/getallblogs', {
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        const allBlogs = blogsResponse.data.msg

        const response = await axios.delete('https://blog-app-backend-9a12.onrender.com/blog/delete', {
            data: {
                blogId: allBlogs[0]._id
            },
            headers: {
                'Cookie': `jwtToken=${token}`
            }
        })

        response.should.have.status(200)
        // expect(response.data.msg).to.be.equal('Deletion SuccessFul')
    })
})