import * as t from 'vitest';
import utils from '#utils';
import fs from 'node:fs';
import path from 'node:path';
import app from '../app.js';
import mkyaml from '#mock.yaml';

// 定义基础 URL

const api_version = 'v2';
const base_url = `http://localhost/api/${api_version}`;
const recource_dir = `./.mock`;
const resource_list = fs.readdirSync(recource_dir).map((p) => path.parse(p).name);


// 遍历每个测试用例
t.describe(`${import.meta.file}`, () => {

    t.beforeAll(async () => {

    });
    t.afterAll(async () => {
    });

    for (const res of resource_list) {
        // 测试 POST 请求：创建资源
        const fmt = (str) => `🚀 ${api_version.toUpperCase()}  ${str.padEnd(32, ' ')}`;
        t.it(fmt(`${api_version}/${res}`), async () => {

            const mockData = async () => await mkyaml(`${recource_dir}/${res}.yml`);

            let request_body = await mockData();
            let request_url = `${base_url}/${res}`;
            let resuest = new Request(request_url, {
                method: 'POST',
                body: JSON.stringify(request_body),
                headers: { 'content-type': 'application/json' },
            });
            let resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            let { code, data } = await resp.json();
            t.expect(code).toEqual('ok');
            for (const k in request_body) t.expect(data[k]).toEqual(request_body[k]);
            request_url += `/${data.id}`;

            await Bun.sleep(100);
            resuest = new Request(request_url, { method: 'GET' });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(code).toEqual('ok');
            for (const k in request_body) t.expect(data[k]).toEqual(request_body[k]);
            await Bun.sleep(100);
            request_body = await mockData();
            resuest = new Request(request_url, {
                method: 'PATCH',
                body: JSON.stringify(request_body),
                headers: { 'content-type': 'application/json' },
            });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(code).toEqual('ok');
            t.expect(data).toBeTrue();
            await Bun.sleep(400);
            resuest = new Request(request_url, { method: 'GET' });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(code).toEqual('ok');
            for (const k in request_body) t.expect(data[k]).toEqual(request_body[k]);
            await Bun.sleep(100);
            resuest = new Request(request_url, { method: 'DELETE' });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(data).toBeTrue();
            await Bun.sleep(100);
            resuest = new Request(request_url, { method: 'DELETE' });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(data).toBeFalse();
            await Bun.sleep(100);
            const data_list = [];
            for (let index = 0; index < 200; index++) {
                request_body = await mockData();
                request_url = `${base_url}/${res}`;
                resuest = new Request(request_url, {
                    method: 'POST',
                    body: JSON.stringify(request_body),
                    headers: { 'content-type': 'application/json' },
                });
                resp = await app.fetch(resuest);
                if (resp.status != 200) continue;
                const { code, data } = await resp.json();
                data_list.push(data);
            }
            const ids = data_list.map((obj) => obj.id);
            const filter = { id: ids };
            request_url = `${base_url}/${res}/list`;
            resuest = new Request(request_url, {
                method: 'POST',
                body: JSON.stringify(filter),
                headers: { 'content-type': 'application/json' },
            });
            resp = await app.fetch(resuest);
            t.expect(resp.status).toEqual(200);
            ({ code, data } = await resp.json());
            t.expect(code).toEqual('ok');
            t.expect(data.length).toEqual(data_list.length);
            for (const item of data) {
                t.expect(ids.includes(item.id)).toBeTrue();
                const data = data_list.find((u) => u.id == item.id);
                for (const key in data) t.expect(data[key]).toEqual(item[key]);
            }


        });


    }
});
