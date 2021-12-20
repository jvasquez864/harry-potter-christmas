import React, { useEffect, useState } from 'react';
import useGame from '../@core/useGame';
import { Position } from '../@core/GameObject';
import { InteractableRef, InteractionEvent } from '../@core/Interactable';
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
import useGameObjectEvent from '../@core/useGameObjectEvent';
import { AttackEvent, WasShotEvent } from 'src/@core/Attackable';

interface HostileNPCScriptProps {
    canWalk?: boolean;
    patrol?: boolean;
    onAttacked: () => void;
    onShot: () => void;
}
export default function HostileNPCScript({
    canWalk,
    patrol,
    onShot,
    onAttacked,
}: HostileNPCScriptProps) {
    const { getComponent, transform } = useGameObject();
    const { isDialogOpen, openDialog } = useGame();
    const testCollision = useCollisionTest();
    const findPath = usePathfinding();
    const [path, setPath] = useState<Position[]>([]);
    const [lastMoveTime, setLastMoveTime] = useState(-1);

    useGameObjectEvent<AttackEvent>('attacked', () => {
        onAttacked();
    });

    useGameObjectEvent<WasShotEvent>('was-shot', isHostile => {
        // Hostile NPC's shouldnt be affected by hostile projectiles
        !isHostile && onShot();
    });

    useGameLoop(time => {
        if (isDialogOpen || !patrol) return;
        const timeSinceLastMove = time - lastMoveTime;
        if (lastMoveTime !== -1 && timeSinceLastMove < 1000) {
            return;
        }
        setLastMoveTime(time);
        // Random number between -1 and 1;
        const x = Math.floor(Math.random() * 3) - 1;
        const y = Math.floor(Math.random() * 3) - 1;
        const direction = { x, y };
        const nextPosition = tileUtils(transform).add(direction);
        // is same position?
        if (tileUtils(nextPosition).equals(transform)) return;

        // is already moving?
        if (getComponent<MoveableRef>('Moveable')?.isMoving()) return;

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
        }
    });

    // walk the path
    useEffect(() => {
        if (!path.length) return;

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
    }, [path, getComponent]);

    return null;
    // return (
    //     <PlayerPathOverlay
    //         path={path}
    //         pathVisible={pathOverlayEnabled}
    //         pointer={pointer}
    //     />
    // );
}
