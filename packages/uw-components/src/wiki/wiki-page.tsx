// tslint:disable:no-any
import * as React from "react"
// import {fromCharCode} from "@uw/utils"
import * as Styled from "./wiki.css"
import {WikiPage} from "@uw/domain"

type WikiTitleProps = {
  close: () => void
  loading: boolean
  title: string
}

export const WikiTitle = ({close, loading, title}: WikiTitleProps) => (
  <Styled.Title expand={true}>
    <div>
      <button onClick={close}>X</button>
      {loading ? <span>Loading...</span> : <span>{title}</span>}
    </div>
  </Styled.Title>
)

type WikiProps = {
  content: WikiPage | undefined
  loading: boolean
}

export class Wiki extends React.PureComponent<WikiProps> {
  componentWillMount() {
    setTimeout(() => {
      document.body.classList.toggle("is-locked", true)
    }, 1500)
  }
  componentWillUnmount() {
    document.body.classList.toggle("is-locked", false)
  }

  render() {
    const {content, loading} = this.props
    return (
      <Styled.WikiPage className="wiki" expand={!loading}>
        {content && <div dangerouslySetInnerHTML={{__html: parse(content.text)}} />}
      </Styled.WikiPage>
    )
  }
}

const parse = (text: string) => {
  const node = htmlParser(text)
  const children = Array.from(node.childNodes)
  let src = ""
  children.forEach(node => {
    if (node.nodeType === 1) {
      // removeStyleAttr(node)
      // @ts-ignore
      src += `<div>${node.outerHTML}</div>`
    }
  })
  return src
}

const htmlParser = (htmlString: string) => {
  let docfrag = document.createDocumentFragment()
  const div = document.createElement("DIV")
  div.innerHTML = htmlString
  while (div.childNodes[0]) {
    docfrag.appendChild(div.childNodes[0])
  }
  return docfrag
}

const removeStyleAttr = (node: any) => {
  if (node.removeAttribute) {
    node.removeAttribute("style")
  }
  node = node.firstChild
  while (node) {
    removeStyleAttr(node)
    node = node.nextSibling
  }
}
