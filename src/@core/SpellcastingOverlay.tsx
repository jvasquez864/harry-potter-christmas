import React, { useEffect, useMemo, useRef } from 'react';
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
    spellCasting,
} from '../styles/dialog';
import useAsset from './useAsset';

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
    const arrows = useMemo(() => ['☚', '☛', '', ''], []);

    if (paused || !isOpen) return null;

    const viewport = new THREE.Vector3(1, 1).unproject(camera).sub(camera.position);
    const { x, y } = camera.position;
    const [left, right, up, down] = arrows;
    return (
        <HTML
            position={[x - viewport.x * 0.9, y - viewport.y * 0.1, 11]}
            ref={node}
            {...props}
        >
            <div css={dialog(width * 0.9)}>
                <span css={spellCasting()}>{left}</span>
                <span css={spellCasting()}>{right}</span>
            </div>
        </HTML>
    );
}
