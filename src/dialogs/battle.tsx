import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    intro: {
        dialog: [
            {
                text:
                    "It can't be... How does Voldemort feel so powerful.  This is worse than I thought, Harry...",
                character: 'dumbledore',
            },
            {
                text: 'What should we do, Dumbledore?',
                character: 'harry',
            },
            {
                text:
                    "The only thing we can do.  Fight.  This is what we've been preparing for. I believe in you, Harry.\nLet me explain to you how this will work.",
                character: 'dumbledore',
            },

            {
                text:
                    'Voldemort is going to alternate between trying to invade your mind, and casting various spells at you, including the killing curse.',
                character: 'dumbledore',
            },
            {
                text:
                    "You already know how to stop him from accessing your mind, and how to battle against some spells, but we haven't seen the killing curse in a long time.  You survived once, but let's not test our luck.  If you see it coming, do not let it hit you.",
                character: 'dumbledore',
            },
            {
                text:
                    "It looks like Nagini is protecting Voldemort, so you may not be able to hurt him until you take care of that little brat first.  You can shoot your own spells in whichever direction you're  facing by pressing the space bar.  I hope you got all that.",
                character: 'dumbledore',
            },
            {
                text: 'Are you ready?',
                character: 'dumbledore',
            },
            {
                text: 'No.',
                character: 'harry',
            },
            {
                text: 'Good.  Go!',
                character: 'dumbledore',
            },
        ],
    },
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
    'voldemort-memory': {
        dialog: [
            {
                text: 'I know your every move, Harry!',
                character: 'voldemort',
            },
        ],
    },
    'nagini-death': {
        dialog: [
            {
                text: 'NAGINI! NO! You will pay for this, Harry.',
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
