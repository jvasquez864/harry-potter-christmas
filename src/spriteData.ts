import { SpriteProps } from './@core/Sprite';

const spriteData: { [index: string]: SpriteProps } = {
    ui: {
        src: './assets/ui.png',
        sheet: {
            'self-select': [
                [4, 0],
                [5, 0],
            ],
            select: [[4, 0]],
            dot: [[1, 0]],
            solid: [[0, 1]],
        },
    },
    player: {
        src: './assets/player.png',
        frameWidth: 20,
        frameHeight: 20,
        frameTime: 300,
        sheet: {
            default: [[0, 2]],
            walk: [
                [1, 2],
                [2, 2],
            ],
            action: [
                [0, 1],
                [2, 1],
            ],
        },
    },
    objects: {
        src: './assets/objects2.png',
        frameWidth: 32,
        frameHeight: 32,
        sheet: {
            floor: [[0, 4]],
            'wall-top': [[4, 13]],
            'wall-side': [[1, 11]],
            'workstation-1': [[0, 1]],
            'workstation-2': [[1, 1]],
            'coffee-machine': [[2, 1]],
            'coffee-machine-empty': [[3, 1]],
            pizza: [[4, 1]],
            plant: [[0, 2]],
            //

            grass1: [[0, 4]],
            'grass2-0': [[1, 3]],
            'grass2-1': [[2, 3]],
            'grass3-0': [[0, 0]],
            'grass3-1': [[1, 0]],
            'grass3-2': [[2, 0]],
            'grass3-3': [[0, 1]],
            'grass3-4': [[1, 1]],
            'grass3-5': [[2, 1]],
            'grass3-6': [[0, 2]],
            'grass3-7': [[1, 2]],
            'grass3-8': [[2, 2]],
            'vendor-1': [[0, 5]],
            'vendor-2': [[1, 5]],
            'vendor-3': [[0, 6]],
            'vendor-4': [[1, 6]],
            'castle-wall-1': [[6, 9]],
            'castle-wall-2': [[7, 9]],
            'castle-wall-3': [[9, 9]],
            'castle-wall-4': [[6, 10]],
            'castle-wall-5': [[7, 10]],
            'castle-wall-6': [[9, 10]],
            'castle-wall-7': [[6, 11]],
            'castle-wall-8': [[7, 11]],
            'castle-wall-9': [[9, 11]],
            'castle-wall-a': [[6, 12]],
            'castle-wall-b': [[7, 12]],
            'castle-wall-c': [[8, 12]],
            'castle-wall-d': [[9, 12]],
            'castle-wall-e': [[6, 13]],
            'castle-wall-f': [[7, 13]],
            'castle-wall-g': [[8, 13]],
            'castle-wall-h': [[9, 13]],
            'castle-wall-i': [[6, 15]],
            'castle-wall-j': [[7, 15]],
            'castle-wall-k': [[8, 15]],
            'castle-wall-l': [[9, 15]],
            crate: [[9, 0]],
            barrel: [[9, 1]],
            lemon: [[4, 7]],
            'mantle-red-1': [[9, 6]],
            'mantle-red-2': [[9, 7]],
            'mantle-blue-1': [[10, 6]],
            'mantle-blue-2': [[10, 7]],
            'sword-1': [[0, 8]],
            'sword-2': [[0, 9]],
            'castle-gate-0': [[10, 10]],
            'castle-gate-1': [[11, 10]],
            'castle-gate-2': [[12, 10]],
            'castle-gate-3': [[10, 11]],
            'castle-gate-4': [[11, 11]],
            'castle-gate-5': [[12, 11]],
            'castle-gate-6': [[10, 12]],
            'castle-gate-7': [[11, 12]],
            'castle-gate-8': [[12, 12]],
            'castle-gate-open-0': [[13, 10]],
            'castle-gate-open-1': [[14, 10]],
            'castle-gate-open-2': [[15, 10]],
            'castle-gate-open-3': [[13, 11]],
            'castle-gate-open-4': [[14, 11]],
            'castle-gate-open-5': [[15, 11]],
            'castle-gate-open-6': [[13, 12]],
            'castle-gate-open-7': [[14, 12]],
            'castle-gate-open-8': [[15, 12]],
            'castle-gate-wall': [[7, 10]],
            'castle-gate-wall-foot': [[7, 9]],
            lantern: [[4, 8]],
            stump: [[0, 7]],
            'dead-grass': [[4, 3]],
            'gravel-0': [[6, 3]],
            'gravel-1': [[7, 3]],
            'gravel-2': [[8, 3]],
            'gravel-3': [[6, 4]],
            'gravel-4': [[7, 4]],
            'gravel-5': [[8, 4]],
            'gravel-6': [[6, 5]],
            'gravel-7': [[7, 5]],
            'gravel-8': [[8, 5]],
        },
    },
    footstep: {
        src: './assets/footstep.png',
        sheet: {
            default: [
                [0, 0],
                [2, 0],
            ],
        },
        opacity: 0.75,
        frameTime: 150,
    },
};

export default spriteData;
