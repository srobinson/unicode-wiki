// tslint:disable:no-any
// This code was written by Kent C. Dodds
// Feel free to do whatever you like with it
// but please credit the original author :)
import * as React from "react"
// @ts-ignore
import * as hoistNonReactStatics from "hoist-non-react-statics"
import Downshift from "downshift"

const DownshiftContext = React.createContext({})

const DownshiftInput = withDownshift(
  // @ts-ignore
  ({downshift: {getInputProps}, component: Comp = "input", ...rest}) => (
    <Comp {...getInputProps(rest)} />
  ),
)

const DownshiftLabel = withDownshift(
  // @ts-ignore
  ({downshift: {getLabelProps}, component: Comp = "label", ...rest}) => (
    <Comp {...getLabelProps(rest)} />
  ),
)

const DownshiftButton = withDownshift(
  // @ts-ignore
  ({downshift: {getToggleButtonProps}, component: Comp = "button", ...rest}) => (
    <Comp {...getToggleButtonProps(rest)} />
  ),
)

const DownshiftItem = withDownshift(
  // @ts-ignore
  ({downshift: {getItemProps}, component: Comp = "div", ...rest}) => (
    <Comp {...getItemProps(rest)} />
  ),
)

function withDownshift(Component: any) {
  function Wrapper(props: any, ref: any) {
    return (
      <DownshiftContext.Consumer>
        {downshiftContext => <Component downshift={downshiftContext} {...props} ref={ref} />}
      </DownshiftContext.Consumer>
    )
  }
  // @ts-ignore
  Wrapper.displayName = `withDownshift(${Component.displayName || Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}

function DownshiftComps({children, ...rest}: any) {
  return (
    <Downshift {...rest}>
      {downshift => (
        <div>
          <DownshiftContext.Provider value={downshift}>{children}</DownshiftContext.Provider>
        </div>
      )}
    </Downshift>
  )
}

export {
  withDownshift,
  DownshiftLabel,
  DownshiftComps as Downshift,
  DownshiftButton,
  DownshiftInput,
  DownshiftItem,
}
