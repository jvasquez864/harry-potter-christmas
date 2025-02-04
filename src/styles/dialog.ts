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

export const dialogSpellCasting = (width: number) => {
    return css`
        ${dialog(width)} /* flex-wrap: wrap; */
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        padding: 16px;
    `;
};

export const spellCastingArrowContainer = () => {
    return css`
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        padding: 16px;
    `;
};

export const spellCastingLifeContainer = () => {
    return css`
        display: flex;
        width: 100%;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        margin-right: 150px;
    `;
};

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
     transform: translateX(-100%)
 }
`;

export const getCardAnimationTime = (cardCount: number) => {
    switch (cardCount) {
        case 3:
            return 4;
        case 4:
            return 5;
        case 5:
            return 6.5;
        case 6:
            return 7.5;
        default:
            return 1;
    }
};

export const memorySlidingCards = (cardCount: number) => {
    // Memory card is 500px (300 width + 200 horizontal margin).
    // So we can do (screenWidth/500) * cardCount to calculate the animation time,
    // for a constant speed across any number of cards or screen sizes.

    return css`
        display: flex;
        align-items: center;
        height: 100%;
        position: absolute;
        overflow: none;
        animation: ${slideKeyframes} ${getCardAnimationTime(cardCount)}s linear forwards;
    `;
};

export const memoryCardSelection = () => {
    return css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        flex-wrap: wrap;
        text-align: center;
        /* height: 100%; */
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

export const characterImage = (character: string) => {
    const isHarry = character === 'harry';
    const isHermione = character === 'hermione';
    return css`
        width: ${isHermione ? 300 : 200}px;
        height: 425px;
        position: absolute;
        ${isHarry ? 'left' : 'right'}: 0;
        top: 0;
        margin-top: -100px;
    `;
};

export const memoryCardImg = () => css`
    width: 300px;
    height: 300px;
    margin-left: 100px;
    margin-right: 100px;
`;

export const memoryCardImgOption = () => css`
    /* width: 25%; */
    height: 200px;
`;

export const memoryCardOptionContainer = () => css`
    width: 25%;
    height: 200px;
    margin: 0 50px;
    display: flex;
    justify-content: center;
    :hover {
        cursor: pointer;
        opacity: 0.5;
        background-color: 'gray';
    }
`;

export const spellCasting = () => css`
    width: 80px;
    height: 80px;

    /* transform: scale(0.2); */
    color: green;
`;

export const spellCastingProgressBar = () => css`
    width: 80%;
`;

export const spellCastingLifeImg = () => css`
    width: 60px;
    height: 60px;
    &:last-child {
        width: 150;
    }
    margin-right: 40px;
`;
export const harryHealthImg = (mini?: boolean) => css`
    width: ${mini ? 20 : 32}px;
    height: ${mini ? 20 : 32}px;
    margin-right: 16px;
`;

export const hubIcon = (mini?: boolean) => css`
    width: ${mini ? 50 : 100}px;
    height: ${mini ? 50 : 100}px;
    margin-right: 16px;
`;

export const enemyHub = () => css`
    display: flex;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const healthContainer = (mini?: boolean) => css`
    display: flex;
    flex-wrap: wrap;
    width: ${mini ? 110 : 150}px;
`;

export const healthOverlay = (width: number) => css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: ${width}px;

    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    /* transform: translateY(1px); */
`;
