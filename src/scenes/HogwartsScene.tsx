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
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 B C B 0 0 0 0 0 0 0 0 0 0 0 |
| 0 C C C 0 0 0 0 0 v3v40 0 0 0 |
| 0 0 0 0 0 0 0 0 0 v1v2L 0 0 0 |
0 0 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
0 0 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`);

export default function HogwartsScene() {
    const { getGameState, openDialog } = useGame();
    const level: number = getGameState('level') || 0;

    const getSceneInitDialog = useCallback(() => {
        // Get the dialog for the scene initialization based on the state of the game
        // eslint-disable-next-line no-eval
        const didJustLose: boolean = eval(getGameState('didJustLose'));
        if (level !== 0) {
            return didJustLose ? dialogs.loss : dialogs.win;
        }
        return dialogs['new-game'];
    }, [getGameState, level]);

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        openDialog(getSceneInitDialog());
    });

    const { x, y } = JSON.parse(getGameState('position') || '{ "x": 8, "y": 2 }');

    const isGate1Open = getGameState('gate-g0-open');
    const isGate2Open = getGameState('gate-g1-open');
    const isGate3Open = getGameState('gate-g2-open');
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
