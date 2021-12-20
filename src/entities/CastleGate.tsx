import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import useGame from '../@core/useGame';
import Collider from '../@core/Collider';
import GameObject, { GameObjectProps } from '../@core/GameObject';
import Interactable, { InteractionEvent } from '../@core/Interactable';
import Sprite from '../@core/Sprite';
import useGameObjectEvent from '../@core/useGameObjectEvent';
import spriteData from '../spriteData';
import { DialogInfo } from '../components/DialogScript';
import { dialogs } from '../dialogs/hogwarts';

interface CastleGateScriptProps extends CastleGateProps {
    isOpen: boolean;
}

function CastleGateScript({ isOpen, gateKey }: CastleGateScriptProps) {
    const { openDialog, setGameState, getGameState } = useGame();
    const gateID = useMemo(() => `gate-${gateKey}`, [gateKey]);
    const keyNumber = parseInt(gateKey[1], 10);
    const level = parseInt(getGameState('level') || 0, 10);
    // eslint-disable-next-line no-eval
    const didLose = eval(getGameState('didJustLose')) ?? true;

    useGameObjectEvent<InteractionEvent>('interaction', other => {
        if (!isOpen) {
            const shouldOpen =
                other.inventory.includes(`${gateID}-key`) ||
                (level >= keyNumber && !didLose);
            if (shouldOpen) {
                openDialog(dialogs[`${gateKey}-opened`]);

                const key = `${gateID}-open`;
                setGameState(key, true);
            } else {
                openDialog(dialogs[`${gateKey}-closed`]);
            }
        }
    });
    return null;
}

interface CastleGateProps extends GameObjectProps {
    gateKey: string;
}
export default function CastleGate({ x, y, gateKey, ...props }: CastleGateProps) {
    const { getGameState } = useGame();
    const [rows, columns] = [3, 3];

    const isOpen = getGameState(`gate-${gateKey}-open`);

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
                            <CastleGateScript isOpen={isOpen} gateKey={gateKey} />
                        </GameObject>
                    );
                })
            )}
        </Fragment>
    );
}
