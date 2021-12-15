import React, { Fragment, useEffect, useRef, useState } from 'react';
import useGame from '../@core/useGame';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite, { SpriteRef } from '../@core/Sprite';
import useGameObject from '../@core/useGameObject';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import waitForMs from '../@core/utils/waitForMs';
import spriteData from '../spriteData';
import { DialogInfo } from '../components/DialogScript';
import { TileMapUpdateEvent } from '../@core/TileMap';
import useSceneManager from '../@core/useSceneManager';

interface CastleGateScriptProps extends CastleGateProps {
    isOpen: boolean;
    updateIsOpen: (val: boolean) => void;
}

function CastleGateScript({ dialog, isOpen, updateIsOpen }: CastleGateScriptProps) {
    const { openDialog, publish, setGameState, isDialogOpen } = useGame();
    const { resetScene } = useSceneManager();
    const { getComponent } = useGameObject();

    useGameObjectEvent<InteractionEvent>('interaction', other => {
        if (!isOpen) {
            if (other.inventory.includes('gate-1-key')) {
                updateIsOpen(true);
                openDialog({
                    character: 'harry',
                    dialog: [
                        'You slide the key in and the gate finally opens!',
                        '"Bloody hell, what\'s that sound?  Why do I always end up in these situations...  Let me get my robe before I go in."',
                    ],
                    onClose: () => {
                        resetScene();
                    },
                });

                // TODO:isolate gaet-1 from other gates too.
                // (need to do this anyway to get the right dialogs)
                const { x, y } = other.transform;
                setGameState('hogwarts', { 'gate-1-open': true, position: { x, y } });
            } else {
                openDialog(dialog);
            }
        }
    });
    return null;
}

interface CastleGateProps extends GameObjectProps {
    dialog: DialogInfo;
}
export default function CastleGate({ x, y, dialog, ...props }: CastleGateProps) {
    const { getGameState } = useGame();
    const [rows, columns] = [3, 3];
    const hogwartsState = getGameState('hogwarts') || {};
    const [isOpen, setIsOpen] = useState(hogwartsState['gate-1-open']);
    return (
        <Fragment>
            {[...Array(rows)].map((_, yOffset) =>
                [...Array(columns)].map((__, xOffset) => {
                    const tileVariantNumber = rows * yOffset + xOffset;
                    const spritePath = isOpen
                        ? `castle-gate-open-${tileVariantNumber}`
                        : `castle-gate-${tileVariantNumber}`;
                    return (
                        <GameObject
                            key={`gate-${xOffset}-${yOffset}`}
                            x={x + xOffset}
                            y={y + yOffset}
                            {...props}
                            layer="wall"
                        >
                            <Sprite {...spriteData.objects} state={spritePath} />
                            <Collider />
                            <Interactable />
                            <CastleGateScript
                                isOpen={isOpen}
                                updateIsOpen={setIsOpen}
                                dialog={dialog}
                            />
                        </GameObject>
                    );
                })
            )}
        </Fragment>
    );
}
