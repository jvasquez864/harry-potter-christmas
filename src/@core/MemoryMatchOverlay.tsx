import React, { useEffect, useMemo, useRef, useState } from 'react';
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
    memoryMatchOverlay,
    memorySlidingCards,
} from '../styles/dialog';
import useAsset from './useAsset';

interface MemoryMatchOverlayProps extends HTMLProps {
    isOpen: boolean;
}

export default function MemoryMatchOverlay({
    children,
    isOpen,
    ...props
}: MemoryMatchOverlayProps) {
    const { paused } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width, height] = useWindowSize();
    const [targetCards, setTargetCards] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState(6);
    const possibleCards = useMemo(
        () => ['ring', 'deathly-hollows', 'sorting-hat', 'robe'],
        []
    );

    useEffect(() => {
        if (isOpen) {
            const tmpTarget = [...Array(difficultyLevel)].map(() => {
                const randomCardIndex = Math.floor(Math.random() * possibleCards.length);
                return possibleCards[randomCardIndex];
            });
            setTargetCards(tmpTarget);
        }
    }, [isOpen]);

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
                <div css={memorySlidingCards()}>
                    {targetCards.map((val, i) => (
                        <span key={i} style={{ margin: 25 }}>
                            {val}
                        </span>
                    ))}
                </div>
            </div>
        </HTML>
    );
}
