import utils from '#utils';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
import ffmpeg from '#ffmpeg';
import dayjs from 'dayjs';

export const api_path = 'video.watermark';
export const method = 'post';
export const app = async (ctx) => {
    const body = await ctx.req.parseBody({ all: false });
    const video = body['video'];
    const watermark = body['watermark'];
    const position = body['position'];
    const margin = body['margin'];
    const scale = body['scale'];
    const opacity = body['opacity'];
    const crf = body['crf'];
    const preset = body['preset'];
    const tempdir = path.join('videos', dayjs().format('YYYYMMDDHHmmssSSS'));
    await fs.mkdir(tempdir, { force: true, recursive: true });

    const video_path = path.join(tempdir, video.name);
    await fs.writeFile(video_path, await video.arrayBuffer());
    const watermark_path = path.join(tempdir, watermark.name);
    await fs.writeFile(watermark_path, await watermark.arrayBuffer());
    const opts = {
        position: position,
        margin: margin,
        scale: scale,
        opacity: opacity,
        crf: crf,
        preset: preset,
    };
    const result = await ffmpeg.addWatermark(video_path, watermark_path, opts);
    return ctx.json(result.replaceAll('\\', '/'));
};
