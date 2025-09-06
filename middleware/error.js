import zod from 'zod';
import * as seq from '@sequelize/core';


export default async (err, c) => {
    c.status(500);

    if (err instanceof seq.BaseError) {


        console.log(err);

        return c.json({ message: err.issues.map((i) => i.message).join('\n') });
    }

    if (err instanceof zod.ZodError) {


        console.log(err);

        return c.json({ message: err.issues.map((i) => i.message).join('\n') });
    }


    return c.json({ message: err.message });
};
