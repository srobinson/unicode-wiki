import * as React from "react"
import * as Styled from "./navigation-search.css"

interface NavigationSearchProps {
  searchCategories: (term: string) => void
}

export class NavigationSearch extends React.PureComponent<NavigationSearchProps> {
  // @ts-ignore
  private input: HTMLInputElement | null

  componentDidMount() {
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
    return (
      <Styled.NavigationSearch>
        <Styled.InputContainer>
          <div className="uf000">
            <input
              type="text"
              ref={ref => (this.input = ref)}
              placeholder="search..."
              onChange={this.onChange}
            />
          </div>
        </Styled.InputContainer>
      </Styled.NavigationSearch>
    )
  }
}
