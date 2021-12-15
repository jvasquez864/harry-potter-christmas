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

export const memoryMatchOverlay = (width: number, height: number) => {
    return css`
        display: flex;
        flex-direction: row;
        width: ${width}px;
        height: ${height}px;
        background-color: #feff9c;
        padding: 16px;
        font-family: cursive;
        font-size: 24px;
        color: black;

        border-radius: 20px;
    `;
};

const slideKeyframes = keyframes`
 0% {
     transform: translateX(100%)
 }

 100% {
     /* right: unset; */
     transform: translateX(-1000px)
 }
`;

export const memorySlidingCards = () => {
    return css`
        position: absolute;
        /* left: -100px; */
        /* width: 100px; */
        /* height: 100px; */
        overflow: none;
        /* animation: ${slideKeyframes} 9s linear forwards; */
    `;
};

export const dialogText = () => {
    return css`
        padding-top: 20px;
        padding-left: 250px;
        padding-right: 250px;
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

export const flashingArrow = (isHarry: boolean) => css`
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    width: 6px;
    height: 6px;
    transform: rotate(-45deg);
    position: absolute;
    right: ${isHarry ? 50 : 250}px;
    bottom: 16px;
    animation: ${flashKeyframe} 1.5s ease infinite;
`;

export const characterImage = (isHarry: boolean) => css`
    width: 200px;
    height: 425px;
    position: absolute;
    ${isHarry ? 'left' : 'right'}: 0;
    top: 0;
    margin-top: -100px;
`;
