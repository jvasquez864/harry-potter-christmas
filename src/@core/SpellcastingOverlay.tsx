import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    spellCastingArrowContainer,
    spellCastingLifeContainer,
    spellCastingLifeImg,
    spellCastingProgressBar,
} from '../styles/dialog';
import useAsset from './useAsset';
import useKeyPress from './useKeyPress';
import useGameLoop from './useGameLoop';
import useKeyActions from './useKeyActions';
import { Line } from 'rc-progress';

interface SpellcastingOverlay extends HTMLProps {
    onGameEnd: (didWin: boolean, spellName: string) => void;
    startingLevel: number;
    maxLevel: number;
    maxTimePerLevel: number;
    spellName: string;
}
export default function SpellcastingOverlay({
    children,
    startingLevel,
    maxLevel,
    maxTimePerLevel,
    spellName,
    onGameEnd,
    ...props
}: SpellcastingOverlay) {
    const { paused } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width] = useWindowSize();
    const arrows = useMemo(() => ['left', 'right', 'up', 'down'], []);
    const [targetArrows, setTargetArrows] = useState([]);
    const [pressedArrows, setPressedArrows] = useState([]);
    const [difficultyLevel, setDifficultyLevel] = useState(startingLevel);
    const maxLives = useMemo(() => 3, []);
    const [levelStartTime, setLevelStartTime] = useState(-1);
    const [elapsedLevelTime, setElapsedLevelTime] = useState(0);
    const [currentLives, setCurrentLives] = useState(maxLives);

    const setRandomArrows = useCallback(() => {
        const tmpTarget = [...Array(difficultyLevel)].map(() => {
            const randomArrowIndex = Math.floor(Math.random() * arrows.length);
            return arrows[randomArrowIndex];
        });
        setTargetArrows(tmpTarget);
        // Reset the start time every new level
        setLevelStartTime(-1);
    }, [arrows, difficultyLevel]);

    // Handle updating time elapsed / lives based on time
    useGameLoop(time => {
        // If the game has begun but we haven't set the start time
        if (targetArrows.length && levelStartTime === -1) {
            setLevelStartTime(time);
            return;
        }
        const elapsedTime = time - levelStartTime;
        setElapsedLevelTime(elapsedTime);
        if (levelStartTime !== -1 && elapsedTime > maxTimePerLevel) {
            setCurrentLives(lives => lives - 1);
            setElapsedLevelTime(0);
            setLevelStartTime(-1);
            setPressedArrows([]);
            setRandomArrows();
        }
    });

    useEffect(() => {
        if (currentLives <= 0) {
            onGameEnd(false, spellName);
        }
    }, [currentLives, onGameEnd, spellName]);

    // Handle updating target arrows when difficulty level changes
    useEffect(() => {
        if (difficultyLevel > maxLevel) {
            onGameEnd(true, spellName);
            return;
        }
        // This is run as soon as the game starts and whenever the difficulty level changes
        // so that we update the target arrows
        setRandomArrows();
    }, [difficultyLevel, setRandomArrows, maxLevel, onGameEnd, spellName]);

    // Handle updating difficulty level/lives based on pressed arrows
    useEffect(() => {
        for (const i in pressedArrows) {
            // Start over if you press the wrong button
            if (pressedArrows[i] !== targetArrows[i]) {
                setPressedArrows([]);
                setCurrentLives(lives => lives - 1);
                return;
            }
        }
        // Advance to the next level when you match everything
        if (targetArrows.length && pressedArrows.length === targetArrows.length) {
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

    if (paused) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = camera.position;
    return (
        <HTML
            position={[x - viewport.x * 0.9, y - viewport.y * 0.1, 11]}
            ref={node}
            {...props}
        >
            <div css={() => dialogSpellCasting(width * 0.9)}>
                <div css={spellCastingArrowContainer()}>
                    {targetArrows.map((arrow, i) => {
                        const src =
                            targetArrows[i] === pressedArrows[i]
                                ? `../assets/finger-${arrow}-correct.png`
                                : `../assets/finger-${arrow}.png`;
                        return (
                            <img
                                key={i}
                                src={src}
                                alt="Target arrow"
                                css={spellCasting()}
                            />
                        );
                    })}
                </div>

                <div css={spellCastingProgressBar()}>
                    <Line
                        percent={(elapsedLevelTime / maxTimePerLevel) * 100}
                        strokeWidth={2}
                        strokeColor="#a261df"
                    />
                </div>
                <div css={spellCastingLifeContainer()}>
                    {[...Array(maxLives)].map((_, i) => {
                        const isLifeFilled = i < currentLives;
                        const src = isLifeFilled
                            ? '../assets/wizard-hat.png'
                            : '../assets/wizard-hat-outline.png';
                        return (
                            <img
                                css={spellCastingLifeImg()}
                                key={i}
                                src={src}
                                alt="Life"
                            />
                        );
                    })}
                </div>
            </div>
        </HTML>
    );
}
