import type { NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
    const hello = trpc.useQuery(['hello', { text: 'client' }]);
    const custom = trpc.useQuery(['custom', { text: 'hello' }]);

    const mutation = trpc.useMutation(['url']);

    const onClick = async () => {
        const url = 'https://google.com';

        mutation.mutate({ url });
    };

    if (!hello.data) {
        return <div>loading...</div>;
    }

    if (!custom.data) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Shorty</title>
                <meta name="description" content="A simple URL shortener" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <p>{hello.data.greeting}</p>
            <p>{custom.data.string}</p>

            <button onClick={() => onClick()}>Add URL</button>
        </div>
    );
};

export default Home;
