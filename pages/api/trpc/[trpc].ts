import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import prisma from '../../../server/prisma';

export const appRouter = trpc
    .router()
    .query('url', {
        async resolve() {
            const urls = await prisma.url.findMany();

            return urls;
        },
    })
    .mutation('url', {
        input: z.object({
            url: z.string(),
        }),
        resolve({ input }) {
            const { url } = input;

            const date = new Date();

            return prisma.url.create({
                data: {
                    url,
                    shortUrl: date.getTime().toString(36),
                },
            });
        },
    });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
    batching: {
        enabled: true,
    },
});
