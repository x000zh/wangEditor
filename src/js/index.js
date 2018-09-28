import polyfill from './util/poly-fill.js'
import Editor from './editor/index.js'
import Panel from './menus/panel.js'
import $ from './util/dom-core.js'
import { getRandom } from './util/util.js'

// 检验是否浏览器环境
try {
    document
} catch (ex) {
    throw new Error('请在浏览器环境下运行')
}

// polyfill
polyfill()

// 这里的 `inlinecss` 将被替换成 css 代码的内容，详情可去 ./gulpfile.js 中搜索 `inlinecss` 关键字
const inlinecss = '__INLINE_CSS__'

// 将 css 代码添加到 <style> 中
let style = document.createElement('style')
style.type = 'text/css'
style.innerHTML= inlinecss
document.getElementsByTagName('HEAD').item(0).appendChild(style)

//输出panel方便扩展
Editor.Panel = Panel
// dom core
Editor.$ = $
Editor.getRandom = getRandom

// 返回
export default (window.wangEditor || Editor)
