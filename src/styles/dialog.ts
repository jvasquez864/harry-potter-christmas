import { keyframes } from '@emotion/core';
import css from '@emotion/css';

export default function dialog() {
    return css`
        width: 800px;
        height: 300px;
        background-color: #feff9c;
        padding: 16px;
        opacity: 0.75;
        color: black;
    `;
}

const flashKeyframe = keyframes`
  0% {
    opacity: 0
  }

  50% {

      opacity: 1
  }
  100% {

    opacity: 0
  }
`;

export const flash = () => {
    return css`
        animation: ${flashKeyframe} 1.5s ease infinite;
    `;
};

export const flashingArrow = () => css`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    width: 6px;
    height: 6px;
    transform: rotate(-45deg);
    position: absolute;
    right: 16px;
    bottom: 16px;
    animation: ${flashKeyframe} 1.5s ease infinite;
`;
