import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    harryHealthImg,
    healthOverlay,
    hubIcon,
    spellCastingLifeImg,
} from '../styles/dialog';
import useAsset from './useAsset';
import { Position } from './GameObject';

export default function HealthOverlay({ children, ...props }: HTMLProps) {
    const { paused, dialogInfo, currentDialogPageIndex } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width] = useWindowSize();
    const [position, setPosition] = useState<Position>(camera.position);
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
                    <div>
                        {[...Array(3)].map(val => (
                            <img
                                css={harryHealthImg()}
                                key={val}
                                alt="health"
                                src="../assets/heart-filled.png"
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <img
                        css={hubIcon()}
                        src="../assets/voldemort-hub.png"
                        alt="voldemort hub"
                    />
                    <div>
                        {[...Array(3)].map(val => (
                            <img
                                css={harryHealthImg()}
                                key={val}
                                alt="health"
                                src="../assets/heart-filled.png"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </HTML>
    );
}
