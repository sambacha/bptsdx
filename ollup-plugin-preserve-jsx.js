// Taken from: https://github.com/rollup/rollup/issues/2822#issuecomment-486676465
// src: https://gist.githubusercontent.com/aleclarson/40a2f10f0f3bedd4ae5eee4e444e033f/raw/5a55b9c76e04fd7c5d2e7c1b609c23757a4109d6/rollup-plugin-preserve-jsx.js
import MagicString from 'magic-string';
import { walk } from 'estree-walker';
import jsx from 'acorn-jsx';

let nextId = 0;

function getJsxName(node) {
  if (node.type === 'JSXMemberExpression') {
    return `${getJsxName(node.object)}.${getJsxName(node.property)}`;
  }
  return node.name;
}

/**
 * @returns {import('rollup').Plugin}
 */
export default () => ({
  options(inputOptions) {
    const acornPlugins = inputOptions.acornInjectPlugins || (inputOptions.acornInjectPlugins = []);
    acornPlugins.push(jsx());
  },
  transform(code) {
    const magicString = new MagicString(code);
    const idsByName = new Map();
    const ast = this.parse(code);
    walk(ast, {
      enter(node) {
        if (node.type === 'JSXOpeningElement' || node.type === 'JSXClosingElement') {
          const name = getJsxName(node.name);
          const tagId = idsByName.get(name) || `JSX_PLUGIN_ID_${nextId++}`;

          // overwrite all JSX tags with artificial tag ids so that we can find them again later
          magicString.overwrite(node.name.start, node.name.end, tagId);
          idsByName.set(name, tagId);
        }
        // do not treat the children as separate identifiers
        else if (node.type === 'JSXMemberExpression') {
          this.skip();
        }
      },
    });

    if (idsByName.size > 0) {
      const usedNamesAndIds = Array.from(idsByName).map(([name, tagId]) => `/*${tagId}*/${name}`);
      magicString.append(`;USED_JSX_NAMES(React,${usedNamesAndIds.join(',')});`);
      return magicString.toString();
    }
  },
  renderChunk(code) {
    const replacements = new Map();

    // this finds all injected artificial usages from the transform hook, removes them
    // and collects the new variable names as a side-effect
    code = code.replace(/USED_JSX_NAMES\(([^)]*)\);/g, (_, args) => {
      // this extracts the artificial tag id from the comment and the possibly renamed variable
      // name from the variable via two capture groups
      const usedNames = args.split(',').map(arg => arg.match(/^\/\*([^*]*)\*\/(.*)$/));

      usedNames.slice(1).forEach(([_, tagId, updatedName]) => {
        replacements.set(tagId, updatedName);
      });

      return '';
    });

    // this replaces the artificial tag ids in the actual JSX tags
    return code.replace(/JSX_PLUGIN_ID_\d+/g, tagId => replacements.get(tagId));
  },
});
