// src/actions/index.ts

import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import fs from 'fs';
import path from 'path';
import { supabase } from '~/lib/supabase';




export const server = {
  getLikes: defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async ({ slug }) => { // 分割代入でinputオブジェクトからslugを直接取得
      let likes: number = 0;
      const { data, error } = await supabase.from('Posts').select('likes').eq('post_id', slug).maybeSingle(); // maybeSingle()で、データが存在しない場合にnullを返すようにする
      
      if (!data) { // dataがnullの場合、投稿が存在しない
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug});
          if (insertError) {
            throw new Error('Failed to create new post record');
          };
        } else {
          likes = data.likes;
        }
      return { likes: likes };
    },
  }),

  getFires: defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async ({ slug }) => { // 分割代入でinputオブジェクトからslugを直接取得
      let fires: number = 0;
      const { data, error } = await supabase.from('Posts').select('fires').eq('post_id', slug).maybeSingle(); // maybeSingle()で、データが存在しない場合にnullを返すようにする
      
      if (!data) { // dataがnullの場合、投稿が存在しない
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug});
          if (insertError) {
            throw new Error('Failed to create new post record');
          };
        } else {
          fires = data.fires;
        }
      return { fires:fires };
    },
  }),
  getSmiles: defineAction({
    input: z.object({
      slug: z.string(),
    }),
    handler: async ({ slug }) => { // 分割代入でinputオブジェクトからslugを直接取得
      let smiles: number = 0;
      const { data, error } = await supabase.from('Posts').select('smiles').eq('post_id', slug).maybeSingle(); // maybeSingle()で、データが存在しない場合にnullを返すようにする
      
      if (!data) { // dataがnullの場合、投稿が存在しない
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug});
          if (insertError) {
            throw new Error('Failed to create new post record');
          };
        } else {
          smiles = data.smiles;
        }
      return { smiles:smiles };
    },
  }),

    addLike: defineAction({
      input: z.object({
        slug: z.string(),
      }),
      handler: async ({ slug }) => { // 分割代入でslugを直接取得
        // まず、現在のいいね数を取得する
        const { data, error: selectError } = await supabase
          .from('Posts')
          .select('likes')
          .eq('post_id', slug)
          .maybeSingle(); // 投稿が存在しない場合はnullを返す

        if (selectError) {
          throw new Error('Failed to get current likes');
        }

        if (!data) {
          // 投稿が存在しない場合は、新規作成していいねを1にする
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug, likes: 1 });
          if (insertError) {
            throw new Error('Failed to create new post record and add first like');
          }
          return { likes: 1 };
        } else {
          // 投稿が存在する場合は、現在のいいね数を1増やす
          const newLikes = data.likes + 1;
          const { error: updateError } = await supabase
            .from('Posts')
            .update({ likes: newLikes })
            .eq('post_id', slug);

          if (updateError) {
            throw new Error('Failed to update likes');
          }
          return { likes: newLikes };
        }
      },
    }),

    addFire: defineAction({
      input: z.object({
        slug: z.string(),
      }),
      handler: async ({ slug }) => { // 分割代入でslugを直接取得
        // まず、現在のいいね数を取得する
        const { data, error: selectError } = await supabase
          .from('Posts')
          .select('fires')
          .eq('post_id', slug)
          .maybeSingle(); // 投稿が存在しない場合はnullを返す

        if (selectError) {
          throw new Error('Failed to get current likes');
        }

        if (!data) {
          // 投稿が存在しない場合は、新規作成していいねを1にする
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug, fires: 1 });
          if (insertError) {
            throw new Error('Failed to create new post record and add first like');
          }
          return { fires: 1 };
        } else {
          // 投稿が存在する場合は、現在のいいね数を1増やす
          const newFires = data.fires + 1;
          const { error: updateError } = await supabase
            .from('Posts')
            .update({ fires: newFires })
            .eq('post_id', slug);

          if (updateError) {
            throw new Error('Failed to update likes');
          }
          return { fires: newFires };
        }
      },
    }),
    addSmile: defineAction({
      input: z.object({
        slug: z.string(),
      }),
      handler: async ({ slug }) => { // 分割代入でslugを直接取得
        // まず、現在のいいね数を取得する
        const { data, error: selectError } = await supabase
          .from('Posts')
          .select('smiles')
          .eq('post_id', slug)
          .maybeSingle(); // 投稿が存在しない場合はnullを返す

        if (selectError) {
          throw new Error('Failed to get current likes');
        }

        if (!data) {
          // 投稿が存在しない場合は、新規作成していいねを1にする
          const { error: insertError } = await supabase.from('Posts').insert({ post_id: slug, smiles: 1 });
          if (insertError) {
            throw new Error('Failed to create new post record and add first like');
          }
          return { smiles: 1 };
        } else {
          // 投稿が存在する場合は、現在のいいね数を1増やす
          const newSmiles = data.smiles + 1;
          const { error: updateError } = await supabase
            .from('Posts')
            .update({ smiles: newSmiles })
            .eq('post_id', slug);

          if (updateError) {
            throw new Error('Failed to update likes');
          }
          return { smiles: newSmiles };
        }
      },
    }),
}
