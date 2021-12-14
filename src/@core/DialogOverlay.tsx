import React, { useEffect, useRef } from 'react';
import { HTML, HTMLProps } from 'drei';
import { useFrame, useThree } from 'react-three-fiber';
import useGame from './useGame';
import useWindowSize from './useWindowSize';
import dialog, { flash, flashingArrow } from '../styles/dialog';

export default function DialogOverlay({ children, ...props }: HTMLProps) {
    const { paused, isDialogOpen, dialogInfo, currentDialogPageIndex } = useGame();
    const node = useRef<HTMLDivElement>();
    const three = useThree();
    const [width, height] = useWindowSize();
    const { x, y } = three.camera.position;

    // useEffect(() => {
    //     if (node.current?.parentElement) {
    //         node.current.parentElement.style.pointerEvents = 'none';
    //         node.current.parentElement.style.whiteSpace = 'nowrap';
    //     }
    // });
    // useFrame(() => console.log(three.camera));
    if (paused || !isDialogOpen) return null;

    return (
        <HTML position={[x - 8, y, 11]} ref={node} zIndexRange={[10, 10]} {...props}>
            <div css={dialog()}>
                <div>{dialogInfo.dialog[currentDialogPageIndex]}</div>
                <div css={flashingArrow()} />
            </div>
        </HTML>
    );
}
