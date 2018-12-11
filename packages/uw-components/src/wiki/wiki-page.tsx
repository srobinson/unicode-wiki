// tslint:disable:no-any
import * as React from "react"
import {SearchHit, WikiPage} from "@uw/domain"
import * as Styled from "./wiki.css"
import {generateClassName, fromCharCode} from "@uw/utils"
import {ProgressLoader} from "../loader/progress-loader.css"

type WikiTitleProps = {
  close: () => void
  loading: boolean
  title: string
}

export const WikiTitle = ({close, loading, title}: WikiTitleProps) => (
  <Styled.Title>
    <div>
      <button onClick={close}>X</button>
      {loading ? <span>Loading...</span> : <span>{title}</span>}
    </div>
  </Styled.Title>
)

type WikiProps = {
  content: WikiPage | undefined
  cp: string
}

interface InternalState {
  loading: boolean
}

export class Wiki extends React.PureComponent<WikiProps> {
  state: InternalState = {
    loading: true,
  }

  componentDidUpdate() {
    const {content, cp} = this.props
    if (content && content.cp === cp) {
      setTimeout(
        () =>
          this.setState({
            loading: false,
          }),
        3500,
      )
    }
  }

  componentWillUnmount() {
    document.body.classList.toggle("is-locked", false)
  }

  render() {
    const {loading} = this.state
    const {content, cp} = this.props
    const text = content && content.text
    const className = generateClassName(cp)
    const searchHits = parseSearchHits(content)
    return (
      <Styled.WikiPage className="wiki">
        <div>
          <Styled.CodepointContainer>
            <Styled.Codepoint>
              <span className={className}>{fromCharCode(cp)}</span>
            </Styled.Codepoint>
          </Styled.CodepointContainer>
          {loading && (
            <React.Fragment>
              <ProgressLoader
                style={{
                  position: "static",
                }}
              />
              <p>Loading wikipedia...</p>
            </React.Fragment>
          )}
          {content &&
            content.cp === cp && (
              <Styled.Iframe onLoad={resizeIframe.bind(this)} srcDoc={text} scrolling="auto" />
            )}
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

export function resizeIframe(iframe: any) {
  const f = iframe.target
  if (f) {
    setTimeout(() => (f.height = f.contentWindow.document.body.scrollHeight + 50 + "px"), 2000)
  }
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
