/**
 * Created by Zinway on 2016/12/17.
 */
import blessed from 'blessed'

class Ui {
    constructor() {
        this.screen = blessed.screen({
            debug: true,
            warnings: true,
            log: '/tmp/necm.log',
            dockBorders: true,
            smartCSR: true,
            fullUnicode: true,
            title: 'NECM'
        });

        this.initListWidget();
        this.initSearchWidget();

        this.screen.on('element focus', (cur, old) => {
            if (old.border) old.style.border.fg = 'default';
            if (cur.border) cur.style.border.fg = 'green';
            this.screen.render();
        });

        this.screen.key(['tab'], (ch, key) => {
            this.screen.focusNext();
        });
        this.screen.key(['S-tab'], (ch, key) => {
            this.screen.focusPrevious()
        });

        // Quit on Escape, q, or Control-C.
        this.screen.key(['escape', 'q', 'C-c'], (ch, key) => {
            this.screen.destroy();
        });

        // default focus
        this.list.focus();
        // Render the screen.
        this.screen.render();
    }

    initListWidget() {
        this.list = blessed.list({
            mouse: true,
            keys: true,
            vi: true,
            align: 'left',
            label: ' 网易云音乐 ',
            border: 'line',
            width: '50%',
            height: '50%',
            top: 'center',
            left: 'center',
            padding: 1,
            items: [
                ' 0. 排行榜',
                ' 1. 艺术家',
                ' 2. 新碟上架',
                ' 3. 精选歌单',
                ' 4. 我的歌单',
                ' 5. DJ节目',
                ' 6. 打碟',
                ' 7. 收藏',
                ' 8. 占位符',
                ' 9. 帮助',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
                ' x. 占位符',
            ],
            style: {
                fg: 'blue',
                bg: 'default',
                border: {
                    fg: 'default',
                    bg: 'default'
                },
                selected: {
                    fg: '#f0f0f0',
                    bg: 'green'
                }
            },
        });

        this.screen.append(this.list);

        this.list.on('select', (item, index) => {
            this.screen.log(`index -> ${index}`);
            this.screen.log(item);
            this.list.setLabel(` ${item.getText().split('.').slice(-1)[0].trim()} `);
            this.screen.render();
        });
    }

    initSearchWidget() {
        this.searchBox = blessed.textbox({
            label: ' 搜索 ',
            content: '',
            border: 'line',
            style: {
                fg: 'blue',
                bg: 'default',
                bar: {
                    bg: 'default',
                    fg: 'blue'
                },
                border: {
                    fg: 'default',
                    bg: 'default'
                }
            },
            padding: {
                left: 1
            },
            width: '30%',
            height: 3,
            right: 0,
            top: 2,
            keys: true,
            vi: true,
            mouse: true
            //inputOnFocus: true
        });

        this.searchBox.on('submit', (value) => {
            if (value) this.list.setLabel(` 搜索> ${value} `);
            this.list.focus();
            this.searchBox.clearInput();
            this.screen.render();
        });

        this.screen.append(this.searchBox);
    }
}

// test
const ui = new Ui();

export default Ui
