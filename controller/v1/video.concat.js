import utils from '#utils';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import ffmpeg from '#ffmpeg';
import dayjs from 'dayjs';

export const api_path = 'video.concat';
export const method = 'post';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody({ all: true });
    const files = body['videos'];
    const container = body['container_format'];
    const tempdir = path.join('videos', dayjs().format('YYYYMMDDHHmmssSSS'));
    await fs.mkdir(tempdir, { force: true, recursive: true });
    const videos = [];
    for (const file of files) {
        const buf = await file.arrayBuffer();
        const file_path = path.join(tempdir, file.name);
        await fs.writeFile(file_path, buf);
        videos.push(file_path);
    }
    const result = await ffmpeg.concatVideos(videos, path.join(tempdir, `out.${container.toUpperCase()}`));
    const key = `${utils.id.uuid()}.${container}`;
    await utils.s3.putFile(key, result);
    const url = utils.s3.getPublicUrl(key);
    return ctx.json(url);
};
