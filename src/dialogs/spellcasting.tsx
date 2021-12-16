import { DialogInfo } from 'src/components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'learn-stupefy': {
        dialog: [
            {
                text:
                    'This first one is an old favorite.  Simple, but very effective - Stupefy, also known as the Stunning spell.  This spell will freeze objects and make living targets unconscious.',
                character: 'dumbledore',
            },
            {
                text:
                    "Why are we spending time with these spells, Professor?  Shouldn't we be working on more important things?",
                character: 'harry',
            },
            {
                text: 'These are important things, Harry.  Are you ready?',
                character: 'dumbledore',
            },
            {
                text:
                    "Perfect.  Let me explain how this will work then.  For each cast of the spell, you will be presented a series of arrows.  Use the arrow keys on your keyboard to press the arrows in the order they appear.  If you're too slow, you lose.  Got it?",
                character: 'dumbledore',
            },
            {
                text:
                    'You will have a few seconds to get each set of arrows correct.  If you run out of time or fail 3 times, you lose.  Got it?',
                character: 'dumbledore',
            },
            {
                text: 'Sounds simple enough.',
                character: 'harry',
            },

            {
                text: 'Very well. Begin!',
                character: 'dumbledore',
            },
        ],
    },
    'learn-stupefy-win': {
        dialog: [
            {
                text:
                    "Well done, Harry!  But this is just the beginning.  Let's move on to the more difficult spells.",
                character: 'dumbledore',
            },
        ],
    },

    'learn-stupefy-loss': {
        dialog: [
            {
                text:
                    "Very close, Harry!  This is why we need to revisit the fundamentals.  Let's try again.",
                character: 'dumbledore',
            },
        ],
    },
};
