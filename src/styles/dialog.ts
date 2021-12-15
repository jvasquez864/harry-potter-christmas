import { keyframes } from '@emotion/core';
import css from '@emotion/css';

export default function dialog(width: number) {
    return css`
        display: flex;
        flex-direction: row;
        width: ${width}px;
        height: 300px;
        background-color: #feff9c;
        padding: 16px;
        font-family: cursive;
        font-size: 24px;
        color: black;
        background: url('./assets/parchment.jpg');
        background-size: cover;
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
    `;
}

export const dialogText = () => {
    return css`
        padding-top: 20px;
        padding-left: 250px;
        padding-right: 20px;
    `;
};

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
    right: 50px;
    bottom: 16px;
    animation: ${flashKeyframe} 1.5s ease infinite;
`;

export const characterImage = () => css`
    width: 200px;
    height: 425px;
    position: absolute;
    left: 0;
    top: 0;
    margin-top: -100px;
`;
