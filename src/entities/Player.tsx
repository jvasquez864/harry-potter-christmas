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

interface PlayerProps extends GameObjectProps {
    canWalk?: boolean;
}
export default function Player({ canWalk, ...props }: PlayerProps) {
    return (
        <GameObject name="player" displayName="Player" layer="character" {...props}>
            {canWalk && <Moveable />}
            <Interactable />
            <Collider />
            <CharacterScript>
                <Sprite {...spriteData.player} />
            </CharacterScript>
            <CameraFollowScript />
            <PlayerScript canWalk={canWalk} />
            <DialogScript />
        </GameObject>
    );
}

Player.defaultProps = {
    canWalk: true,
};
