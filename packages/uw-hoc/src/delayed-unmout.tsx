import * as React from "react"

export interface UnmountingProps {
  delayTime: number
  isMounted: boolean
}

export const delayUnmounting = <P extends object>(
  Component: React.ComponentType<P>,
  props: UnmountingProps,
) =>
  class extends React.Component<P & UnmountingProps> {
    state = {
      shouldRender: this.props.isMounted,
    }

    componentDidUpdate(prevProps: UnmountingProps) {
      console.log("prevProps.isMounted", prevProps.isMounted)
      console.log("this.props.isMounted", this.props.isMounted)
      if (prevProps.isMounted && !this.props.isMounted) {
        console.log("DELAY")

        setTimeout(() => this.setState({shouldRender: false}), this.props.delayTime)
      } else if (!prevProps.isMounted && this.props.isMounted) {
        this.setState({shouldRender: true})
      }
    }

    render() {
      return this.state.shouldRender ? <Component {...this.props} /> : <div />
    }
  }