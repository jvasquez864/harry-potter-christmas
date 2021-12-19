import { useRef } from 'react';
import useComponentRegistry, { ComponentRef } from './useComponentRegistry';
import useGame from './useGame';
import useGameObject from './useGameObject';
import { GameObjectRef, Position } from './GameObject';
import { PubSubEvent } from './utils/createPubSub';
import { MoveableRef, MoveDirection } from './Moveable';
import useSceneManager from './useSceneManager';

export interface ShootOptions {
    direction: MoveDirection;
    position: Position;
    isHostile?: boolean;
    id: string;
}
export type ShootEvent = PubSubEvent<'shoot', ShootOptions>;
export type AttackEvent = PubSubEvent<'attacked', GameObjectRef>;
export type WasShotEvent = PubSubEvent<'was-shot', GameObjectRef>;

export type AttackableRef = ComponentRef<
    'Attackable',
    {
        attack: (position: Position) => Promise<boolean>;
        onAttack: (ref: GameObjectRef) => Promise<void>;
        shoot: (options?: ShootOptions[], time?: number) => Promise<void>;
        onShot: () => Promise<void>;
    }
>;

export default function InteracAttackabletable() {
    const { findGameObjectsByXY } = useGame();
    const { shoot: sceneShoot } = useSceneManager();
    const { getRef, publish, hasSubscriptions, getComponent } = useGameObject();
    const canInteract = useRef(true);

    useComponentRegistry<AttackableRef>('Attackable', {
        // this is executed on the game object that *initiates* an interaction
        async attack({ x, y }) {
            const attackables = findGameObjectsByXY(x, y).map(obj =>
                obj.getComponent<AttackableRef>('Attackable')
            );

            if (!attackables.length) return false;

            await Promise.all(attackables.map(comp => comp?.onAttack(getRef())));
            return true;
        },
        // this is executed on the game object that *receives* an interaction
        async onAttack(gameObject) {
            if (canInteract.current) {
                canInteract.current = false;
                await publish<AttackEvent>('attacked', gameObject);
                canInteract.current = true;
            }
        },
        async shoot(options?: ShootOptions[], time?: number) {
            if (options) {
                sceneShoot(options);
                return;
            }
            const moveable = getComponent<MoveableRef>('Moveable');
            const projectileDirection = moveable.getMoveDirection();
            const ref = getRef();
            const { x, y } = ref.transform;

            const defaultOoptions: ShootOptions = {
                direction: projectileDirection,
                position: { x, y },
                id: `${x}-${y}-${time}`,
            };
            sceneShoot([defaultOoptions]);
        },
        async onShot() {
            await publish<WasShotEvent>('was-shot', getRef());
        },
    });

    return null;
}
