import S from "@sanity/desk-tool/structure-builder"
import { FaQuestionCircle } from "react-icons/fa"

const hiddenDocTypes = listItem => !["faq"].includes(listItem.getId())

export default () =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("FAQ")
        .icon(FaQuestionCircle)
        .child(S.editor().id("faq").schemaType("faq").documentId("faq")),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
