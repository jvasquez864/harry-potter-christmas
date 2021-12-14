import React, { useEffect, useRef } from 'react';
import { HTML, HTMLProps } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import * as THREE from 'three';
import useGame from './useGame';
import useWindowSize from './useWindowSize';
import dialog, { flash, flashingArrow } from '../styles/dialog';

export default function DialogOverlay({ children, ...props }: HTMLProps) {
    const { paused, isDialogOpen, dialogInfo, currentDialogPageIndex } = useGame();
    const node = useRef<HTMLDivElement>();
    const { camera } = useThree();
    const [width] = useWindowSize();

    if (paused || !isDialogOpen) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = camera.position;

    return (
        <HTML
            position={[x - viewport.x * 0.9, y - viewport.y * 0.1, 11]}
            ref={node}
            {...props}
        >
            <div css={dialog(width * 0.9)}>
                <div>{dialogInfo.dialog[currentDialogPageIndex]}</div>
                <div css={flashingArrow()} />
            </div>
        </HTML>
    );
}
