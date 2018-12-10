import * as React from "react"
import {Route, withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import Waypoint from "react-waypoint"
import {BlockTitle, CodepointList, LoadingContainer, ProgessLoader} from "@uw/components"
import {CodepointDocument, CodepointHexRange, Link} from "@uw/domain"
import {
  ApplicationState,
  fetchCodepoints,
  fetchCodepointsByCategory,
  followLink,
  searchCodepoints,
} from "@uw/store"
import {delayedPush, objectToString} from "@uw/utils"
import {CodepointContainerProps, OtherProps, InstanceState} from "./types"
import {CodepointWikiContainer} from "../wiki"

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
    if (codepoints && codepoints.page !== prevState.currentPage) {
      Object.assign(state, {
        currentPage: codepoints.page,
      })
    }
    return state
  }

  componentDidMount() {
    const {codepoints} = this.props
    if (!codepoints.result) {
      this.fetchCodepoints()
    }
  }

  componentDidUpdate(prevProps: OtherProps) {
    const prevKey = prevProps.match.params.key
    const thisKey = this.props.match.params.key
    const prevSearchQuery = prevProps.location["query"] && prevProps.location["query"].q
    const thisSearchQuery = this.props.location["query"] && this.props.location["query"].q
    if (prevKey !== thisKey || prevSearchQuery !== thisSearchQuery) {
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
    const {location, match} = this.props
    const {pathname, search} = location
    const {params} = match
    const {category, key} = params
    const searchQuery = location["query"]
    if (category) {
      window.scrollTo(0, 0)
      this.props.fetchCodepointsByCategory(category, key, search)
    }
    // check if this is a search query
    else if (pathname === "/search" && searchQuery && searchQuery.q) {
      this.props.searchCodepoints(searchQuery.q)
    }
  }

  onCardClick = (cp: string) => {
    const {location, match, push} = this.props
    const query = location["query"]
    Object.assign(query, {
      cp,
    })
    const queryString = objectToString(query)
    const url = `${match.url}?${queryString}`
    delayedPush(() => push(url), 100)
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
            <div
              style={{
                flex: "100%",
              }}
            >
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
    const {codepoints, loader, location} = this.props
    const {result} = codepoints
    const children = this.renderCodepoints()
    const loading = loader.loading
    const selectedCodepoint =
      location["query"].cp &&
      result &&
      result.docs.filter((codepoint: CodepointDocument) => codepoint.cp === location["query"].cp)[0]

    return (
      <React.Fragment>
        {loading && <ProgessLoader />}
        <LoadingContainer loading={loading} visible={!selectedCodepoint}>
          <CodepointList>{children}</CodepointList>
        </LoadingContainer>
        {location["query"].cp && (
          <Route
            render={() => {
              return <CodepointWikiContainer cp={location["query"].cp} />
            }}
          />
        )}
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
  fetchCodepoints: (ranges?: CodepointHexRange[], search?: string) =>
    dispatch(fetchCodepoints(ranges, search)),
  fetchCodepointsByCategory: (category: string, key: string, search?: string) =>
    dispatch(fetchCodepointsByCategory(category, key, search)),
  followLink: (link: Link) => dispatch(followLink(link)),
  push: (path: string) => dispatch(push(path)),
  searchCodepoints: (q: string) => dispatch(searchCodepoints(q)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(CodepointContainer)

export default withRouter<OtherProps>(connected)
