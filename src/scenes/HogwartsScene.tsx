import React, { useCallback, useEffect } from 'react';
import * as THREE from 'three';
import useGame from '../@core/useGame';
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
import { dialogs } from '../dialogs/hogwarts';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 - - - 1 1 1 - - - 1 1 1 - - - 1
1 - - - 1 1 1 - - - 1 1 1 - - - 1
2 g0- - 2 2 2 g1- - 2 2 2 g2- - 2
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
            | 0 0 0 |
    cicjcl  | 0 0 0 |   cicjcl 
    cecfch  | 0 0 0 |   cecfch 
    cacbcd  Mb0 0 0 Mr  cacbcd     
    c1S c3  | 0 0 0 |   c1S c3 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1
| 0 B C B 0 0 0 0 0 0 0 0 0 0 0 |
| 0 C C C 0 0 0 0 0 v3v40 0 0 0 |
| 0 0 0 0 0 0 0 0 0 v1v2L 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export default function HogwartsScene() {
    const { getGameState, openDialog } = useGame();
    const level: number = getGameState('level') || 0;

    const getSceneInitDialog = useCallback(() => {
        // Get the dialog for the scene initialization based on the state of the game
        const didJustLose: boolean = getGameState('didJustLose');
        switch (level) {
            case 1:
                return didJustLose
                    ? dialogs['memory-game-loss']
                    : dialogs['memory-game-win'];
            case 2:
                return didJustLose
                    ? dialogs['spellcasting-loss']
                    : dialogs['spellcasting-win'];
            case 3:
                return didJustLose ? dialogs['battle-loss'] : dialogs['battle-win'];
            // Whole game won
            default:
                return dialogs['new-game'];
            // New game
        }
    }, [getGameState, level]);

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        openDialog(getSceneInitDialog());
    });

    const { x, y } = getGameState('position') || { x: 1, y: 14 };

    const isGate1Open = level >= 1;
    const isGate2Open = level >= 2;
    const isGate3Open = level >= 3;
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            {isGate1Open && (
                <GameObject x={2} y={15}>
                    <Collider />
                    <Interactable />
                    <ScenePortal
                        name="memoryMatchEnter"
                        enterDirection={[0, -1]}
                        target="memoryMatch/start"
                    />
                </GameObject>
            )}
            {isGate2Open && (
                <GameObject x={8} y={15}>
                    <Collider />
                    <Interactable />
                    <ScenePortal
                        name="spellcastingEnter"
                        enterDirection={[0, -1]}
                        target="spellcasting/start"
                    />
                </GameObject>
            )}

            {isGate3Open && (
                <GameObject x={14} y={15}>
                    <Collider />
                    <Interactable />
                    <ScenePortal
                        name="battlegroundEnter"
                        enterDirection={[0, -1]}
                        target="battleground/start"
                    />
                </GameObject>
            )}
            <Player x={x} y={y} />
        </>
    );
}
