import React from 'react';
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

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 - - - 1 1 1 - - - 1 1 - - - 1 1
1 - - - 1 1 1 - - - 1 1 - - - 1 1
2 g0- - 2 2 2 g1- - 2 2 g2- - 2 2
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
              | 0 0 |
      cicjcl  | 0 0 |   cicjcl 
      cecfch  | 0 0 |   cecfch 
      cacbcd  Mb0 0 Mr  cacbcd     
      c1S c3  | 0 0 |   c1S c3 
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
    const { getGameState } = useGame();
    const state = getGameState('hogwarts') || {};
    const { x, y } = state.position || { x: 1, y: 14 };
    const isGate1Open = state['gate-g0-open'];
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
                        name="spellCastingEnter"
                        enterDirection={[0, -1]}
                        target="spellCasting/start"
                    />
                </GameObject>
            )}
            <Player x={x} y={y} />
        </>
    );
}
