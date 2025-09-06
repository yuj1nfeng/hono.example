export default async (ctx, next) => {
    await next();
    if (ctx.res.status == 200) {
        console.log('warp json');
        const original_data = await ctx.res.json();
        const warp_data = JSON.stringify({ code: 'ok', data: original_data });
        ctx.res = new Response(warp_data, {
            status: ctx.res.status,
            headers: { ...ctx.res.headers, 'content-type': 'application/json' },
        });
        return;
    }
    if (ctx.res.status == 500) {
        console.log('warp json');
        const original_data = await ctx.res.json();
        const warp_data = JSON.stringify({ code: 'err', ...original_data });

        ctx.res = new Response(warp_data, {
            status: ctx.res.status,
            headers: { ...ctx.res.headers, 'content-type': 'application/json' },
        });
        return;
    }
};
