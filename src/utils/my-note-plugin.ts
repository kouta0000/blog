
import { h } from 'hastscript';
import { visit } from 'unist-util-visit';
import type { ContainerDirective, LeafDirective } from 'mdast-util-directive';
import type { Root, PhrasingContent } from 'mdast'; /***ノード自体の型 ***/
import type { Transformer, Plugin } from 'unified';/*** ノードを走査する系の関数の型***/

export const noteClass = 'chat chat-end w-full';
export const headerClass = 'text-sm';
export const chatBubbleClass = 'chat-bubble w-full bg-teal-50 p-5'
const MyNote:Plugin<[],Root> = () =>  {
  return (tree) => {
    visit(tree,'containerDirective', (node) => {
      if (node.name === 'node') return;
      if(node.children.length===0) return;
      /*noteコンテナーの作成 */
      node.data = {
        ...node.data,
        hName:'div',
        hProperties: {
            ...node.attributes,
            class : noteClass
        }
      } 
      /*子要素の作成*/
      const title = node.attributes?.title || 'Remarque';
      const titleHeader: PhrasingContent = {
        type:'text',
        value:title,
      }
      const firstChild = node.children[0];
      if(firstChild.type!=='paragraph') return;
      const chatBubble:LeafDirective = {
        type:'leafDirective',
        name:'chat-bubble',
        data: {
            hName:'div',
            hProperties: {
                class:chatBubbleClass,
            }
        },
        children:[titleHeader,...firstChild.children]
      }
      node.children = [chatBubble]

    }
    );
  };
}
export default MyNote