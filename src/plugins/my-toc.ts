import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';
import type { Heading } from 'mdast';
import type { LeafDirective } from 'mdast-util-directive';
import type { Transformer } from 'unified';

export default function MyToc():Transformer<Root> {
  return (tree:Root, file) => {
    visit(tree, 'leafDirective', (node) => {
      // ::toc ディレクティブの場合、TOC.astro コンポーネントに変換
      if (node.type === 'leafDirective' && node.name === 'toc') {
        node.data = {
            hName:'div',
            hProperties: {
                class: ['w-100', 'h-20', 'bg-pink-400']
            },
            hChildren: [
                { type: 'text', value: 'TOC placeholder' }
              ]
        }
    }
  });
}
}