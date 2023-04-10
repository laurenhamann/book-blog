export function queryBooks(blogs, query, asideVersion, setPosts, cb) {
  console.log("ran")
  let list = []
  blogs.map(blog => {
    if (asideVersion === "favorites") {
      blog.tags.filter(tag => {
        if (query === tag && blog.score !== null) {
          list.push(blog)
        }
      })
    } else if (asideVersion === "tags") {
      blog.tags.filter(tag => {
        if (query === tag) {
          list.push(blog)
        }
      })
    } else if (asideVersion === "rating") {
      if (blog.rating === query) {
        list.push(blog)
      }
    } else if (asideVersion === "narrator") {
      if (
        blog.narrator !== null &&
        blog.narrator.toLowerCase().includes(query.toLowerCase())
      ) {
        list.push(blog)
      } else if (blog.narrators !== null) {
        blog.narrators.map(e => {
          if (e.toLowerCase().includes(query.toLowerCase())) {
            list.push(blog)
          }
        })
      }
    } else if (asideVersion === "superlatives") {
      if (blog.superlative !== null) {
        if (blog.superlative.toLowerCase().includes(query.toLowerCase())) {
          list.push(blog)
        }
      }
    } else if (asideVersion === "type") {
      if (blog.type === query) {
        list.push(blog)
      }
    } else {
      if (
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        (blog.author &&
          blog.author.toLowerCase().includes(query.toLowerCase())) ||
        (blog.tags &&
          blog.tags.join("").toLowerCase().includes(query.toLowerCase()))
      ) {
        list.push(blog)
      }
    }
  })
  setPosts(list)
  cb(list)
}
