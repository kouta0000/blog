import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Transformer } from 'unified';

export default function myremarque(): Transformer<Root> {
  return (tree: Root) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'remarque') return;

      const title = node.attributes?.title || 'Remarque';
      const titleNode = h('h4', { class: 'text-sm' }, title);
      const chatbubbleNode = h('div', {
        class: 'chat-bubble bg-teal-50 p-4 text-sm',
      }, [titleNode]);
      const children = node.data?.hChildren ?? [];
      node.data = {
        hName: 'div',
        hProperties: {
          class: 'chat chat-end w-full p-10',
        },
        hChildren: [chatbubbleNode, ...children],
      };
    });
  };
}
