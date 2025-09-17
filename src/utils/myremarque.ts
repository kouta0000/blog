import {h} from 'hastscript';
import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type {Transformer} from 'unified';

export default function myremarque():Transformer<Root> {
  return (tree:Root) => {
    visit(tree, 'containerDirective', (node) => {
      if (node.name !== 'remarque') return;

      const data = node.data || {};
      
      const title = node.attributes?.title || 'Remarque';
      const titleNode = h('h2', { class: 'text-sm' }, title);
      const chatbubbleNode = h('div', {
        class: 'chat-bubble bg-teal-100 p-4 text-sm',
      }, [titleNode]);
      data.hChildren=[chatbubbleNode];
      data.hProperties={class:'chat chat-start w-full'};
  })
}
}
