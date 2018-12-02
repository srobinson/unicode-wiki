// tslint:disable:no-any
import * as React from "react"
import {SearchHit, WikiPage} from "@uw/domain"
import * as Styled from "./wiki.css"
import {generateClassName, fromCharCode} from "@uw/utils"

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
  cp: string
  loading: boolean
  title: string | undefined
}

export class Wiki extends React.PureComponent<WikiProps> {
  componentDidMount() {
    document.body.classList.toggle("is-locked", true)
  }

  componentWillUnmount() {
    document.body.classList.toggle("is-locked", false)
  }

  render() {
    const {content, cp, loading, title} = this.props
    const text = content && content.text
    const className = generateClassName(cp)
    const searchHits = parseSearchHits(content)
    return (
      <Styled.WikiPage className="wiki content" expand={!loading && text}>
        <div className={className}>
          <Styled.CodepointContainer>
            <h2>{title}</h2>
            <Styled.Codepoint>
              <span>{fromCharCode(cp)}</span>
            </Styled.Codepoint>
          </Styled.CodepointContainer>
          <Styled.Iframe
            height="100%"
            onLoad={resizeIframe.bind(this)}
            srcDoc={text}
            scrolling="no"
          />
          {searchHits && (
            <Styled.SearchHits>
              <h2>Similar Pages</h2>
              {searchHits}
            </Styled.SearchHits>
          )}
        </div>
      </Styled.WikiPage>
    )
  }
}

function resizeIframe(iframe: any) {
  iframe.target.height = iframe.target.contentWindow.document.body.scrollHeight + 50 + "px"
}

const parseSearchHits = (content: WikiPage | undefined) =>
  (content &&
    content.search &&
    content.search.hits.map((hit: SearchHit) => (
      <Styled.SearchHit key={hit.title}>
        <a target="_blank" href={`https://en.wikipedia.org/wiki/${hit.title}`}>
          {hit.title}
        </a>
        {/* replace dodgy unicode character (Private Use Area: \uE000\u20\uE001) in highlight text */}
        {hit.highlight && (
          <blockquote>
            <div
              dangerouslySetInnerHTML={{
                __html: `... ${hit.highlight.toString().replace(/[|]/g, "")} ...`,
              }}
            />
          </blockquote>
        )}
      </Styled.SearchHit>
    ))) ||
  undefined

export const parseHtml = (text: string) => {
  const node = htmlParser(text)
  const children = Array.from(node.childNodes)
  let src = ""
  children.forEach(node => {
    if (node.nodeType === 1) {
      // @ts-ignore
      src += `<div>${node.outerHTML}</div>`
    }
  })
  return src
}

export const htmlParser = (htmlString: string) => {
  let docfrag = document.createDocumentFragment()
  const div = document.createElement("DIV")
  div.innerHTML = htmlString
  while (div.childNodes[0]) {
    docfrag.appendChild(div.childNodes[0])
  }
  return docfrag
}
