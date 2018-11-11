const uuid = require('uuid/v4')
const fs = require('fs')

function getAll(limit) {
  const posts = JSON.parse(fs.readFileSync('data/posts.json'))
  return limit ? posts.slice(0, limit) : posts
}


function getOne(id) {
  const posts = JSON.parse(fs.readFileSync('data/posts.json'))
  const errors = []

  const postWithId = posts.find(post => post.id === id)

  if (!postWithId) {
    errors.push('Post not found')
    return { errors }
  }

  return postWithId
}


function create({ title, date, content }) {
  const posts = JSON.parse(fs.readFileSync('data/posts.json'))
  const errors = []

  if (!title || title.length > 50) {
    errors.push('Title is missin or title is longer than 50 characters')
    return { errors }
  }

  if (!date) {
    errors.push('Date is required')
    return { errors }
  }

  if (!content) {
    errors.push('Content is required')
    return { errors }
  }

  const newPost = {
    id: uuid(),
    title,
    date,
    content
  }

  posts.push(newPost)

  const postsJSON = JSON.stringify(posts, null, 4)
  fs.writeFileSync('data/posts.json', postsJSON)

  return newPost
}


function update(id, { title, date, content }) {
  const posts = JSON.parse(fs.readFileSync('data/posts.json'))
  const errors = []

  const postWithId = posts.find(post => post.id === id)

  if (!postWithId) {
    errors.push('Post not found')
    return { status: 404, errors }
  }

  if (!title && !date && !content) {
    errors.push('Please enter updated information')
    return { status: 400, errors }
  }

  if (title.length > 50) {
    errors.push('Title is longer than 50 characters')
    return { status: 400, errors }
  }

  if (title) {
    postWithId.title = title
  }

  if (date) {
    postWithId.date = date
  }

  if (content) {
    postWithId.content = content
  }
  
  const postsJSON = JSON.stringify(posts, null, 4)
  fs.writeFileSync('data/posts.json', postsJSON)

  return postWithId
}

function remove(id) {
  const posts = JSON.parse(fs.readFileSync('data/posts.json'))
  const errors = []

  const postWithId = posts.find(post => post.id === id)

  if (!postWithId) {
    errors.push('Post not found')
    return { errors }
  }

  postIdx = posts.indexOf(postWithId)
  posts.splice(postIdx, 1)

  const postsJSON = JSON.stringify(posts, null, 4)
  fs.writeFileSync('data/posts.json', postsJSON)

  return postWithId
}


module.exports = { getAll, getOne, create, update, remove }