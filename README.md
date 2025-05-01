# Posthog

[![npm](https://img.shields.io/npm/v/@gramio/posthog?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/posthog)
[![npm downloads](https://img.shields.io/npm/dw/@gramio/posthog?logo=npm&style=flat&labelColor=000&color=3b82f6)](https://www.npmjs.org/package/@gramio/posthog)
[![JSR](https://jsr.io/badges/@gramio/posthog)](https://jsr.io/@gramio/posthog)
[![JSR Score](https://jsr.io/badges/@gramio/posthog/score)](https://jsr.io/@gramio/posthog)

```ts
import { PostHog } from "posthog-node";
import { posthogPlugin } from "@gramio/posthog";
import { Bot } from "gramio";

const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
    host: process.env.POSTHOG_HOST,
});

const bot = new Bot(process.env.BOT_TOKEN!)
    .extend(posthogPlugin(posthog))
    .on("message", (context) => {
        context.capture("message", {
            text: context.message.text,
        });

        throw new Error("Will be captured by PostHog");
    });

await bot.start();
```

For better documentation, see the [GramIO - PostHog](https://gramio.dev/plugins/posthog).
