import { useCallback, useRef, useState } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import useClampPositionToViewport from '../@core/useClampPositionToViewport';
import * as THREE from 'three';
import { Position } from '../@core/GameObject';
import { SceneReadyEvent } from '../@core/Scene';
import useGame from '../@core/useGame';
import useGameEvent from '../@core/useGameEvent';
import useGameObject from '../@core/useGameObject';
import useKeyActions from '../@core/useKeyActions';

function getRoundedCameraPosition(camera: THREE.Camera) {
    const vector = camera.position.clone();
    // world to rounded screen position
    vector.project(camera);
    vector.x = Math.round(((vector.x + 1) * window.innerWidth) / 2);
    vector.y = Math.round(((-vector.y + 1) * window.innerHeight) / 2);
    // screen to world position
    vector.set(
        (vector.x / window.innerWidth) * 2 - 1,
        -(vector.y / window.innerHeight) * 2 + 1,
        0.5
    );
    return vector.unproject(camera);
}

export default function CameraFollowScript() {
    const {
        settings: { cameraZoom },
    } = useGame();
    const { nodeRef } = useGameObject();
    const { camera } = useThree();
    const isReady = useRef(false);
    const zoomLevel = useRef(0);
    const clampPositionToViewport = useClampPositionToViewport();

    const [cameraZoomLevels] = useState(() => [
        cameraZoom,
        cameraZoom * 1.5,
        cameraZoom * 2,
    ]);

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        isReady.current = true;
    });

    useKeyActions({
        PageUp: e => {
            e.preventDefault();
            const maxLevel = cameraZoomLevels.length - 1;
            zoomLevel.current = Math.min(maxLevel, zoomLevel.current + 1);
        },

        PageDown: e => {
            e.preventDefault();
            zoomLevel.current = Math.max(0, zoomLevel.current - 1);
        },
    });

    // following camera
    useFrame(() => {
        const { x, y } = clampPositionToViewport(nodeRef.current.position);
        if (!isReady.current) {
            // set camera to player node initially
            camera.position.setX(x);
            camera.position.setY(y);
        } else {
            // follow x, y
            if (
                ((camera.position.x * 100) | 0) !== ((x * 100) | 0) ||
                ((camera.position.y * 100) | 0) !== ((y * 100) | 0)
            ) {
                camera.position.setX(camera.position.x - (camera.position.x - x) / 8);
                camera.position.setY(camera.position.y - (camera.position.y - y) / 8);
            } else {
                camera.position.setX(x);
                camera.position.setY(y);
            }
            // apply zoom
            const prevZoom = camera.zoom;
            camera.zoom = cameraZoomLevels[zoomLevel.current];
            if (camera.zoom !== prevZoom) camera.updateProjectionMatrix();
        }
        // avoid camera position on floating screen pixels
        const rounded = getRoundedCameraPosition(camera);
        camera.position.setX(rounded.x);
        camera.position.setY(rounded.y);
    });

    return null;
}
