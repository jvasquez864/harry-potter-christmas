import React, { Fragment } from 'react';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import ScenePortal from '../@core/ScenePortal';
import Sprite from '../@core/Sprite';
import TileMap, { TileMapResolver } from '../@core/TileMap';
import { mapDataString } from '../@core/utils/mapUtils';
import CoffeeMachine from '../entities/CoffeeMachine';
import PizzaPickup from '../entities/PizzaPickup';
import Plant from '../entities/Plant';
import Player from '../entities/Player';
import Workstation from '../entities/Workstation';
import spriteData from '../spriteData';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
| 0 0 0 0 0 7 8 9 0 0 0 0 0 0 0 | 
| 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 |
| 0 0 0 0 0 1 0 3 0 0 0 0 0 0 0 |
| 0 0 0 0 0 7 0 9 0 b B 0 0 0 0 |
| 0 0 0 0 0 0 0 0 0 v V 0 0 0 0 |
| 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 |
1 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 3
`);

const resolveMapTile: TileMapResolver = (type, x, y) => {
    const key = `${x}-${y}`;
    const position = { x, y };

    switch (type) {
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
                    <Sprite {...spriteData.objects} state="vendor0-0" />
                </GameObject>
            );
        case 'V':
            return (
                <GameObject key={key} {...position} layer="obstacle">
                    <Collider />
                    <Sprite {...spriteData.objects} state="vendor0-1" />
                </GameObject>
            );
        case 'b':
            return (
                <GameObject key={key} {...position} layer="obstacle">
                    <Collider />
                    <Sprite {...spriteData.objects} state="vendor0-2" />
                </GameObject>
            );
        case 'B':
            return (
                <GameObject key={key} {...position} layer="obstacle">
                    <Collider />
                    <Sprite {...spriteData.objects} state="vendor0-3" />
                </GameObject>
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
            <Player x={6} y={3} />
        </>
    );
}
