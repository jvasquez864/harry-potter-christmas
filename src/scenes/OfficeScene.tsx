import React, { Fragment, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
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

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
| 0 0 0 0 0 7 8 9 0 0 0 0 0 0 0 | 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
              | 0 0 |
      cicjcl  | 0 0 |   cicjcl 
      cecfch  | 0 0 |   cecfch 
      cacbcd  Mb0 0 Mr  cacbcd     
      c1S c3  | 0 0 |   c1S c3 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1
| 0 B C B 0 1 0 3 0 0 0 0 0 0 0 |
| 0 C C C 0 7 0 9 0 v3v40 0 0 0 |
| 0 0 0 0 0 0 0 0 0 v1v20 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3
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
                <GameObject key={key} {...position} layer="ground">
                    <Sprite {...spriteData.objects} state="grass3-0" />
                </GameObject>
            );
        case '2':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite {...spriteData.objects} state="grass3-1" />
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

        case 'c':
            return (
                <GameObject key={key} {...position} layer="wall">
                    <Collider />
                    <Sprite
                        {...spriteData.objects}
                        state={`castle-wall-${tileVariant}`}
                    />
                </GameObject>
            );
        case 'C':
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Crate {...position} />
                </Fragment>
            );
        case 'B':
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Barrel {...position} />
                </Fragment>
            );
        case 'M':
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
        case 'S':
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="castle-wall-2" />
                    </GameObject>
                    <Sword {...position} />
                </Fragment>
            );
        // case 'W':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <Workstation {...position} />
        //         </Fragment>
        //     );
        // case 'C':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <CoffeeMachine {...position} />
        //         </Fragment>
        //     );
        // case 'T':
        //     return (
        //         <Fragment key={key}>
        //             {floor}
        //             <Plant {...position} />
        //         </Fragment>
        //     );
        default:
            return null;
    }
};

export default function OfficeScene() {
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

            {/* <Text
                applyMatrix4={[0, 0, 0]}
                color="#EC2D2D"
                fontSize={12}
                maxWidth={200}
                lineHeight={1}
                letterSpacing={0.02}
                textAlign="left"
                font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
                // anchorX="center"
                // anchorY="middle"
            >
                Hello
            </Text> */}

            <Player x={6} y={3} />
            {/* <Plane position={[0.5, 1, 1.5]}>
                <meshStandardMaterial color="red" />
            </Plane>
             */}
        </>
    );
}
