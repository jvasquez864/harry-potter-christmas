import React, { useRef, useState } from 'react';
import Moveable, { MoveDirection, MoveableRef, CannotMoveEvent } from '../@core/Moveable';
import useGameLoop from '../@core/useGameLoop';
import Collider, { CollisionEvent } from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';

interface ProjectileScriptProps extends GameObjectProps {
    direction: MoveDirection;
    destroySelf?: () => void;
}
type ProjectileProps = GameObjectProps & ProjectileScriptProps;

function ProjectileScript({ direction, destroySelf }: ProjectileScriptProps) {
    const { getComponent, getRef } = useGameObject();
    const workState = useRef(false);
    const [lastMoveTime, setLastMoveTime] = useState(-1);

    useGameObjectEvent<CannotMoveEvent>('cannot-move', () => {
        console.log('hit something');
        getRef().setDisabled(true);
    });

    useGameLoop(time => {
        if (lastMoveTime !== -1 && time - lastMoveTime < 800) {
            return;
        }

        setLastMoveTime(time);
        const { x, y } = getRef().transform;
        const nextPosition = { x: x + direction[0], y: y + direction[1] };
        getComponent<MoveableRef>('Moveable')?.move(nextPosition);
    });

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

export default function Projectile({ direction, ...props }: ProjectileProps) {
    return (
        <GameObject {...props}>
            <Sprite {...spriteData.projectile} rotate={Boolean(direction[1])} />
            <Moveable />
            <Collider isTrigger />
            <Interactable />
            <ProjectileScript direction={direction} />
        </GameObject>
    );
}
