import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

// create and store data in the database
export const createFile = mutation({
    args: {
        name: v.string(),
    },
    async handler(ctx, args) {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new ConvexError('Oh oh! You must be logged in to upload a file');
        }

        await ctx.db.insert('files', {
            name: args.name,
        });
    }
})

// get data from the database
export const getFile = query({
    args: {},
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return [];
        }
        return await ctx.db.query('files').collect();
    }
})