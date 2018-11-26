// tslint:disable:no-any
import * as React from "react"
import {SearchHit, WikiPage} from "@uw/domain"
import * as Styled from "./wiki.css"

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
    const searchHits = parseSearchHits(content)
    const text = content && content.text
    return (
      <Styled.WikiPage className="wiki" expand={!loading}>
        <div>
          {text && <div dangerouslySetInnerHTML={{__html: `${parsePage(text)}`}} />}
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

const parsePage = (text: string) => {
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

const htmlParser = (htmlString: string) => {
  let docfrag = document.createDocumentFragment()
  const div = document.createElement("DIV")
  div.innerHTML = htmlString
  while (div.childNodes[0]) {
    docfrag.appendChild(div.childNodes[0])
  }
  return docfrag
}
