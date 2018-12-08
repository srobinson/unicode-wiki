// tslint:disable:no-any
import * as React from "react"
import {Downshift} from "@uw/hoc"
import {SearchInput, ActionButton, SearchResultsMenu} from "./downshift-components"
import * as Styled from "./typeahead-search.css"

interface TypeAheadSearchProps {
  fetchSuggests: (suggest: string) => void
  items: string[]
  loading: boolean
  onSelect: (item: string) => void
}

export class TypeAheadSearch extends React.PureComponent<TypeAheadSearchProps> {
  render() {
    const {items = [], onSelect, fetchSuggests} = this.props
    return (
      <Styled.TypeAheadSearch reveal={true}>
        <Downshift
          onInputValueChange={fetchSuggests}
          onChange={(selection: any) => selection && onSelect(selection)}
        >
          <div style={{position: "relative"}}>
            <SearchInput />
            <ActionButton />
          </div>
          <SearchResultsMenu items={items} />
        </Downshift>
      </Styled.TypeAheadSearch>
    )
  }
}
