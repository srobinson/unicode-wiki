import * as React from "react"
import * as Styled from "./bubbles.css"
import {Logo} from "../layout"

export class Bubbles extends React.PureComponent {
  render() {
    return (
      <Styled.Container
        className="asyncImage"
        data-src={`${process.env.PUBLIC_URL}/images/underwater-1.jpg`}
      >
        <Logo
          style={{
            left: "1rem",
          }}
        />
        <Styled.BubblesContainer>
          <Styled.Bubbles
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 701 1024"
            style={{overflow: "visible"}}
          >
            <Styled.BubblesLarge stroke-width="7">
              <g>
                <g transform="translate(10 940)">
                  <circle cx="35" cy="35" r="35" />
                </g>
              </g>
              <g>
                <g transform="translate(373 940)">
                  <circle cx="35" cy="35" r="35" />
                </g>
              </g>
              <g>
                <g transform="translate(408 940)">
                  <circle cx="35" cy="35" r="35" />
                </g>
              </g>
              <g>
                <g transform="translate(621 940)">
                  <circle cx="35" cy="35" r="35" />
                </g>
              </g>
              <g>
                <g transform="translate(179 940)">
                  <circle cx="35" cy="35" r="35" />
                </g>
              </g>
            </Styled.BubblesLarge>

            <Styled.BubblesSmall stroke-width="4">
              <g>
                <g transform="translate(147 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(255 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(573 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(429 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(91 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(640 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(321 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(376 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(376 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
              <g>
                <g transform="translate(497 984)">
                  <circle cx="15" cy="15" r="15" />
                </g>
              </g>
            </Styled.BubblesSmall>
          </Styled.Bubbles>
        </Styled.BubblesContainer>

        <Styled.Message>
          <h1>404 Not Found</h1>
          <p>Hang tight while we redirect you...</p>
        </Styled.Message>
      </Styled.Container>
    )
  }
}
