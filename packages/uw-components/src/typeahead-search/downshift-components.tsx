// tslint:disable:no-any
import * as React from "react"
import {DownshiftInput, DownshiftButton, DownshiftItem, withDownshift} from "@uw/hoc"
import * as Styled from "./typeahead-search.css"

export const Menu = React.forwardRef((props, ref) => <Styled.BaseMenu innerRef={ref} {...props} />)

export const ArrowIcon = ({isOpen}: any) => {
  return (
    <svg
      viewBox="0 0 20 20"
      preserveAspectRatio="none"
      width={16}
      fill="transparent"
      stroke="#979797"
      strokeWidth="1.1px"
      transform={isOpen ? "rotate(180)" : undefined}
    >
      <path d="M1,6 L10,15 L19,6" />
    </svg>
  )
}

export const XIcon = () => (
  <svg
    viewBox="0 0 20 20"
    preserveAspectRatio="none"
    width={12}
    fill="transparent"
    stroke="#979797"
    strokeWidth="1.1px"
  >
    <path d="M1,1 L19,19" />
    <path d="M19,1 L1,19" />
  </svg>
)

export const ActionButton = withDownshift(
  // @ts-ignore
  ({downshift: {selectedItem, isOpen, clearSelection}}) =>
    selectedItem ? (
      <Styled.ControllerButton onClick={clearSelection} aria-label="clear selection">
        <XIcon />
      </Styled.ControllerButton>
    ) : (
      <DownshiftButton component={Styled.ControllerButton}>
        <ArrowIcon isOpen={isOpen} />
      </DownshiftButton>
    ),
)

export const SearchInput = withDownshift(
  // @ts-ignore
  ({inputValue: string, downshift: {isOpen}}) => (
    <DownshiftInput component={Styled.Input} placeholder="Enter search phrase" isOpen={isOpen} />
  ),
)

export const SearchResultsMenu = withDownshift(
  ({
    items,
    downshift: {inputValue, isOpen, highlightedIndex, selectedItem, itemToString},
  }: {
    items: string[]
    downshift: any
  }) => (
    // @ts-ignore
    <Menu isOpen={isOpen}>
      {items.length > 0 &&
        items.map(
          (item, index) =>
            isOpen && inputValue ? (
              <DownshiftItem
                component={Styled.Item}
                key={item}
                item={item}
                index={index}
                isActive={highlightedIndex === index}
                isSelected={selectedItem === item}
              >
                {itemToString(item)}
              </DownshiftItem>
            ) : (
              undefined
            ),
        )}
      {isOpen && !inputValue && <Styled.Item disabled>Please enter a search query</Styled.Item>}
    </Menu>
  ),
)
