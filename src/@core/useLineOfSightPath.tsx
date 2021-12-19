import { useCallback } from 'react';
import findPath from './utils/findPath';
import { Position } from './GameObject';
import useGameObject from './useGameObject';
import useMapSnapshot from './useMapSnapshot';
import { MoveableRef } from './Moveable';
import useCollisionTest from './useCollisionTest';
import useGame from './useGame';

export default function useLineOfSightPath() {
    const { transform, getComponent } = useGameObject() || {}; // optional
    const { mapSize } = useGame();
    const testCollision = useCollisionTest();

    return useCallback(() => {
        const path = [];
        const { x, y } = transform;
        const [mapWidth, mapHeight] = mapSize;
        const moveDirection = getComponent<MoveableRef>('Moveable').getMoveDirection();
        if (moveDirection[0] === 0 && moveDirection[1] === 0) {
            return [];
        }
        let row = y + moveDirection[1];
        let column = x + moveDirection[0];
        while (row < mapHeight && row >= 0 && column < mapWidth && column >= 0) {
            const position = { x: column, y: row };
            path.push(position);
            if (testCollision(position)) {
                return path;
            }
            row += moveDirection[1];
            column += moveDirection[0];
        }

        return path;
    }, [transform, testCollision, getComponent, mapSize]);
}
