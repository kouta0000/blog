// src/actions/index.ts

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import fs from 'fs';
import path from 'path';




export const server = {
    getLikes:defineAction({
        input: z.object({
          slug: z.string(),
        }),
        handler: async ({ slug }) => {
          let likes = {};
          const likesFilePath = path.join(process.cwd(), 'src/data/likes.json');
          try {
            likes = JSON.parse(fs.readFileSync(likesFilePath, 'utf-8'));
          } catch (e) {
            console.error('Error reading likes.json:', e);
          }
          if (!(slug in likes)) {
            likes[slug] = 0;
            fs.writeFileSync(likesFilePath, JSON.stringify(likes, null, 2));
          }
      
          return { likes: likes[slug] };
        },
      }),
      addLike: defineAction({
        input: z.object({
          slug: z.string(),
        }),
        handler: async ({ slug }) => {
          let likes = {};
          const likesFilePath = path.join(process.cwd(), 'src/data/likes.json');
          try {
            likes = JSON.parse(fs.readFileSync(likesFilePath, 'utf-8'));
          } catch (e) {
            console.error('Error reading likes.json:', e);
          }
          likes[slug] = (likes[slug] || 0) + 1;
          fs.writeFileSync(likesFilePath, JSON.stringify(likes, null, 2));
          return { likes: likes[slug] };
        },
      })
}



