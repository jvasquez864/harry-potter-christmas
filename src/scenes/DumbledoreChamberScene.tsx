import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useGame from '../@core/useGame';
import { dialogs } from '../dialogs/battle';
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
import useSceneManager from '../@core/useSceneManager';
import { PubSubEvent } from '../@core/utils/createPubSub';
import SpellcastingOverlay from '../@core/SpellcastingOverlay';
import Voldemort from '../entities/Voldemort';
import HostileNPC from '../entities/HostileNPC';
import Nagini from '../entities/Nagini';
import HealthOverlay from '../@core/HealthOverlay';
import { ShootOptions } from '../@core/Attackable';
import useGameLoop from '../@core/useGameLoop';
import waitForMs from '../@core/utils/waitForMs';

const mapData = mapDataString(`

# # # # # # # # # # # # # # # # #
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
| C C C 0 0 0 0 0 0 0 0 0 0 0 0 |
| C C C 0 0 0 0 0 0 0 0 0 0 0 0 |
| B B 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| B B 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| C C 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| B C 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| C C C C 5 5 5 5 5 5 5 5 5 5 5 |
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export default function DumbledoreChamberScene() {
    const { openDialog } = useGame();

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        // openDialog(dialogs.intro);
    });

    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            <GameObject x={8} y={3}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="start"
                    enterDirection={[0, 1]}
                    target="hogwarts/dumbledoreChamberEnter"
                />
            </GameObject>

            <Player x={8} y={1} />
        </>
    );
}
