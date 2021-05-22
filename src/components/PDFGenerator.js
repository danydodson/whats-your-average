import * as React from "react"
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
})

const PDFGenerator = ({ ticker, average }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text>{ticker}</Text>
        </View>
        <View style={styles.section}>
          <Text>{average}</Text>
        </View>
      </Page>
    </Document>
  )
}

export default PDFGenerator
