import { useCallback } from 'react';
import { useThree } from 'react-three-fiber';
import * as THREE from 'three';
import { Position } from './GameObject';
import useGame from './useGame';

export default function useClampPositionToViewport() {
    const {
        mapSize: [mapWidth, mapHeight],
        settings: { cameraZoom },
    } = useGame();
    const { camera } = useThree();

    return useCallback(
        (position: Position) => {
            const extraTopSpace = 3;
            const extraBottomSpace = 3;
            const extraHorizontalSpace = 6;
            const viewport = new THREE.Vector3(1, 1)
                .unproject(camera)
                .sub(camera.position);
            let { x, y } = position;

            if (mapWidth > viewport.x * 2 - extraHorizontalSpace * 2) {
                x = Math.max(
                    viewport.x - 0.5 - extraHorizontalSpace,
                    Math.min(x, mapWidth - viewport.x - 0.5 + extraHorizontalSpace)
                );
            } else {
                x = mapWidth / 2 - 0.5;
            }

            if (mapHeight > viewport.y * 2 - extraTopSpace - extraBottomSpace) {
                y = Math.max(
                    viewport.y - 0.5 - extraBottomSpace,
                    Math.min(y, mapHeight - viewport.y - 0.5 + extraTopSpace)
                );
            } else {
                y = mapHeight / 2 - 0.5;
            }

            return { x, y };
        },
        [camera, mapHeight, mapWidth]
    );
}
