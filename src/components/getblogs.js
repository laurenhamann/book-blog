import React from "react"

import useBlogs from "../hooks/use-blogs"

import { filter } from "./filter"

export function GetBlogs(cb) {
  const blogs = useBlogs()
  let narrator = []
  let final
  blogs.map(name => {
    if (name.narrator) {
      narrator.push(name.narrator)
    } else if (Array.isArray(name.narrators)) {
      name.narrators.forEach(element => {
        narrator.push(element)
      })
    }
  })

  filter(narrator, function callback(finalVersion) {
    final = finalVersion
  })

  cb(final)
  return
}
