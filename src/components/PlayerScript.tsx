import React, { useCallback, useEffect, useState } from 'react';
import useGame from '../@core/useGame';
import { Position } from '../@core/GameObject';
import { InteractableRef } from '../@core/Interactable';
import { MoveableRef } from '../@core/Moveable';
import useCollisionTest from '../@core/useCollisionTest';
import useGameLoop from '../@core/useGameLoop';
import useGameObject from '../@core/useGameObject';
import useKeyPress from '../@core/useKeyPress';
import usePathfinding from '../@core/usePathfinding';
import usePointer from '../@core/usePointer';
import usePointerClick from '../@core/usePointerClick';
import tileUtils from '../@core/utils/tileUtils';
import PlayerPathOverlay from './PlayerPathOverlay';
import { AttackableRef, AttackEvent, WasShotEvent } from '../@core/Attackable';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import useKeyActions from 'src/@core/useKeyActions';
import soundData from '../soundData';
import { useSound } from '../@core/Sound';

interface PlayerProps {
    canWalk: boolean;
    onAttacked: () => void;
    onShot: () => void;
}
export default function PlayerScript({ canWalk, onAttacked, onShot }: PlayerProps) {
    const { getComponent, transform, publish } = useGameObject();
    const { isDialogOpen } = useGame();
    const testCollision = useCollisionTest();
    const findPath = usePathfinding();
    const [path, setPath] = useState<Position[]>([]);
    const [pathOverlayEnabled, setPathOverlayEnabled] = useState(true);
    const [lastFireTime, setLastFireTime] = useState(0);
    // const playStupefy = useSound(soundData.stupefy);

    useGameObjectEvent<AttackEvent>('attacked', () => {
        onAttacked();
    });

    useGameObjectEvent<WasShotEvent>('was-shot', isHostile => {
        // Should only be affected by hostil npc projectiles
        isHostile && onShot();
    });

    const handleProjectileFile = useCallback(
        time => {
            // Limit firing to once every 1.5 secs
            if (time - lastFireTime < 800) {
                return;
            }
            setLastFireTime(time);
            getComponent<AttackableRef>('Attackable')?.shoot(null, time);
            // playStupefy();
        },
        [getComponent, lastFireTime]
    );

    // key controls
    const leftKey = useKeyPress(['a']);
    const rightKey = useKeyPress(['d']);
    const upKey = useKeyPress(['w']);
    const downKey = useKeyPress(['s']);
    const spaceBar = useKeyPress([' ']);

    useGameLoop(time => {
        if (isDialogOpen || !canWalk) return;
        if (spaceBar) {
            handleProjectileFile(time);
            return;
        }
        const direction = {
            x: -Number(leftKey) + Number(rightKey),
            y: Number(upKey) - Number(downKey),
        };
        const nextPosition = tileUtils(transform).add(direction);
        // is same position?
        if (tileUtils(nextPosition).equals(transform)) return;

        // is already moving?
        if (!getComponent<MoveableRef>('Moveable')?.canMove()) return;

        // will cut corner?
        const horizontal = { ...transform, x: nextPosition.x };
        const vertical = { ...transform, y: nextPosition.y };
        const canCross =
            direction.x !== 0 && direction.y !== 0
                ? // test diagonal movement
                  testCollision(horizontal) && testCollision(vertical)
                : true;

        if (canCross) {
            setPath([nextPosition]);
            setPathOverlayEnabled(false);
        }
    });

    // mouse controls
    const pointer = usePointer();

    const resolvePointerMovement = useCallback(() => {
        try {
            const nextPath = findPath({ to: pointer });
            // Try interaction on last th
            (async () => {
                const [nextPosition] = nextPath;
                nextPath.length === 1 && // try interaction on last step of path
                    (await getComponent<InteractableRef>('Interactable')?.interact(
                        nextPosition
                    ));
            })();

            if (path.length > 0) {
                nextPath.unshift(transform);
            }
            setPath(nextPath);
            setPathOverlayEnabled(true);
        } catch {
            // pointer out of bounds
            setPath([]);
        }
    }, [findPath, getComponent, path.length, pointer, transform]);

    const resolvePointerInteraction = useCallback(() => {
        try {
            getComponent<AttackableRef>('Attackable')?.attack(pointer);
        } catch {
            // pointer out of bounds
            setPath([]);
        }
    }, [getComponent, pointer]);

    usePointerClick(event => {
        if (isDialogOpen || !canWalk) return;
        if (event.button === 0) {
            resolvePointerMovement();
        } else if (event.button === 2) {
            resolvePointerInteraction();
        }
    });

    // walk the path
    useEffect(() => {
        if (!path.length || !canWalk) return;

        const [nextPosition] = path;

        (async () => {
            const anyAction = await getComponent<MoveableRef>('Moveable')?.move(
                nextPosition
            );
            if (anyAction) {
                // proceed with next step in path
                setPath(current => current.slice(1));
            }
        })();
    }, [path, getComponent, canWalk]);

    return (
        <PlayerPathOverlay
            path={path}
            pathVisible={pathOverlayEnabled}
            pointer={pointer}
        />
    );
}
