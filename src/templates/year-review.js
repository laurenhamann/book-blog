import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

import { PieChart } from "../components/pie-chart"

const YearReview = ({
  data: { site, allMarkdownRemark },
  location,
  pageContext,
}) => {
  const [year, setYear] = React.useState(pageContext.year)
  const siteTitle = site.siteMetadata?.title || `Title`
  const posts = allMarkdownRemark.nodes
  // Filter Posts only with year matching state.year
  let filteredPosts = []
  let final = []
  posts.filter(y => {
    if (y.frontmatter.date === year.toString()) {
      filteredPosts.push(y)
      return y
    }
  })
  // let count = 0
  // const lengthshortened = tags.length - 2
  // const length = tags.length - 1
  // let uniquearr = [...new Set(tags)]
  // uniquearr.forEach(t => {
  //   tags.filter((d, index2) => {
  //     if (index2 <= lengthshortened) {
  //       if (t === d) {
  //         count = count + 1
  //       } else {
  //       }
  //     } else if (index2 === length) {
  //       final.push({
  //         name: t,
  //         count: count,
  //       })
  //       count = 0
  //     }
  //   })
  // })
  // final.sort((a, b) => b.count - a.count)
  // 1. Get count of books read
  console.log(final)
  const booksRead = filteredPosts.length

  // 2b. Assign Type to chart Fiction Versus NonFiction
  let fictioncount = 0
  let nonfictioncount = 0
  filteredPosts.map((t, i) => {
    if (t.frontmatter.type === "Fiction") {
      fictioncount = fictioncount + 1
    } else if (t.frontmatter.type === "Nonfiction") {
      nonfictioncount = nonfictioncount + 1
    }
    return t
  })

  const fictionversusNon = [
    { name: "Fiction", count: fictioncount },
    { name: "Nonfiction", count: nonfictioncount },
  ]

  // const FictionVersusNon = final.map((t, i) => {
  //   if (t.name === "Fiction" || t.name === "Nonfiction") {
  //     console.log(t)
  //     fictionversusNon.push(t)
  //   }
  // })

  // 3. Get Tags for each Fiction / NonFiction
  let fictionTags = []
  let nonFictionTags = []
  const pushTagsPerType = filteredPosts.map((ficTag, index) => {
    if (ficTag.frontmatter.type === "Fiction") {
      ficTag.frontmatter.tags.forEach(tag => fictionTags.push(tag))
    } else if (ficTag.frontmatter.type === "Nonfiction") {
      ficTag.frontmatter.tags.forEach(tag => nonFictionTags.push(tag))
    }
    return ficTag
  })

  //3a. Get Tag counts
  // 3a1. Fiction tags
  let fictionTagCount = 0
  let finalFictionCount = []
  const lengthshortened = fictionTags.length - 2
  const length = fictionTags.length - 1
  let uniquearr = [...new Set(fictionTags)]
  uniquearr.forEach(t => {
    fictionTags.filter((d, index2) => {
      if (index2 <= lengthshortened) {
        if (t === d) {
          fictionTagCount = fictionTagCount + 1
        } else {
        }
      } else if (index2 === length) {
        finalFictionCount.push({
          name: t,
          count: fictionTagCount,
        })
        fictionTagCount = 0
      }
      return d
    })
  })
  finalFictionCount.sort((a, b) => b.count - a.count)
  // 3a2. NonFiction tags
  let nonfictionTagCount = 0
  let finalNonFictionCount = []
  const lengshortened = nonFictionTags.length - 2
  const leng = nonFictionTags.length - 1
  let uniarr = [...new Set(nonFictionTags)]
  uniarr.forEach(t => {
    nonFictionTags.filter((d, index2) => {
      if (index2 <= lengshortened) {
        if (t === d) {
          nonfictionTagCount = nonfictionTagCount + 1
        } else {
        }
      } else if (index2 === leng) {
        finalNonFictionCount.push({
          name: t,
          count: nonfictionTagCount,
        })
        nonfictionTagCount = 0
      }
    })
  })
  finalNonFictionCount.sort((a, b) => b.count - a.count)

  // 4. Transmitt to Bar Chart
  return (
    <Layout location={location} title={siteTitle}>
      <h2> {year} in Review </h2>
      <h4>
        In {year} I read {booksRead} books
      </h4>
      <p>
        Of these {booksRead} books,
        <PieChart
          array={fictionversusNon}
          booksRead={booksRead}
          title="Fiction vs. NonFiction"
        />
      </p>
    </Layout>
  )
}

export default YearReview

export const pageQuery = graphql`
  query MyQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      nodes {
        frontmatter {
          title
          date(formatString: "yyyy")
          author
          tags
          type
          rating
          narrator
          narrators
        }
      }
    }
  }
`
