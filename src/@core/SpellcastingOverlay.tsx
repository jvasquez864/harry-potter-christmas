import React, { useEffect, useMemo, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import useGame from './useGame';
import useWindowSize from './useWindowSize';
import dialog, {
    characterImage,
    dialogSpellCasting,
    dialogText,
    flash,
    flashingArrow,
    spellCasting,
} from '../styles/dialog';
import useAsset from './useAsset';
import useKeyPress from './useKeyPress';
import useGameLoop from './useGameLoop';
import useKeyActions from './useKeyActions';

interface SpellcastingOverlay extends HTMLProps {
    isOpen: boolean;
}
export default function SpellcastingOverlay({
    children,
    isOpen,
    ...props
}: SpellcastingOverlay) {
    const { paused } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width] = useWindowSize();
    const arrows = useMemo(() => ['left', 'right', 'up', 'down'], []);
    const [targetArrows, setTargetArrows] = useState([]);
    const [pressedArrows, setPressedArrows] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState(3);
    const maxLevel = useMemo(() => 4, []);

    useEffect(() => {
        if (isOpen) {
            const tmpTarget = [...Array(difficultyLevel)].map(() => {
                const randomArrowIndex = Math.floor(Math.random() * arrows.length);
                return arrows[randomArrowIndex];
            });
            setTargetArrows(tmpTarget);
        }
    }, [isOpen, difficultyLevel, arrows]);

    useEffect(() => {
        for (const i in pressedArrows) {
            // Start over if you press the wrong button
            if (pressedArrows[i] !== targetArrows[i]) {
                setPressedArrows([]);
            }
        }
        // Advance to the next level when you match everything
        if (pressedArrows.length === targetArrows.length) {
            setPressedArrows([]);
            setDifficultyLevel(difficultyLevel + 1);
        }
    }, [pressedArrows, difficultyLevel, targetArrows]);

    useKeyActions({
        ArrowLeft: () => {
            setPressedArrows([...pressedArrows, 'left']);
        },
        ArrowRight: () => {
            setPressedArrows([...pressedArrows, 'right']);
        },
        ArrowUp: () => {
            setPressedArrows([...pressedArrows, 'up']);
        },
        ArrowDown: () => {
            setPressedArrows([...pressedArrows, 'down']);
        },
    });

    if (paused || !isOpen) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = camera.position;
    return (
        <HTML
            position={[x - viewport.x * 0.9, y - viewport.y * 0.1, 11]}
            ref={node}
            {...props}
        >
            <div css={dialogSpellCasting(width * 0.9)}>
                {targetArrows.map((arrow, i) => {
                    const src =
                        targetArrows[i] === pressedArrows[i]
                            ? `../assets/finger-${arrow}-correct.png`
                            : `../assets/finger-${arrow}.png`;
                    return <img src={src} alt="Target arrow" css={spellCasting()} />;
                })}
            </div>
        </HTML>
    );
}
