import * as React from "react"
import Layout from "@/components/Layout"
import { graphql } from "gatsby"
import PortableText from "@sanity/block-content-to-react"
import { Container } from "@chakra-ui/layout"
import Seo from "@/components/Seo"
import serializers from "@/lib/sanity/serializers"
import fbTrack from "@/util/fbTrack"

const FAQ = ({ data }) => {
  const { title, _rawBody } = data.sanityFaq

  fbTrack("track", "PageView")

  return (
    <Layout>
      <Seo title={title} />
      <Container>
        <PortableText blocks={_rawBody} serializers={serializers} />
      </Container>
    </Layout>
  )
}

export const data = graphql`
  {
    sanityFaq {
      title
      _rawBody
    }
  }
`

export default FAQ
