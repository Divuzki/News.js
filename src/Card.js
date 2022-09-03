import React from "react"

const Card = ({post}) => {
    return (
<div className="max-w-2xl my-2 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800" style={{cursor: "auto"}}>
  <div className="flex items-center justify-between">
    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{post.publishedAt}</span> 
    <a href="#name" className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">{post.source.name}</a>
  </div> 
  <div className="mt-2">
    <a href={post.url} className="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{post.title}</a> 
    <p className="mt-2 text-gray-600 dark:text-gray-300">{post.description}</p>
  </div> 
  <div className="flex items-center justify-between mt-4">
    <a href="#something" className="text-blue-600 dark:text-blue-400 hover:underline">Read more ⟶</a> 
    <div className="flex items-center">
      <img src={post.urlToImage} alt="Author" className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" /> 
      <a href="#name" className="font-bold text-gray-700 cursor-pointer dark:text-gray-200">{post.author}</a>
    </div>
  </div>
</div>
    )
}
export default Card