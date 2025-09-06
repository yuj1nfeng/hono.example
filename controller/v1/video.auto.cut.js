import utils from '#utils';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import ffmpeg from '#ffmpeg';
import dayjs from 'dayjs';

export const api_path = 'video.auto.cut';
export const method = 'post';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody({ all: false });
    const input_dir = body['input_dir'];
    const file_extensions = body['file_extensions'] || 'mp4,mov';
    const min_sec = parseInt(body['min_sec']) || 5;
    const max_sec = parseInt(body['max_sec']) || 10;
    const tempdir = path.join('videos', dayjs().format('YYYYMMDDHHmmssSSS'));
    await fs.mkdir(tempdir, { force: true, recursive: true });
    const output = path.join(tempdir, 'output.mp4');
    const opts = {
        min_sec: min_sec,
        max_sec: max_sec,
        file_extensions: file_extensions,
        transition_mode: '',
        transition_duration: '',
    };
    const result = await ffmpeg.autoCutVideo(input_dir, output, opts);
    return ctx.json(result.replaceAll('\\', '/'));
};
