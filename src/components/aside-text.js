import { filter } from "./filter"

export function asideTexts(asideVersion, blogs, cb) {
  let authors = []
  let tags = []
  let narrators = []
  let rating = []
  let superlatives = []
  let type = []
  console.log(blogs)
  blogs.map(b => {
    authors.push(b.author)
    rating.push(b.rating)
    type.push(b.type)

    if (b.superlative) {
      superlatives.push(b.superlative)
    }
    if (Array.isArray(b.tags)) {
      b.tags.forEach(element => {
        tags.push(element)
      })
    }
    if (Array.isArray(b.narrators)) {
      b.narrators.forEach(el => {
        narrators.push(el)
      })
    } else {
      narrators.push(b.narrator)
    }
  })

  if (asideVersion === "author") {
    let finalArray
    filter(authors, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  } else if (asideVersion === "narrator") {
    let finalArray
    filter(narrators, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  } else if (asideVersion === "type") {
    let finalArray
    filter(type, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  } else if (asideVersion === "superlatives") {
    let finalArray
    filter(superlatives, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  } else if (asideVersion === "rating") {
    let finalArray
    filter(rating, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  } else if (asideVersion === "tags" || asideVersion === "favorites") {
    let finalArray
    filter(tags, function callback(filteredArray) {
      finalArray = filteredArray
    })
    cb(finalArray)
  }
}
