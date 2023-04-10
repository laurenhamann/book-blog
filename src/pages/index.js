import React from "react"
import { graphql } from "gatsby"
import "../sass/styles.scss"
import Seo from "../components/seo"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Profile from "../components/profile"
import Login from "../components/login"
import BlogIndex from "./blog-index"
import PrivateRoute from "../components/private-route"

const App = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  return (
    <Layout location={location} title={siteTitle}>
      <Router basepath="/">
        <PrivateRoute path="/app/profile" component={Profile} />
        <Login path="/app/login" />
        <BlogIndex path="/" title={siteTitle} />
      </Router>
    </Layout>
  )
}

export default App

export const Head = () => <Seo title="All posts" />

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
      }
    }
  }
`
