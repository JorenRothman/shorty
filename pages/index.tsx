import { url } from 'inspector';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
    const utils = trpc.useContext();

    const urls = trpc.useQuery(['url']);

    const mutation = trpc.useMutation(['url']);

    const [url, setUrl] = useState('');

    const onClick = async () => {
        mutation.mutate(
            { url },
            {
                onSuccess() {
                    setUrl('');
                    utils.invalidateQueries(['url']);
                },
            }
        );
    };

    if (!urls.data) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <Head>
                <title>Shorty</title>
                <meta name="description" content="A simple URL shortener" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {urls.data.map((item) => (
                <div key={item.id}>
                    {item.shortUrl} - {item.url}
                </div>
            ))}

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    placeholder="https://google.com"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <button onClick={() => onClick()}>Add URL</button>
            </form>
        </div>
    );
};

export default Home;
