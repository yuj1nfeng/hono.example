import { bodyLimit } from 'hono/body-limit';

export default bodyLimit({
    maxSize: 1024 * 1024 * 1024, // 1024=1kb, 1024*1024=1mb, 1000*1024*1024=1gb
    onError: (c) => {
        return c.text('overflow :(', 413);
    },
});
