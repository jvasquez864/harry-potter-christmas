import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'voldemort-spellcast': {
        dialog: [
            {
                text: 'AVADA KEDAVRA',
                character: 'voldemort',
            },
        ],
    },
    'voldemort-projectile': {
        dialog: [
            {
                text: "You can't escape me!",
                character: 'voldemort',
            },
        ],
    },
    'nagini-death': {
        dialog: [
            {
                text: "You can't escape me!",
                character: 'voldemort',
            },
        ],
    },
    win: {
        dialog: [
            {
                text: 'Aghhhhh!',
                character: 'voldemort',
            },
            {
                text: 'Is he dead?  Is it over, Dumbledore?',
                character: 'harry',
            },

            {
                text:
                    "We can't be sure as of now. Let's head back to Hogwarts and find out.",
                character: 'dumbledore',
            },
        ],
    },
    lose: {
        dialog: [
            {
                text:
                    "Harry, you're hurt!  Quick, let's get out of here.  We can come back when you're well rested!",
                character: 'dumbledore',
            },
        ],
    },
};
