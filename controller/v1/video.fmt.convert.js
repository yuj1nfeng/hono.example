import utils from '#utils';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import ffmpeg from '#ffmpeg';
import dayjs from 'dayjs';

export const api_path = 'video.fmt.convert';
export const method = 'post';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody({ all: false });
    const video = body['video'];
    const codec = body['codec'] || 'libx264';
    const crf = parseInt(body['crf']) || 23;
    const preset = body['preset'] || 'fast';
    const tempdir = path.join('videos', dayjs().format('YYYYMMDDHHmmssSSS'));
    await fs.mkdir(tempdir, { force: true, recursive: true });
    const video_path = path.join(tempdir, video.name);
    await fs.writeFile(video_path, await video.arrayBuffer());
    const output = path.join(tempdir, `output${path.extname(video.name)}`);
    const result = await ffmpeg.convertVideoFmt(video_path, output, codec, crf, preset);
    return ctx.json(result.replaceAll('\\', '/'));
};
