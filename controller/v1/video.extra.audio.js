import utils from '#utils';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import ffmpeg from '#ffmpeg';
import dayjs from 'dayjs';

export const api_path = 'video.extra.audio';
export const method = 'post';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody({ all: false });
    const video = body['video'];
    const codec = body['codec'] || 'mp3';
    const bitrate = body['bitrate'] || '192';
    const tempdir = path.join('videos', dayjs().format('YYYYMMDDHHmmssSSS'));
    await fs.mkdir(tempdir, { force: true, recursive: true });

    const video_path = path.join(tempdir, video.name);
    await fs.writeFile(video_path, await video.arrayBuffer());
    const result = await ffmpeg.extraAudio(video_path, codec, bitrate);
    return ctx.json(result.replaceAll('\\', '/'));
};
