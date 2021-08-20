import axios from 'axios'

const  API=axios.create({ baseURL : 'http://localhost:5000'})

const url='http://localhost:5000/posts'
// export const fetchPosts=()=>axios.get(url)
// can change above to
export const fetchPosts=()=>API.get('/posts')
export const createPost=(newPost)=>axios.post(url,newPost)
export const updatePost=(id,updatedPost)=>axios.patch(`${url}/${id}`,updatedPost)
export const deletePost=(id)=>axios.delete(`${url}/${id}`)
export const likePost=(id)=>axios.patch(`${url}/${id}/likePost`)

//AUTH
export const signin=(formData)=>API.post('/user/signin',formData)
export const signup=(formData)=>{
    console.log(formData)
axios.post('http://localhost:5000/user/signup',formData)
console.log(formData)
}