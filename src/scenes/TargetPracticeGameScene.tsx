import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import HealthOverlay from '../@core/HealthOverlay';
import { ShootOptions } from '../@core/Attackable';
import useGameLoop from '../@core/useGameLoop';

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
    const { shoot } = useSceneManager();
    const [lastEnemyProjectileTime, setLastEnemyProjectileTime] = useState(-1);
    const [harryHealth, setHarryHealth] = useState(3);
    const [voldemortHealth, setVoldemortHealth] = useState(6);
    const [naginiHealth, setNaginiHealth] = useState(6);

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

    const enemyProjectiles = useCallback((time: number) => {
        const projectiles: ShootOptions[] = [];
        for (let i = 1; i < mapData[0].length - 1; i += 2) {
            projectiles.push({
                direction: [0, -1],
                position: { x: i, y: 8 },
                id: `${i}-${8}-${time}`,
                isHostile: true,
            });
        }
        return projectiles;
    }, []);

    useGameLoop(time => {
        if (lastEnemyProjectileTime !== -1 && time - lastEnemyProjectileTime < 6000) {
            return;
        }
        setLastEnemyProjectileTime(time);
        shoot(enemyProjectiles(time));
    });

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
            <HealthOverlay
                harryHealth={harryHealth}
                voldemortHealth={voldemortHealth}
                naginiHealth={naginiHealth}
            />
        </>
    );
}
