import React from 'react';
import DialogScript from '../components/DialogScript';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable from '../@core/Interactable';
import Moveable from '../@core/Moveable';
import Sprite from '../@core/Sprite';
import CameraFollowScript from '../components/CameraFollowScript';
import CharacterScript from '../components/CharacterScript';
import PlayerScript from '../components/PlayerScript';
import spriteData from '../spriteData';
import useGameObject from '../@core/useGameObject';
import Attackable from '../@core/Attackable';

interface PlayerProps extends GameObjectProps {
    canWalk?: boolean;
    onAttacked?: () => void;
}
const Player = React.forwardRef(function PlayerInner({
    canWalk,
    onAttacked,
    ...props
}: PlayerProps) {
    return (
        <GameObject
            // ref={ref}
            name="player"
            displayName="Player"
            layer="character"
            {...props}
        >
            {canWalk && <Moveable />}
            <Interactable />
            <Attackable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteData.player} />
            </CharacterScript>
            <CameraFollowScript />
            <PlayerScript canWalk={canWalk} onAttacked={onAttacked} />
            <DialogScript />
        </GameObject>
    );
});

Player.defaultProps = {
    canWalk: true,
    onAttacked: () => {
        /* No-op */
    },
};

export default Player;
