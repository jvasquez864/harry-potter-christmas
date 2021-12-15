import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import useGame from './useGame';
import useWindowSize from './useWindowSize';
import dialog, {
    characterImage,
    dialogText,
    flash,
    flashingArrow,
    memoryCardImg,
    memoryCardImgOption,
    memoryCardOptionContainer,
    memoryCardSelection,
    memoryMatchOverlay,
    memorySlidingCards,
} from '../styles/dialog';
import useAsset from './useAsset';

interface MemoryMatchOverlayProps extends HTMLProps {
    isOpen: boolean;
    onGameEnd: (didWin: boolean) => void;
}

export default function MemoryMatchOverlay({
    children,
    isOpen,
    onGameEnd,
    ...props
}: MemoryMatchOverlayProps) {
    const { paused } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width, height] = useWindowSize();
    const [targetCards, setTargetCards] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState(3);

    const [isChoosingCards, setIsChoosingCards] = useState(false);
    const maxLevel = useMemo(() => 3, []);
    const possibleCards = useMemo(
        () => [
            'ring',
            'deathly-hallows',
            'golden-snitch',
            'diadem',
            'death-eater',
            'sword',
        ],
        []
    );

    useEffect(() => {
        if (difficultyLevel > maxLevel) {
            // win
            onGameEnd(true);
            return;
        }
        if (isOpen && !isChoosingCards) {
            const tmpTarget = [...Array(difficultyLevel)].map(() => {
                const randomCardIndex = Math.floor(Math.random() * possibleCards.length);
                return possibleCards[randomCardIndex];
            });
            setTargetCards(tmpTarget);
            setTimeout(() => {
                setIsChoosingCards(true);
            }, 10000);
        }
    }, [isOpen, isChoosingCards, difficultyLevel, possibleCards]);

    const onCardSelected = useCallback(
        (card: string) => {
            const tmp = [...selectedCards, card];
            for (const tmpCardIndex in tmp) {
                if (tmp[tmpCardIndex] !== targetCards[tmpCardIndex]) {
                    onGameEnd(false);
                    return;
                }
            }
            if (tmp.length === targetCards.length) {
                setDifficultyLevel(difficultyLevel + 1);
                setIsChoosingCards(false);
                setSelectedCards([]);
            } else {
                setSelectedCards(tmp);
            }
        },
        [difficultyLevel, selectedCards, targetCards]
    );

    if (paused || !isOpen) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = camera.position;

    return (
        <HTML
            position={[x - viewport.x * 0.9, y + viewport.y * 0.95, 11]}
            ref={node}
            {...props}
        >
            <div css={memoryMatchOverlay(width * 0.9, height * 0.9)}>
                {!isChoosingCards && (
                    <div css={memorySlidingCards()}>
                        {targetCards.map((val, i) => (
                            <img
                                key={i}
                                css={memoryCardImg()}
                                src={`./assets/${val}.png`}
                                alt={`Item - ${val}`}
                            />
                        ))}
                    </div>
                )}
                {isChoosingCards && (
                    <div css={memoryCardSelection()}>
                        {possibleCards.map((val, i) => (
                            <div
                                key={i}
                                role="button"
                                css={memoryCardOptionContainer()}
                                onClick={() => onCardSelected(val)}
                            >
                                <img
                                    css={memoryCardImgOption()}
                                    src={`./assets/${val}.png`}
                                    alt={`Item - ${val}`}
                                />
                            </div>
                        ))}
                        <div style={{ width: '100%', textAlign: 'center' }}>
                            {selectedCards.length} out of {targetCards.length} selected
                        </div>
                    </div>
                )}
            </div>
        </HTML>
    );
}
