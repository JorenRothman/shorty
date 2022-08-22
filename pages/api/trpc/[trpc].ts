import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

const stringArray = z.string().array();

type UrlType = z.infer<typeof stringArray>;

const urls: UrlType = [];

export const appRouter = trpc
    .router()
    .query('hello', {
        input: z
            .object({
                text: z.string().nullish(),
            })
            .nullish(),
        resolve({ input }) {
            return {
                greeting: `hello ${input?.text ?? 'world'}`,
            };
        },
    })
    .query('url', {
        resolve() {
            return urls;
        },
    })
    .mutation('url', {
        input: z.object({
            url: z.string(),
        }),
        resolve({ input }) {
            urls.push(input.url);
        },
    });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
});
