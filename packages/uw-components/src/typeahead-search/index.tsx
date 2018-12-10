// tslint:disable:no-any
import * as React from "react"
import {Downshift} from "@uw/hoc"
import {SearchInput, ActionButton, SearchResultsMenu} from "./downshift-components"
import * as Styled from "./typeahead-search.css"

interface TypeAheadSearchProps {
  fetchSuggests: (suggest: string) => void
  inputValue: string
  items: string[]
  loading: boolean
  onSelect: (item: string) => void
}

export class TypeAheadSearch extends React.PureComponent<TypeAheadSearchProps> {
  render() {
    const {fetchSuggests, inputValue, items = [], onSelect} = this.props
    return (
      <Styled.TypeAheadSearch reveal={true}>
        <Downshift
          initialInputValue={inputValue}
          onInputValueChange={fetchSuggests}
          onChange={(selection: any) => selection && onSelect(selection)}
        >
          <div style={{position: "relative"}}>
            <SearchInput inputValue={inputValue} />
            <ActionButton />
          </div>
          <SearchResultsMenu items={items} />
        </Downshift>
      </Styled.TypeAheadSearch>
    )
  }
}
