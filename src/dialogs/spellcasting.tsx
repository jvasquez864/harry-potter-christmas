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
    'learn-patronum': {
        dialog: [
            {
                text:
                    'This next one is one you should be very familiar with - Expecto Patronum. This Patronus Charm is an extremely powerful beacon of hope and happiness that will drive away Dementors',
                character: 'dumbledore',
            },
            {
                text: 'I know, Professor.',
                character: 'harry',
            },
            {
                text: "No you don't. Quiet boy.",
                character: 'dumbledore',
            },
            {
                text: '...',
                character: 'harry',
            },

            {
                text:
                    "We can't risk you being ambushed by dementors.  We no longer know who we can and cannot trust, so we must be prepared at all times.",
                character: 'dumbledore',
            },

            {
                text: 'You know how this test works.  Are you ready?\n\n Good. Begin!',
                character: 'dumbledore',
            },
        ],
    },

    'learn-patronum-win': {
        dialog: [
            {
                text:
                    "Well done once again, Harry!  This one was a bit more challenging, but this is no time to celebrate.  Let's move on to the last spell.",
                character: 'dumbledore',
            },
        ],
    },
    'learn-patronum-loss': {
        dialog: [
            {
                text:
                    "Very close, Harry!  Don't give up when things get tougher.  Let's try again.",
                character: 'dumbledore',
            },
        ],
    },
    'learn-geminio': {
        dialog: [
            {
                text:
                    'This last one can get very tricky.  This spell is called Geminio, and when cast successfully will duplicate the object. Or should I say, the subject.',
                character: 'dumbledore',
            },
            {
                text: 'The subject?',
                character: 'harry',
            },
            {
                text:
                    'Yes, Harry.  You will be using this on your reflection in the water of this barrel.  You are the subject, Harry.',
                character: 'dumbledore',
            },
            {
                text: "I don't even know why I'm surprised anymore.",
                character: 'harry',
            },
            {
                text: 'Professor!  I can show Harry how to do it!  May I?',
                character: 'hermione',
            },
            {
                text:
                    'No, Ms. Granger.  We both know you can do this. Let the boy practice. Are you ready, Harry?',
                character: 'dumbledore',
            },

            {
                text: 'I think so.',
                character: 'harry',
            },
            {
                text: 'Good. Begin!',
                character: 'dumbledore',
            },
        ],
    },
    'learn-geminio-win': {
        dialog: [
            {
                text: 'Well done, Harry!  You look better than ever.  You may be ready.',
                character: 'dumbledore',
            },
        ],
    },
    'learn-geminio-loss': {
        dialog: [
            {
                text: "Don't give up, Harry!  This is why we're here.  Let's try again.",
                character: 'dumbledore',
            },
        ],
    },
    'spell-already-complete': {
        dialog: [
            {
                text:
                    "You've spent enough time on this one - I think you're ready to move on.",
                character: 'dumbledore',
            },
        ],
    },
    'prerequisite-required': {
        dialog: [
            {
                text:
                    "Let's not get ahead of ourselves, Harry.  Come back once you've completed the previous spells.",
                character: 'dumbledore',
            },
        ],
    },
    'level-complete': {
        dialog: [
            {
                text:
                    "There's a strange and ominious energy, Harry. I'm sure you feel it too.  Enough of this, let's proceed.",
                character: 'dumbledore',
            },
        ],
    },
    'play-again': {
        dialog: [
            {
                text: "Come back for more I see?  Very well.  Show me what you've got!",
                character: 'dumbledore',
            },
        ],
    },
};
