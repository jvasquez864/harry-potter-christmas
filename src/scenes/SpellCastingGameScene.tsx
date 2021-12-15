import React, { useEffect, useState } from 'react';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/spellcasting';
import * as THREE from 'three';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import TileMap from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import resolveMapTile from '../tile-resolvers/hogwarts';
import useGameEvent from '../@core/useGameEvent';
import { SceneReadyEvent } from '../@core/Scene';
import MemoryMatchOverlay from '../@core/MemoryMatchOverlay';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
| | | | | | | | | | | | | | | | |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export default function SpellCastingGameScene() {
    const { openDialog } = useGame();
    const [isMiniGameStarted, setIsMiniGameStarted] = useState(false);

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        openDialog({ ...dialogs.intro, onClose: () => setIsMiniGameStarted(true) });
    });
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            <GameObject x={8} y={4}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="start"
                    enterDirection={[0, -1]}
                    target="hogwarts/spellCastingEnter"
                />
            </GameObject>
            <MemoryMatchOverlay isOpen={isMiniGameStarted} />
            <Player canWalk={false} x={4} y={4} />
        </>
    );
}
