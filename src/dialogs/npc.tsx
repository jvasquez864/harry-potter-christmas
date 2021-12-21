import { DialogInfo } from '../components/DialogScript';

export const dialogs: { [key: string]: DialogInfo } = {
    'dumbledore-player': {
        dialog: [
            {
                text: 'I have good news and bad news, Harry.',
                character: 'dumbledore',
            },
            {
                text: 'Give me the bad news first...',
                character: 'harry',
            },
            {
                text:
                    'Voldemort is still alive.  He managed to get away, clinging on to the bit of life left in him.',
                character: 'dumbledore',
            },
            {
                text: 'Please tell me the good news.',
                character: 'harry',
            },
            {
                text:
                    "The good news is we know where he went.  We have reports of him taking refuge on an island where muggles travel to destress.  It's an island known as 'Aruba'",
                character: 'dumbledore',
            },
            {
                text: 'Ahhh rooo bah?',
                character: 'harry',
            },
            {
                text:
                    'Yes. If we act now, I believe we can finish him off before he has a chance to recover.  Get your essentials ready, Harry.',
                character: 'dumbledore',
            },
            {
                text: "Let's put an end to this.",
                character: 'harry',
            },
        ],
    },
};
