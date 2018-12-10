import * as React from "react"
import * as Styled from "./navigation-search.css"
import {fromCharCode} from "@uw/utils"

interface NavigationSearchProps {
  cancel: () => void
  searchCategories: (term: string) => void
}

export class NavigationSearch extends React.PureComponent<NavigationSearchProps> {
  // @ts-ignore
  private input: HTMLInputElement | null

  componentDidMount() {
    this.focus()
  }

  clear = () => {
    if (this.input) {
      this.input.value = ""
    }
  }

  focus = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  // tslint:disable-next-line:no-any
  onChange = (e: any) => {
    const {searchCategories} = this.props
    const value = e.target.value
    searchCategories(value)
  }

  render() {
    const {cancel} = this.props
    return (
      <Styled.NavigationSearch>
        <Styled.InputContainer>
          <div className="u1f400" onClick={this.focus}>
            <input
              onChange={this.onChange}
              placeholder="search..."
              ref={ref => (this.input = ref)}
              type="text"
            />
            <span className="u2400" onClick={cancel}>
              {fromCharCode("2612")}
            </span>
          </div>
        </Styled.InputContainer>
      </Styled.NavigationSearch>
    )
  }
}
