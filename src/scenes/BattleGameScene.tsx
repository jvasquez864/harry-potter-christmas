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

type AttackType = 'projectile' | 'spellcast';
export default function BattleGameScene() {
    const { openDialog, isDialogOpen, setGameState } = useGame();
    const [isSpellcasting, setIsSpellcasting] = useState(false);
    const { shoot, resetScene, setScene } = useSceneManager();
    const [lastAttackTime, setLastAttackTime] = useState(-1);
    const [harryHealth, setHarryHealth] = useState(3);
    const [voldemortHealth, setVoldemortHealth] = useState(6);
    const [naginiHealth, setNaginiHealth] = useState(6);
    const [nextAttackType, setNextAttackType] = useState<AttackType>('projectile');

    useGameEvent<SceneReadyEvent>('scene-ready', () => {
        openDialog(dialogs.intro);
    });

    const onWin = useCallback(() => {
        // show dialog then go to hogwarts
        setGameState('level', 3);
        setGameState('didJustLose', false);
        openDialog({ ...dialogs.win, onClose: () => setScene('dumbelldoreChamber') });
    }, [openDialog, setScene, setGameState]);

    const onLose = useCallback(() => {
        // show dialog then reset scene

        setGameState('level', 3);
        setGameState('didJustLose', true);
        openDialog({ ...dialogs.lose, onClose: () => resetScene() });
    }, [openDialog, resetScene, setGameState]);

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

    const handleSpellcast = useCallback(() => {
        openDialog({
            ...dialogs['voldemort-spellcast'],
            onClose: () => {
                setIsSpellcasting(true);
            },
        });
    }, [openDialog]);

    const handleProjectile = useCallback(
        (time: number) => {
            openDialog({
                ...dialogs['voldemort-projectile'],
                onClose: async () => {
                    const interval = 1500;
                    setNextAttackType('spellcast');
                    shoot(enemyProjectiles(time));
                    await waitForMs(interval);
                    shoot(enemyProjectiles(time + interval));
                    await waitForMs(interval);
                    shoot(enemyProjectiles(time + 2 * interval));
                },
            });
        },
        [enemyProjectiles, shoot, openDialog]
    );

    const onHarryShot = useCallback(() => {
        setHarryHealth(health => {
            const newHealth = health - 1;
            if (newHealth <= 0) {
                onLose();
                return newHealth;
            }
            return health - 1;
        });
    }, [onLose]);

    const onNaginiShot = useCallback(() => {
        setNaginiHealth(health => {
            const newHealth = health - 1;
            if (newHealth <= 0) {
                openDialog(dialogs['nagini-death']);
            }
            return health - 1;
        });
    }, [openDialog]);

    const onVoldemortShot = useCallback(() => {
        setNaginiHealth(naginiHP => {
            if (naginiHP > 0) {
                // openDialog()
                // win condition
                return naginiHP;
            }
            setVoldemortHealth(health => {
                const newHealth = health - 1;
                if (health - 1 <= 0) {
                    onWin();
                }
                return newHealth;
            });
            return naginiHP;
        });
    }, [onWin]);

    const onSpellcastingEnd = useCallback(
        (didWin: boolean) => {
            setIsSpellcasting(false);
            if (!didWin) {
                onHarryShot();
            }
        },
        [onHarryShot]
    );

    useGameLoop(time => {
        if (time - lastAttackTime < 15000 || isDialogOpen || isSpellcasting) {
            return;
        }
        if (lastAttackTime === -1) {
            setLastAttackTime(time);
            return;
        }
        if (nextAttackType === 'spellcast') {
            setNextAttackType('projectile');
            handleSpellcast();
        } else {
            handleProjectile(time);
        }
        setLastAttackTime(time);
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
                    target="hogwarts/battlegroundEnter"
                />
            </GameObject>

            <Player x={8} y={1} onShot={onHarryShot} />
            <Voldemort x={8} y={5} patrol={naginiHealth === 0} onShot={onVoldemortShot} />
            {naginiHealth > 0 && <Nagini x={9} y={5} onShot={onNaginiShot} />}
            {isSpellcasting && (
                <SpellcastingOverlay
                    startingLevel={5}
                    maxLevel={7}
                    maxTimePerLevel={3000}
                    onGameEnd={onSpellcastingEnd}
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
