# zombie-dice-sveltekit

Hobby project implementation of the game Zombie Dice, to help explore Svelte/Sveltekit and other programming areas. 

## Interest Areas / Todos

- [ ] Custom stores for all the things
  - Stores-as-models. I like this guy's comments:
    - https://www.reddit.com/r/sveltejs/comments/sm51kh/for_large_sveltesveltkit_projects_how_do_you/hvut3ln/
    - https://www.reddit.com/r/sveltejs/comments/s7k3su/organisation_of_large_stores/htaijo1/
- [ ] Finite State Machine(s) for game logic
- [ ] Websockets for real-time messaging
  - Can use relatively simple relay server that broadcasts incoming JSON messages to other clients
  - Can use https://github.com/websockets/ws for this (see /src/server)
- [ ] State transfer awesomeness via async stores over websockets
  - Use https://github.com/square/svelte-store
  - See https://www.youtube.com/watch?v=Rz8Ah1y2hJM
- [x] [SMUI](https://sveltematerialui.com/) and/or [Tailwind CSS](https://tailwindcss.com/)
  - Project has now been rewritten using Tailwind CSS

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
