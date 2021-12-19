import React, { useCallback, useEffect, useRef, useState } from 'react';
import Moveable, { MoveDirection, MoveableRef, CannotMoveEvent } from '../@core/Moveable';
import useGameLoop from '../@core/useGameLoop';
import Collider, { CollisionEvent } from '../@core/Collider';
import GameObject, { GameObjectProps, Position } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';
import useSceneManager from '../@core/useSceneManager';
import usePathfinding from '../@core/usePathfinding';
import useLineOfSightPath from '../@core/useLineOfSightPath';
import { AttackableRef, WasShotEvent } from '../@core/Attackable';
import useGame from '../@core/useGame';

interface ProjectileScriptProps extends GameObjectProps {
    direction: MoveDirection;
    id: string;
    isHostile?: boolean;
    destroySelf?: () => void;
}
type ProjectileProps = GameObjectProps & ProjectileScriptProps;

function ProjectileScript({ direction, id }: ProjectileScriptProps) {
    const { getComponent, getRef, transform } = useGameObject();
    const { findGameObjectsByXY } = useGame();
    const workState = useRef(false);
    const [lastMoveTime, setLastMoveTime] = useState(0);
    const { removeProjectile } = useSceneManager();
    const [path, setPath] = useState<Position[]>([]);
    const findPath = usePathfinding();
    const lineOfSightPath = useLineOfSightPath();

    useGameObjectEvent<CannotMoveEvent>('cannot-move', async position => {
        //  Triggered by projectile moving onto something
        const { x, y } = position;
        const attackables = findGameObjectsByXY(x, y).map(obj =>
            obj.getComponent<AttackableRef>('Attackable')
        );
        attackables.forEach(attackable => {
            attackable?.onShot();
        });

        // Setting to disabled is actually more performant than removing the projectile
        getRef().setDisabled(true);
        // removeProjectile(id);
    });

    useGameObjectEvent<CollisionEvent>('collision', async () => {
        //  Triggered by projectile being hit by something (i.e shooting two projectiles at eachother, or walking into one)
        // await publish<WasShotEvent>('was-shot');
        getRef().setDisabled(true);
    });

    // useGameLoop(time => {
    //     if (time - lastMoveTime < 800) {
    //         return;
    //     }

    //     setLastMoveTime(time);
    //     const { x, y } = getRef().transform;
    //     const nextPosition = { x: x + direction[0] * 5, y: y + direction[1] * 5 };
    //     getComponent<MoveableRef>('Moveable')?.move(nextPosition);
    // });

    // Trigger movement
    useEffect(() => {
        try {
            const nextPath = lineOfSightPath();

            if (path.length > 0) {
                nextPath.unshift(transform);
            }
            setPath(nextPath);
        } catch {
            // pointer out of bounds
            setPath([]);
        }
    }, [findPath, path.length, transform, lineOfSightPath]);

    // traverse the path
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

    // useGameObjectEvent<InteractionEvent>('interaction', () => {
    //     workState.current = !workState.current;

    //     if (workState.current) {
    //         getComponent<SpriteRef>('Sprite').setState('crate');
    //     } else {
    //         getComponent<SpriteRef>('Sprite').setState('workstation-1');
    //     }

    //     return waitForMs(400);
    // });

    return null;
}

export default function Projectile({
    direction,
    id,
    isHostile,
    ...props
}: ProjectileProps) {
    const spriteInfo = isHostile ? spriteData['enemy-projectile'] : spriteData.projectile;
    return (
        <GameObject {...props}>
            <Sprite {...spriteInfo} rotate={Boolean(direction[1])} />
            <Moveable initialMoveDirection={direction} isProjectile />
            <Collider />
            <Interactable />
            <ProjectileScript id={id} direction={direction} />
        </GameObject>
    );
}
