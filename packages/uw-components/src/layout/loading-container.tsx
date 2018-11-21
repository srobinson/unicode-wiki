// tslint:disable:no-any
import * as React from "react"
import * as Styled from "./loading-container.css"

export class LoadingContainer extends React.PureComponent<LoadingContainerProps> {
  render() {
    const {children, loading, visible} = this.props
    return (
      <Styled.LoadingContainer loading={loading} visible={visible}>
        {children}
      </Styled.LoadingContainer>
    )
  }
}

interface LoadingContainerProps {
  children: any
  loading: boolean
  visible: boolean
}

export default LoadingContainer
