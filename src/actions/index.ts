// src/actions/index.ts

import {defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import fs from 'fs';
import path from 'path';
import { supabase } from '../lib/supabase';




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

    addComment:defineAction({
      input: z.object({
        post_id: z.string(),
        author_name: z.string().min(1, { message: "お名前を入力してください。" }),
        content: z.string().min(1, { message: "コメントを入力してください。" }),
      }),
      handler: async ({ post_id, author_name, content }) => {
        const { data, error } = await supabase.from('Comments').insert({
          post_id:post_id,
          author_name: author_name,
          content: content,
        });
        if (error) {
          console.error('Failed to add comment:', error);
          throw new Error('コメントの送信に失敗しました。');
        }
        return { success: true, comment: data };
      },
    }),

    getComments:defineAction({
      input: z.object({
        post_id: z.string(),
      }),
      handler: async ({ post_id }) => {
        const { data, error } = await supabase
          .from('Comments')
          .select('*')
          .eq('post_id', post_id)
          .order('created_at', { ascending: true });
        if (error) {
          console.error('Error fetching comments:', error);
          throw new Error('コメントの取得に失敗しました。');
        }
    
        return { result: data };
      },
    }),

    contact: defineAction({
      input: z.object({
        name: z.string(),
        email: z.string(),
        message: z.string(),
        subject: z.string(),
        _honey: z.string(),
        _dummy: z.string()
      }).passthrough(),
      handler: async ({ name, email, message, subject, _honey, _dummy }) => {
        console.log(name);
    
        if (_honey.trim() !== "") {
          return new Response("Bot detected", { status: 403 });
        }
    
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);
        formData.append("_subject", subject);
    
        try {
          const res = await fetch("https://formsubmit.co/kukkmathphys1236@gmail.com", {
            method: "POST",
            body: formData,
          });
    
          if (!res.ok) {
            console.error("送信失敗:", res.statusText);
            return new Response("送信失敗", { status: 500 });
          }
    
          console.log("📩 メッセージ受信:");
          return { success: true };
        } catch (error) {
          console.error("エラー:", error);
          return new Response("エラーが発生しました", { status: 500 });
        }
      },
    })
    
}
