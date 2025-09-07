import { visit } from 'unist-util-visit';

import type { Root } from 'mdast';
import type { Heading } from 'mdast';
import type { LeafDirective } from 'mdast-util-directive';
import type { Transformer } from 'unified';
export default function MyToc():Transformer<Root> {
  return (tree:Root, file) => {
    visit(tree, 'leafDirective', (node) => {
        console.log('aaaa')
      // ::toc ディレクティブの場合、TOC.astro コンポーネントに変換
      if (node.type === 'leafDirective' && node.name === 'toc') {
        const tocNode = node as LeafDirective;
        const data = tocNode.data || (tocNode.data = {});
        
        // MarkdownノードをAstroコンポーネントに変換するメタデータを追
        data.hName = './src/components/blog/TOC.astro'
        data.hProperties = {id: file.basename?.split('.')[0] }
      }
  });
}
}