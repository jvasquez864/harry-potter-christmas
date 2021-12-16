import React, { Fragment } from 'react';

import * as THREE from 'three';
import { useFrame, useThree } from 'react-three-fiber';
import Collider from '../@core/Collider';
import GameObject from '../@core/GameObject';
import { dialogs } from '../dialogs/hogwarts';
import Barrel from '../entities/Barrel';
import CastleGate from '../entities/CastleGate';
import Crate from '../entities/Crate';
import Lemon from '../entities/Lemon';
import Mantle from '../entities/Mantle';
import Sword from '../entities/Sword';
import spriteData from '../spriteData';
import Sprite from '../@core/Sprite';
import Lantern from '../entities/Lantern';
import Stump from '../entities/Stump';

export default function resolveMapTile(type, x, y) {
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
            // eslint-disable-next-line no-case-declarations
            const isForSpell = tileVariant === 's';
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Barrel isForSpell={isForSpell} {...position} />
                </Fragment>
            );
        case 'T': // Lantern
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Lantern {...position} />
                </Fragment>
            );
        case 'X': // Stump
            return (
                <Fragment>
                    <GameObject key={key} {...position} layer="wall">
                        <Collider />
                        <Sprite {...spriteData.objects} state="grass1" />
                    </GameObject>
                    <Stump {...position} />
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
            return <CastleGate gateKey={type as string} dialog={dialog} {...position} />;
        default:
            return null;
    }
}
