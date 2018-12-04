import {keyframes} from "react-emotion"
import styled from "../styled"

const wobble = keyframes`
	33% {
		transform: translateX(-50px);
	}

	66% {
		transform: translateX(50px);
	}
`

const up = keyframes`
	0% {
		opacity: 0;
	}

	10%, 90% {
		opacity: 1;
	}

	100% {
		opacity: 0;
		transform: translateY(-1024px);
	}
`

export const Container = styled("div")`
  background-blend-mode: multiply;
  background-image: url(./images/underwater-1.min.jpg);
  background-size: cover;
  height: 100vh;
  left: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100vw;

  body {
    overflow: hidden;
  }

  h1 {
    color: white;
    font-family: "Exo 2", sans-serif;
    font-size: 8.5vw;
    line-height: 8.5vw;
    margin: 0;
    max-width: 25%;
    padding: 0;
    text-shadow: 0px 4px 48px rgba(255, 255, 255, 0.2);
  }

  p {
    color: #c5c5c5;
    font-family: sans-serif;
    font-family: sans-serif;
    font-size: 1.5vw;
    padding: 0;
    text-indent: 0.7vw;
  }
`

export const Message = styled("div")`
  bottom: 7.5vw;
  left: 7.5vw;
  position: absolute;
`

export const BubblesContainer = styled("div")`
  left: 50%;
  height: 100vh;
  max-width: 15rem;
  opacity: 0.75;
  overflow: visible;
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  width: 100%;
`

export const Bubbles = styled("svg")`
  width: 100%;
  height: 100vh;

  circle {
    stroke: white;
    fill: none;
  }

  > g > g:nth-of-type(3n) circle {
    stroke: #87f5fb;
  }

  > g > g:nth-of-type(4n) circle {
    stroke: #8be8cb;
  }
`

export const BubblesLarge = styled("g")`
  overflow: visible;

  > g {
    transform: translateY(2048px);
    opacity: 0;
    will-change: transform, opacity;
  }

  g:nth-of-type(1) {
    animation: ${up} 6.5s infinite;

    g {
      transform: translateX(350px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(2) {
    animation: ${up} 5.25s 250ms infinite;

    g {
      transform: translateX(450px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(3) {
    animation: ${up} 6s 750ms infinite;

    g {
      transform: translateX(700px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(4) {
    animation: ${up} 5.5s 1.5s infinite;

    g {
      transform: translateX(500px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(5) {
    animation: ${up} 6.5s 4s infinite;

    g {
      transform: translateX(675px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }
`

export const BubblesSmall = styled("g")`
  overflow: visible;

  > g {
    transform: translateY(2048px);
    opacity: 0;
    will-change: transform, opacity;
  }

  g circle {
    transform: scale(0);
  }

  g:nth-of-type(1) {
    animation: ${up} 5.25s infinite;

    g {
      transform: translateX(350px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(2) {
    animation: ${up} 5.75s infinite;

    g {
      transform: translateX(750px);
    }

    circle {
      animation: ${wobble} 3s infinite ease-in-out;
    }
  }

  g:nth-of-type(3) {
    animation: ${up} 5.25s 250ms infinite;

    g {
      transform: translateX(350px);
    }

    circle {
      animation: ${wobble} 3s 250ms infinite ease-in-out;
    }
  }

  g:nth-of-type(4) {
    animation: ${up} 5.75s 325ms infinite;

    g {
      transform: translateX(180px);
    }

    circle {
      animation: ${wobble} 3s 325ms infinite ease-in-out;
    }
  }

  g:nth-of-type(5) {
    animation: ${up} 6s 125ms infinite;

    g {
      transform: translateX(350px);
    }

    circle {
      animation: ${wobble} 3s 250ms infinite ease-in-out;
    }
  }

  g:nth-of-type(6) {
    animation: ${up} 5.13s 250ms infinite;

    g {
      transform: translateX(650px);
    }

    circle {
      animation: ${wobble} 3s 125ms infinite ease-in-out;
    }
  }

  g:nth-of-type(7) {
    animation: ${up} 6.25s 350ms infinite;

    g {
      transform: translateX(480px);
    }

    circle {
      animation: ${wobble} 3s 325ms infinite ease-in-out;
    }
  }

  g:nth-of-type(8) {
    animation: ${up} 7s 200ms infinite;

    g {
      transform: translateX(330px);
    }

    circle {
      animation: ${wobble} 3s 325ms infinite ease-in-out;
    }
  }

  g:nth-of-type(9) {
    animation: ${up} 6.25s 233ms infinite;

    g {
      transform: translateX(230px);
    }

    circle {
      animation: ${wobble} 3s 275ms infinite ease-in-out;
    }
  }

  g:nth-of-type(10) {
    animation: ${up} 6s 900ms infinite;

    g {
      transform: translateX(730px);
    }

    circle {
      animation: ${wobble} 2s 905ms infinite ease-in-out;
    }
  }
`
