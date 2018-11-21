import * as React from "react"
import {Route, withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import Waypoint from "react-waypoint"
import {BlockTitle, LoadingContainer, ProgessLoader} from "@uw/components"
import {CodepointHexRange, CodepointDocument, Link} from "@uw/domain"
import {ApplicationState, fetchCodepoints, fetchCodepointsByCategory, followLink} from "@uw/store"
import {CodepointContainerProps, OtherProps, InstanceState} from "./types"
import {CodepointWikiContainer} from "../codepoint-wiki"

class CodepointContainer extends React.PureComponent<CodepointContainerProps & OtherProps> {
  state: InstanceState = {
    currentCard: undefined,
    currentPage: -1,
  }

  static getDerivedStateFromProps(
    nextProps: CodepointContainerProps & OtherProps,
    prevState: InstanceState,
  ) {
    const codepoints = nextProps.codepoints.result
    const state = {}
    if (codepoints && codepoints.docs.length && codepoints.page !== prevState.currentPage) {
      Object.assign(state, {
        currentPage: codepoints.page,
      })
    }
    return state
  }

  componentDidMount() {
    this.fetchCodepoints()
  }

  componentDidUpdate(prevProps: OtherProps) {
    const {match} = prevProps
    const {params} = match
    let {key} = params

    if (key && this.props.match.params.key !== key) {
      this.fetchCodepoints()
    }
  }

  fetchNextCodepoints = () => {
    const {codepoints, followLink, loader} = this.props
    const {loading} = loader
    const {result} = codepoints
    if (!loading && result && this.state.currentPage !== result.nextPage) {
      const nextUrl = result._links!.filter((link: Link) => link.rel === "next")[0]
      this.setState(
        {
          currentPage: result.nextPage,
        },
        () => followLink(nextUrl),
      )
    }
  }

  fetchCodepoints = () => {
    const {location, match, range} = this.props
    const {search} = location
    const {params} = match
    const {category, key, urlRange} = params
    let propsRange: CodepointHexRange | string = range || "0000"
    if (category) {
      window.scrollTo(0, 0)
      this.props.fetchCodepointsByCategory(category, key, search)
    } else if (urlRange || typeof propsRange === "string") {
      this.props.fetchCodepoints(`${urlRange || propsRange.toString()}`, search)
    } else {
      this.props.fetchCodepoints(`${propsRange.from}:${propsRange.to || undefined}`, search)
    }
  }

  onCardClick = (cp: string) => {
    const {match, push} = this.props
    const {params} = match
    const {category, key} = params
    const url = `/c/${category}/${key}/${cp}`
    this.setState(
      {
        showDetail: true,
      },
      () => push(url),
    )
  }

  renderWaypoint = () => {
    const {codepoints, loader} = this.props
    if (codepoints.result && codepoints.result.hasNextPage) {
      const LoadingComponent = this.props.loadingComponent
      return (
        <Waypoint
          bottomOffset={50}
          onEnter={({previousPosition}: Waypoint.CallbackArgs) => {
            if (previousPosition === Waypoint.below) {
              this.fetchNextCodepoints()
            }
          }}
          key={codepoints.result.page}
        >
          {loader.loading && (
            <div>
              <LoadingComponent />
            </div>
          )}
        </Waypoint>
      )
    }
    return undefined
  }

  renderCodepoints = () => {
    const {codepoints} = this.props
    let categoryTile = ""
    let renderTitle = false
    if (codepoints.result) {
      const CardComponent = this.props.cardComponent
      const renderedCodepoints = codepoints.result.docs.map(
        (codepoint: CodepointDocument, index: number) => {
          const thisTitle = codepoint["block"].value
          if (thisTitle !== categoryTile) {
            categoryTile = thisTitle
            renderTitle = true
          } else {
            renderTitle = false
          }
          const key = `${codepoint.cp}:${index}`
          return (
            <React.Fragment key={`fragment:${key}`}>
              {renderTitle && <BlockTitle key={categoryTile} title={categoryTile} />}
              <CardComponent
                codepoint={codepoint}
                key={key}
                onClick={this.onCardClick.bind(undefined, codepoint.cp)}
              />
            </React.Fragment>
          )
        },
      )
      const waypoint = this.renderWaypoint()
      return [renderedCodepoints, waypoint]
    }
    return undefined
  }

  render() {
    const {codepoints, loader, match} = this.props
    const {result} = codepoints
    const children = this.renderCodepoints()
    const loading = loader.loading
    const selectedCodepoint = ((match.params.cp && result && result.docs) || []).filter(
      (codepoint: CodepointDocument) => codepoint.cp === match.params.cp,
    )

    return (
      <React.Fragment>
        {loading && <ProgessLoader />}
        <LoadingContainer loading={loading} visible={selectedCodepoint.length === 0}>
          {children}
        </LoadingContainer>
        <Route
          path="/c/:category/:key/:cp"
          render={props => {
            return <CodepointWikiContainer codepoint={selectedCodepoint && selectedCodepoint[0]} />
          }}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    codepoints: state.codepoints,
    loader: state.loader,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCodepoints: (range?: string, search?: string) => dispatch(fetchCodepoints(range, search)),
  fetchCodepointsByCategory: (category: string, key: string, search?: string) =>
    dispatch(fetchCodepointsByCategory(category, key, search)),
  followLink: (link: Link) => dispatch(followLink(link)),
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(CodepointContainer)

export default withRouter<OtherProps>(connected)
