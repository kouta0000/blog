import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import type { ContainerDirective } from 'mdast-util-directive';
import type { Root, PhrasingContent } from 'mdast';
import type { Plugin } from 'unified';

export const noteClass = 'chat chat-end w-full';
export const headerClass = 'flex gap-2 items-center text-md border-none my-0 py-0';
export const chatBubbleClass = 'chat-bubble w-full bg-teal-50 p-7 rounded-xl pb-10';
export const contentClass ='text-sm text-muted';

const MyNote: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'containerDirective', (node: ContainerDirective) => {
      if (node.name !== 'note') return;
      if (node.children.length === 0) return;

      const title = node.attributes?.title || 'Remarque';

      // テキスト抽出
      let phrasingChildren: PhrasingContent[] = [];
      node.children.forEach((child) => {
        if (child.type === 'paragraph') {
          phrasingChildren.push(...child.children);
        }
      });
      const svgNode = h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        fill: 'none',
        viewBox: '0 0 24 24',
        strokeWidth: '1.5',
        stroke: 'teal',
        class: 'size-6',
      }, [
        h('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        d: 'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
      })
    ]);

      // HTMLノード構築
      const titleHeader = h('h5', { class: headerClass }, [svgNode,title]);
      const contentContainer = h('div', { class: contentClass }, phrasingChildren.map((c) => {
        if (c.type === 'text') return h('span', {}, c.value);
        return h('span', {}, '[Unsupported]');
      }));

      const chatBubble = h('div', { class: chatBubbleClass }, [titleHeader, contentContainer]);

      node.data = {
        hName: 'div',
        hProperties: {
          class: noteClass,
        },
        hChildren: [chatBubble],
      };
    });
  };
};

export default MyNote;
