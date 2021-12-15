import React, { Fragment, useEffect, useRef, useState } from 'react';
import useGame from '../@core/useGame';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import { DialogInfo } from '../components/DialogScript';

interface CastleGateScriptProps extends CastleGateProps {
    isOpen: boolean;
}

function CastleGateScript({ dialog, isOpen, gateKey }: CastleGateScriptProps) {
    const { openDialog, setGameState } = useGame();

    useGameObjectEvent<InteractionEvent>('interaction', other => {
        const gateID = `gate-${gateKey}`;
        if (!isOpen) {
            if (other.inventory.includes(`${gateID}-key`) || true) {
                openDialog({
                    dialog: [
                        {
                            text: 'You slide the key in and the gate finally opens!',
                            character: 'harry',
                        },
                        {
                            text:
                                '"Bloody hell, what\'s that sound?  Why do I always end up in these situations...  Let me get my robe before I go in."',
                            character: 'harry',
                        },
                    ],
                });

                // TODO:isolate gaet-1 from other gates too.
                // (need to do this anyway to get the right dialogs)
                const key = `${gateID}-open`;
                setGameState('hogwarts', { [key]: true });
            } else {
                openDialog(dialog);
            }
        }
    });
    return null;
}

interface CastleGateProps extends GameObjectProps {
    dialog: DialogInfo;
    gateKey: string;
}
export default function CastleGate({ x, y, dialog, gateKey, ...props }: CastleGateProps) {
    const { getGameState } = useGame();
    const [rows, columns] = [3, 3];
    const hogwartsState = getGameState('hogwarts') || {};
    const isOpen = hogwartsState[`gate-${gateKey}-open`];
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
                            key={spritePath}
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
                                gateKey={gateKey}
                                dialog={dialog}
                            />
                        </GameObject>
                    );
                })
            )}
        </Fragment>
    );
}
