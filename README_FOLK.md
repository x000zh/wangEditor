# folk的一些修改


## 简单支持外挂的按钮，

- 增加了 `Editor.Panel`
- 增加了 `Editor.$`
- 增加了 `Editor.getRandom`
- 增加了 `editor.customConfig.extraMenues`类型是`object`

实例：

```javascript

var Ed = window.wangEditor || window.Editor;

function ExtraEditorPlugin(editor){
  this.editor = editor;
  this.$elem = Ed.$('<div class="w-e-menu"><i class="w-e-icon-play" style=""><i/></div>');
  this.type = 'panel';

  // 当前是否 active 状态
  this._active = false;
}

ExtraEditorPlugin.prototype = {
    constructor: ExtraEditorPlugin,

    onClick: function () {
        this._createPanel()
    },
    _createPanel: function () {
        // 创建 id
        const textValId = Ed.getRandom('text-val')
        const btnId = Ed.getRandom('btn')

        // 创建 panel
        const panel = new Panel(this, {
            width: 350,
            // 一个 panel 多个 tab
            tabs: [
                {
                    // 标题
                    title: '插入视频',
                    // 模板
                    tpl: `<div>
                        <input id="${textValId}" type="text" class="block" placeholder="格式如：<iframe src=... ><\/iframe>"/>
                        <div class="w-e-button-container">
                            <button id="${btnId}" class="right">插入</button>
                        </div>
                    </div>`,
                    // 事件绑定
                    events: [
                        {
                            selector: '#' + btnId,
                            type: 'click',
                            fn: () => {
                                const $text = Ed.$('#' + textValId)
                                const val = $text.val().trim()

                                // 测试用视频地址
                                // <iframe height=498 width=510 src='http://player.youku.com/embed/XMjcwMzc3MzM3Mg==' frameborder=0 'allowfullscreen'></iframe>

                                if (val) {
                                    // 插入视频
                                    this._insert(val)
                                }

                                // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                                return true
                            }
                        }
                    ]
                } // first tab end
            ] // tabs end
        }) // panel end

        // 显示 panel
        panel.show()

        // 记录属性
        this.panel = panel
    },

    // 插入视频
    _insert: function (val) {
        const editor = this.editor
        editor.cmd.do('insertHTML', val + '<p><br></p>')
    }
}

var editor = new Ed('#foo');
//...
editor.customConfig.extraMenus = {
    'extra': ExtraEditorPlugin
};
editor.customConfig.menus = ['bold', 'extra'];
editor.create();
//...
```
