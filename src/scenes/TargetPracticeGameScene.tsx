import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import useSceneManager from '../@core/useSceneManager';
import { PubSubEvent } from '../@core/utils/createPubSub';
import SpellcastingOverlay from '../@core/SpellcastingOverlay';
import Voldemort from '../entities/Voldemort';
import HostileNPC from '../entities/HostileNPC';
import Dementor from '../entities/Dementor';
import Nagini from '../entities/Nagini';

const mapData = mapDataString(`
# # # # # # # # # # # # # # # # #
| | | | | | | | | | | | | | | | |
| f6f7f7f7f7f7f7f7f7f7f7f7f7f7f8|
| f3f4f4f4f4f4f4f4f4f4f4f4f4f4f5|
| f3f4f4f4f4f4f4f4f4f4f4f4f4f4f5|
| f3f4f4f4f4f4f4f4f4f4f4f4f4f4f5|
| f3f4f4f4f4f4f4f4f4f4f4f4f4f4f5|
| f3f4f4f4f4f4f4f4f4f4f4f4f4f4f5|
| f0f1f1f1f1f1f1f1f1f1f1f1f1f1f2|
| | | | | | | | | | | | | | | | |
`);

export default function TargetPracticeGameScene() {
    const { openDialog } = useGame();
    const [isAttacking, setIsAttacking] = useState(false);
    const onGameEnd = useCallback(() => {
        setIsAttacking(false);
    }, []);

    const onAttack = useCallback(() => {
        openDialog({
            dialog: [
                {
                    text: 'Aggghhh',
                    character: 'voldemort',
                },
            ],
            onClose: () => setIsAttacking(true),
        });
    }, [openDialog]);

    const onAttacked = useCallback(() => {
        console.log('attacked');
    }, []);

    return (
        <>
            <GameObject name="map">
                <ambientLight />
                <TileMap data={mapData} resolver={resolveMapTile} definesMapSize />
            </GameObject>

            <GameObject x={8} y={0}>
                <Collider />
                <Interactable />
                <ScenePortal
                    name="start"
                    enterDirection={[0, 1]}
                    target="hogwarts/targetPracticeEnter"
                />
            </GameObject>

            <Player x={8} y={1} onAttacked={onAttacked} />
            <Voldemort x={8} y={5} onAttacked={onAttack} />
            <Nagini x={9} y={5} onAttacked={onAttack} />
            {isAttacking && (
                <SpellcastingOverlay
                    startingLevel={3}
                    maxLevel={5}
                    maxTimePerLevel={5000}
                    onGameEnd={onGameEnd}
                    spellName="stupefy"
                />
            )}
        </>
    );
}
