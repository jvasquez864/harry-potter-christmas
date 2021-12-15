import React, { Fragment, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import useGame from '../@core/useGame';
import Crate from '../entities/Crate';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import Player from '../entities/Player';
import spriteData from '../spriteData';
import Barrel from '../entities/Barrel';
import Mantle from '../entities/Mantle';
import Sword from '../entities/Sword';
// import Roboto from '../assets/fonts/roboto.json';
import HtmlOverlay from '../@core/HtmlOverlay';
import { Box, Plane, Text } from 'drei';
import CastleGate from '../entities/CastleGate';
import { dialogs } from '../dialogs/hogwarts';
import Lemon from '../entities/Lemon';
import useSceneManager from '../@core/useSceneManager';

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
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2d
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };
    const resolvedType = (type as string).trim();
    const tileType = resolvedType[0];
    const tileVariant = resolvedType[1];
    switch (tileType) {
        case '0':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass1" />
                </GameObject>
            );
        case '1':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Sprite {...spriteData.objects} state="castle-gate-wall" />
                </GameObject>
            );
        case '2':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="castle-gate-wall-foot" />
                </GameObject>
            );
        case '3':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-2" />
                </GameObject>
            );
        case '4':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-3" />
                </GameObject>
            );
        case '5':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-4" />
                </GameObject>
            );
        case '6':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-5" />
                </GameObject>
            );
        case '7':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-6" />
                </GameObject>
            );
        case '8':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-7" />
                </GameObject>
            );
        case '9':
            return (
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-8" />
                </GameObject>
            );
        // case 'o':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <PizzaPickup {...position} />
        //         </Fragment>
        //     );
        case '#':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall-top" />
                </GameObject>
            );
        case '|':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="wall-side" />
                </GameObject>
            );
        case 'v':
            return (
                <GameObject key={key} {...position} layer="obstacle">
                    <Collider />
                    <Sprite {...spriteData.objects} state={`vendor-${tileVariant}`} />
                </GameObject>
            );

        case 'c': // Castle
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite
                        {...spriteData.objects}
                        state={`castle-wall-${tileVariant}`}
                    />
                </GameObject>
            );
        case 'C': // Crate
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Crate {...position} />
                </Fragment>
            );

        case 'L': // Lemon
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Lemon {...position} />
                </Fragment>
            );
        case 'B': // Barrel
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Barrel {...position} />
                </Fragment>
            );
        case 'M': // Mantle
            // eslint-disable-next-line no-case-declarations
            const color = tileVariant === 'r' ? 'red' : 'blue';
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="wall-side" />
                    </GameObject>
                    <Mantle color={color} {...position} />
                </Fragment>
            );
        case 'S': // Sword
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="castle-wall-2" />
                    </GameObject>
                    <Sword {...position} />
                </Fragment>
            );
        case 'g': // castle gate
            // eslint-disable-next-line no-case-declarations
            const dialog = dialogs[type];
            return <CastleGate dialog={dialog} {...position} />;
        default:
            return null;
    }
};

export default function HogwartsScene() {
    const { getGameState } = useGame();
    const state = getGameState('hogwarts') || {};
    const { x, y } = state.position || { x: 6, y: 3 };
    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            <GameObject x={16} y={5}>
                <Collider />
                <Interactable />
                <ScenePortal name="exit" enterDirection={[-1, 0]} target="other/start" />
            </GameObject>
            <Player x={x} y={y} />
        </>
    );
}
