import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HTML, HTMLProps } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import useGame from './useGame';
import useWindowSize from './useWindowSize';
import dialog, {
    characterImage,
    dialogText,
    enemyHub,
    flash,
    flashingArrow,
    harryHealthImg,
    healthContainer,
    healthOverlay,
    hubIcon,
    spellCastingLifeImg,
} from '../styles/dialog';
import useAsset from './useAsset';
import { Position } from './GameObject';

interface HealthOverlayProps extends HTMLProps {
    harryHealth: number;
    voldemortHealth: number;
    naginiHealth: number;
}
export default function HealthOverlay({
    children,
    harryHealth,
    voldemortHealth,
    naginiHealth,
    ...props
}: HealthOverlayProps) {
    const { paused, dialogInfo, currentDialogPageIndex } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width] = useWindowSize();
    const [position, setPosition] = useState<Position>(camera.position);
    const [maxHarryHealth] = useState(harryHealth);
    const [maxNaginiHealth] = useState(naginiHealth);
    const [maxVoldemortHealth] = useState(voldemortHealth);
    useFrame(() => {
        const { x, y } = camera.position;
        setPosition({ x, y });
    });
    if (paused) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = position;
    return (
        <HTML
            position={[x - viewport.x * 0.9, y + viewport.y * 0.95, 11]}
            ref={node}
            {...props}
        >
            <div css={healthOverlay(width * 0.9)}>
                <div>
                    <img css={hubIcon()} src="../assets/harry-hub.png" alt="harry hub" />
                    <div css={healthContainer()}>
                        {[...Array(maxHarryHealth)].map((_, i) => {
                            const isLifeFilled = i < harryHealth;
                            const src = isLifeFilled
                                ? '../assets/heart-filled.png'
                                : '../assets/heart-outline.png';
                            return (
                                <img
                                    css={harryHealthImg()}
                                    key={i}
                                    alt="health"
                                    src={src}
                                />
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div css={enemyHub()}>
                        <img
                            css={hubIcon()}
                            src="../assets/voldemort-hub.png"
                            alt="voldemort hub"
                        />
                        <div css={healthContainer()}>
                            {[...Array(maxVoldemortHealth)].map((_, i) => {
                                const isLifeFilled = i < voldemortHealth;
                                const src = isLifeFilled
                                    ? '../assets/dark-heart-filled.png'
                                    : '../assets/heart-outline.png';
                                return (
                                    <img
                                        css={harryHealthImg()}
                                        key={i}
                                        alt="health"
                                        src={src}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <div css={enemyHub()}>
                        <img
                            css={hubIcon(true)}
                            src="../assets/nagini-avatar.png"
                            alt="nagini hub"
                        />
                        <div css={healthContainer(true)}>
                            {[...Array(maxNaginiHealth)].map((_, i) => {
                                const isLifeFilled = i < naginiHealth;
                                const src = isLifeFilled
                                    ? '../assets/dark-heart-filled.png'
                                    : '../assets/heart-outline.png';
                                return (
                                    <img
                                        css={harryHealthImg(true)}
                                        key={i}
                                        alt="health"
                                        src={src}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </HTML>
    );
}
