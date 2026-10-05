/* ================================================================
   Fanlink 3.04 主应用逻辑
   ================================================================ */

// ========== 滚动位置保存与恢复 ==========
(function() {
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.addEventListener('load', function() {
        const savedPos = localStorage.getItem('fanlink_scroll_pos');
        if (savedPos !== null) {
            const pos = parseInt(savedPos, 10);
            if (pos === 0) {
                window.scrollTo(0, 0);
            } else {
                window.scrollTo(0, pos);
            }
        }
    });
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            const currentPos = window.scrollY;
            localStorage.setItem('fanlink_scroll_pos', currentPos);
        }, 300);
    });
})();

// ========== 语言切换功能 ==========
const translations = {
    zh: {
        placeholder: '搜索或输入网址...',
        search: '搜索',
        sidebar: ['社交', '新闻', '工具', '娱乐', '学习', '开发', '其他', '网络安全', '漫游'],
        settings: '设置',
        appearance: '外观',
        notes: '便签',
        recent: '最近访问',
        language: '语言',
        updates: '更新介绍',
        titleStyle: '标题栏样式',
        timeDisplay: '时间显示',
        fanlinkTitle: 'Fanlink标签页',
        timeFormat: '时间显示格式',
        hour24: '24小时制',
        hour12: '12小时制',
        theme: '主题颜色',
        themeGreen: '清新绿',
        themeBlue: '静谧蓝',
        themeLavender: '薰衣草',
        themePeach: '蜜桃粉',
        themeMint: '薄荷绿',
        wallpaper: '背景壁纸',
        resetBg: '恢复默认背景',
        wallpaperUrl: '网络图片',
        wallpaperInput: '输入图片网址',
        wallpaperApply: '应用',
        wallpaperError: '请输入有效的图片网址',
        noRecent: '暂无访问记录',
        versionInfo: 'Fanlink 3.05',
        searchHistoryTab: '搜索历史',
        importExportTab: '导入与导出',
        listLayout: '列表布局',
        gridLayout: '网格布局',
        sidebarToggle: '隐藏/显示分类栏',
        sidebarPosLeft: '左侧',
        sidebarPosRight: '右侧',
        sidebarPosition: '分类栏位置',
        noteManagement: '便签管理',
        enableNotes: '启用便签',
        disableNotes: '禁用便签',
        addNote: '添加新便签',
        clearAllNotes: '清除所有便签',
        visitHistory: '访问记录',
        enableRecent: '开启最近访问',
        clearHistory: '清除所有记录',
        currentLang: '当前语言：简体中文',
        version: '版本',
        newFeatures: '新增功能',
        helpTitle: '快捷指令大全',
        helpLang: '语言切换',
        helpCat: '分类跳转',
        helpSys: '系统功能',
        weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        devTitle: '开发者设置',
        devOldStyleDesc: '切换回 Fanlink 3.01 的经典视觉风格',
        devFooter: '所有功能为实验性功能，可能有部分 bug，功能完全实现后会在下版本加入。'
    },
    'zh-TW': {
        placeholder: '搜尋或輸入網址...',
        search: '搜尋',
        sidebar: ['社群', '新聞', '工具', '娛樂', '學習', '開發', '其他', '網路安全', '隨機'],
        settings: '設定',
        appearance: '外觀',
        notes: '便利貼',
        recent: '最近訪問',
        language: '語言',
        updates: '更新介紹',
        titleStyle: '標題欄樣式',
        timeDisplay: '時間顯示',
        fanlinkTitle: 'Fanlink標籤頁',
        timeFormat: '時間顯示格式',
        hour24: '24小時制',
        hour12: '12小時制',
        theme: '主題顏色',
        themeGreen: '清新綠',
        themeBlue: '靜謐藍',
        themeLavender: '薰衣草',
        themePeach: '蜜桃粉',
        themeMint: '薄荷綠',
        wallpaper: '背景桌布',
        resetBg: '恢復預設背景',
        wallpaperUrl: '網路圖片',
        wallpaperInput: '輸入圖片網址',
        wallpaperApply: '套用',
        wallpaperError: '請輸入有效的圖片網址',
        noRecent: '暫無訪問記錄',
        versionInfo: 'Fanlink 3.05',
        searchHistoryTab: '搜尋歷史',
        importExportTab: '匯入與匯出',
        listLayout: '列表版面',
        gridLayout: '網格版面',
        sidebarToggle: '隱藏/顯示分類欄',
        sidebarPosLeft: '左側',
        sidebarPosRight: '右側',
        sidebarPosition: '分類欄位置',
        noteManagement: '便利貼管理',
        enableNotes: '啟用便利貼',
        disableNotes: '停用便利貼',
        addNote: '新增便利貼',
        clearAllNotes: '清除所有便利貼',
        visitHistory: '訪問記錄',
        enableRecent: '開啟最近訪問',
        clearHistory: '清除所有記錄',
        currentLang: '當前語言：繁體中文',
        version: '版本',
        newFeatures: '新增功能',
        helpTitle: '快捷指令大全',
        helpLang: '語言切換',
        helpCat: '分類跳轉',
        helpSys: '系統功能',
        weekdays: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
        devTitle: '開發者設定',
        devOldStyleDesc: '切換回 Fanlink 3.01 的經典視覺風格',
        devFooter: '所有功能為實驗性功能，可能有部分 bug，功能完全實現後會在下版本加入。'
    },
    en: {
        placeholder: 'Search or enter URL...',
        search: 'Search',
        sidebar: ['Social', 'News', 'Tools', 'Entertainment', 'Learning', 'Development', 'Other', 'Cybersecurity', 'Random'],
        settings: 'Settings',
        appearance: 'Appearance',
        notes: 'Notes',
        recent: 'Recent',
        language: 'Language',
        updates: 'Updates',
        titleStyle: 'Header Style',
        timeDisplay: 'Time Display',
        fanlinkTitle: 'Fanlink Title',
        timeFormat: 'Time Format',
        hour24: '24-hour',
        hour12: '12-hour',
        theme: 'Theme Color',
        themeGreen: 'Fresh Green',
        themeBlue: 'Serene Blue',
        themeLavender: 'Lavender',
        themePeach: 'Peach',
        themeMint: 'Mint',
        wallpaper: 'Wallpaper',
        resetBg: 'Reset Background',
        wallpaperUrl: 'Web Image',
        wallpaperInput: 'Enter image URL',
        wallpaperApply: 'Apply',
        wallpaperError: 'Please enter a valid image URL',
        noRecent: 'No recent visits',
        versionInfo: 'Fanlink 3.05',
        searchHistoryTab: 'Search History',
        importExportTab: 'Import/Export',
        layout: 'Site Layout',
        listLayout: 'List Layout',
        gridLayout: 'Grid Layout',
        sidebarToggle: 'Show/Hide Sidebar',
        sidebarPosLeft: 'Left',
        sidebarPosRight: 'Right',
        sidebarPosition: 'Sidebar Position',
        noteManagement: 'Note Management',
        enableNotes: 'Enable Notes',
        disableNotes: 'Disable Notes',
        addNote: 'Add Note',
        clearAllNotes: 'Clear All Notes',
        visitHistory: 'Visit History',
        enableRecent: 'Enable Recent',
        clearHistory: 'Clear History',
        currentLang: 'Current Language: English',
        version: 'Version',
        newFeatures: 'New Features',
        helpTitle: 'Quick Commands',
        helpLang: 'Language',
        helpCat: 'Category',
        helpSys: 'System',
        weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        devTitle: 'Developer Settings',
        devOldStyleDesc: 'Switch back to the classic Fanlink 3.01 visual style',
        devFooter: 'All features are experimental, some bugs may exist. Full features will be added in the next version.'
    },
    ru: {
        placeholder: 'Поиск или ввод URL...',
        search: 'Поиск',
        sidebar: ['Соцсети', 'Новости', 'Инструменты', 'Развлечения', 'Обучение', 'Разработка', 'Другое', 'Безопасность', 'Случайный'],
        settings: 'Настройки',
        appearance: 'Внешний вид',
        notes: 'Заметки',
        recent: 'Недавние',
        language: 'Язык',
        updates: 'Обновления',
        titleStyle: 'Стиль заголовка',
        timeDisplay: 'Отображение времени',
        fanlinkTitle: 'Fanlink',
        timeFormat: 'Формат времени',
        hour24: '24-часовой',
        hour12: '12-часовой',
        theme: 'Цвет темы',
        themeGreen: 'Свежий зелёный',
        themeBlue: 'Спокойный синий',
        themeLavender: 'Лаванда',
        themePeach: 'Персик',
        themeMint: 'Мята',
        wallpaper: 'Обои',
        resetBg: 'Сбросить фон',
        wallpaperUrl: 'Сеть',
        wallpaperInput: 'URL картинки',
        wallpaperApply: 'Применить',
        wallpaperError: 'Введите URL картинки',
        noRecent: 'Нет записей',
        versionInfo: 'Fanlink 3.05',
        searchHistoryTab: 'История поиска',
        importExportTab: 'Импорт/Экспорт',
        layout: 'Макет сайта',
        listLayout: 'Список',
        gridLayout: 'Сетка',
        sidebarToggle: 'Показать/скрыть панель',
        sidebarPosLeft: 'Слева',
        sidebarPosRight: 'Справа',
        sidebarPosition: 'Позиция панели',
        noteManagement: 'Управление заметками',
        enableNotes: 'Включить заметки',
        disableNotes: 'Отключить заметки',
        addNote: 'Добавить заметку',
        clearAllNotes: 'Очистить всё',
        visitHistory: 'История посещений',
        enableRecent: 'Включить недавние',
        clearHistory: 'Очистить историю',
        currentLang: 'Текущий язык: Русский',
        version: 'Версия',
        newFeatures: 'Новые функции',
        helpTitle: 'Команды',
        helpLang: 'Язык',
        helpCat: 'Категории',
        helpSys: 'Система',
        weekdays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        devTitle: 'Настройки разработчика',
        devOldStyleDesc: 'Вернуться к классическому визуальному стилю Fanlink 3.01',
        devFooter: 'Все функции экспериментальные, возможны баги. Полный функционал будет добавлен в следующей версии.'
    }
};

let currentLang = localStorage.getItem('currentLang') || 'zh';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('currentLang', lang);
    applyTranslations();
    updateLanguageUI();
}

function applyTranslations() {
    const t = translations[currentLang];

    // 搜索框占位符由「每日一言」模块统一控制

    const sidebarLinks = document.querySelectorAll('#sidebar a');
    const sidebarTexts = t.sidebar;
    sidebarLinks.forEach((link, i) => {
        if (sidebarTexts[i] && link.querySelector('i')) {
            const icon = link.querySelector('i').outerHTML;
            link.innerHTML = icon + ' <span>' + sidebarTexts[i] + '</span>';
        }
    });

    const settingsH2 = document.querySelector('#settingsPanel .settings-header h2');
    if (settingsH2) settingsH2.innerHTML = ' ' + t.settings;

    const navItems = document.querySelectorAll('.settings-nav-item');
    const navMap = {
        personalization: t.appearance,
        searchHistory: t.searchHistoryTab || '搜索历史',
        notes: t.notes,
        recent: t.recent,
        language: t.language,
        importExport: t.importExportTab || '导入与导出',
        updates: t.updates
    };
    navItems.forEach(item => {
        const tab = item.dataset.tab;
        if (navMap[tab]) {
            item.textContent = navMap[tab];
        }
    });

    updateCustomSelectText('titleStyleSelect', t.titleStyle === '标题栏样式' ? { time: '时间显示', title: 'Fanlink标签页' } : null);
    updateCustomSelectText('timeFormatSelect', t.timeFormat === '时间显示格式' ? { '24': '24小时制', '12': '12小时制' } : null);
    updateCustomSelectText('layoutSelect', t.layout === '网站布局' ? { list: '列表布局', grid: '网格布局' } : null);
    updateCustomSelectText('sidebarPosSelect', t.sidebarPosition === '分类栏位置' ? { left: '左侧', right: '右侧' } : null);

    const notesCard = document.querySelector('#notes .setting-card');
    if (notesCard) {
        const h4 = notesCard.querySelector('h4');
        if (h4) h4.innerHTML = '<i class="fas fa-sticky-note"></i> ' + t.noteManagement;
        const btns = notesCard.querySelectorAll('.setting-btn');
        if (btns[0]) btns[0].innerHTML = t.enableNotes;
        if (btns[1]) btns[1].innerHTML = t.disableNotes;
        if (btns[2]) btns[2].innerHTML = t.addNote;
        if (btns[3]) btns[3].innerHTML = t.clearAllNotes;
    }

    const recentCard = document.querySelector('#recent .setting-card');
    if (recentCard) {
        const h4 = recentCard.querySelector('h4');
        if (h4) h4.innerHTML = '<i class="fas fa-history"></i> ' + t.visitHistory;
        const btns = recentCard.querySelectorAll('.setting-btn');
        if (btns[0]) btns[0].textContent = t.enableRecent;
        if (btns[1]) btns[1].innerHTML = t.clearHistory;
    }

    const langCard = document.querySelector('#language .setting-card');
    if (langCard) {
        const h4 = langCard.querySelector('h4');
        if (h4) h4.innerHTML = '<i class="fas fa-globe"></i> ' + t.language;
    }
    const langStatus = document.getElementById('lang-status');
    if (langStatus) langStatus.textContent = t.currentLang;

    const updatesCard = document.querySelector('#updates .setting-card');
    if (updatesCard) {
        const h4 = updatesCard.querySelector('h4');
        if (h4) h4.innerHTML = '<i class="fas fa-leaf"></i> ' + t.versionInfo;
        const strong = updatesCard.querySelector('strong');
        if (strong) strong.textContent = t.newFeatures;
    }

    const themeTitles = [t.themeGreen, t.themeBlue, t.themeLavender, t.themePeach, t.themeMint];
    document.querySelectorAll('.theme-option').forEach((el, i) => {
        if (themeTitles[i]) el.title = themeTitles[i];
    });

    updateEngineUI();

    const devTitle = document.querySelector('#devSettingsPanel .dev-settings-header h2');
    if (devTitle) devTitle.innerHTML = '<i class="fas fa-code"></i> ' + (t.devTitle || '开发者设置');

    const oldLabel = document.querySelector('#devSettingsPanel .dev-section .dev-item .dev-label');
    if (oldLabel) oldLabel.textContent = t.devOldStyleDesc || '切换回 Fanlink 3.01 的经典视觉风格';

    const devFooter = document.querySelector('#devSettingsPanel .dev-footer');
    if (devFooter) devFooter.innerHTML = '<i class="fas fa-flask"></i> ' + (t.devFooter || '所有功能为实验性功能。');
}

function updateLanguageUI() {
    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('lang-' + currentLang);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
    const status = document.getElementById('lang-status');
    if (status && translations[currentLang]) {
        status.textContent = translations[currentLang].currentLang;
    }
    const titleEl = document.querySelector('.lang-setting-title');
    if (titleEl && translations[currentLang]) {
        titleEl.textContent = translations[currentLang].language;
    }
}

function updateCustomSelectText(containerId, textMap) {
    if (!textMap) return;
    const container = document.getElementById(containerId);
    if (!container) return;
    const selected = container.querySelector('.fanlink-select-option.selected');
    if (selected) {
        const val = selected.dataset.value;
        if (textMap[val]) {
            container.querySelector('.selected-text').textContent = textMap[val];
            selected.querySelector('.option-label').textContent = textMap[val];
        }
    } else {
        const savedVal = localStorage.getItem(containerId);
        if (savedVal && textMap[savedVal]) {
            container.querySelector('.selected-text').textContent = textMap[savedVal];
        }
    }
}

// ========== 搜索引擎 ==========
const engineList = ['bing', 'baidu', 'google', 'sogou', 'site'];
const engineConfig = {
    bing: { name_zh: '必应', name_en: 'Bing', icon: 'fab fa-microsoft', url: 'https://www.bing.com/search?q=' },
    baidu: { name_zh: '百度', name_en: 'Baidu', icon: 'fab fa-sistrix', url: 'https://www.baidu.com/s?wd=' },
    google: { name_zh: 'Google', name_en: 'Google', icon: 'fab fa-google', url: 'https://www.google.com/search?q=' },
    sogou: { name_zh: '搜狗', name_en: 'Sogou', icon: 'fas fa-paw', url: 'https://www.sogou.com/web?query=' },
    site: { name_zh: '站内搜索', name_en: 'Site Search', icon: 'fas fa-folder-open', url: '' }
};
let currentEngine = localStorage.getItem('currentEngine') || 'bing';

const trigger = document.getElementById('customSelectTrigger');
const dropdown = document.getElementById('customSelectDropdown');
const selectedOptionDiv = document.getElementById('selectedOption');

function updateEngineUI() {
    const engine = engineConfig[currentEngine];
    const engineName = currentLang === 'zh' ? engine.name_zh : engine.name_en;
    if (selectedOptionDiv) {
        selectedOptionDiv.innerHTML = `<i class="${engine.icon}"></i><span>${engineName}</span>`;
    }
    document.querySelectorAll('.select-option').forEach(opt => {
        if (opt.dataset.value === currentEngine) {
            opt.classList.add('selected');
        } else {
            opt.classList.remove('selected');
        }
        const optEngine = engineConfig[opt.dataset.value];
        if (optEngine) {
            const optName = currentLang === 'zh' ? optEngine.name_zh : optEngine.name_en;
            const span = opt.querySelector('span');
            if (span) span.textContent = optName;
        }
    });
}

function switchEngine(newEngine) {
    if (engineConfig[newEngine]) {
        currentEngine = newEngine;
        localStorage.setItem('currentEngine', currentEngine);
        updateEngineUI();
        closeDropdown();
        showHint(`已切换到 ${engineConfig[currentEngine].name_zh}`, false);
    }
}

function switchEngineCycle() {
    let idx = engineList.indexOf(currentEngine);
    idx = (idx + 1) % engineList.length;
    switchEngine(engineList[idx]);
}

function toggleDropdown() {
    if (!dropdown || !trigger) return;
    dropdown.classList.toggle('show');
    trigger.classList.toggle('open');
}

function closeDropdown() {
    if (!dropdown || !trigger) return;
    dropdown.classList.remove('show');
    trigger.classList.remove('open');
}

document.addEventListener('click', function(e) {
    const wrapper = document.getElementById('searchEngineWrapper');
    if (wrapper && !wrapper.contains(e.target)) {
        closeDropdown();
    }
});

if (trigger) {
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });
}

document.getElementById('customSelectDropdown')?.addEventListener('click', function(e) {
    const opt = e.target.closest('.select-option');
    if (opt && opt.dataset.value) {
        switchEngine(opt.dataset.value);
    }
});

document.addEventListener('keydown', function(e) {
    if (e.shiftKey && e.key === 'Tab') {
        e.preventDefault();
        switchEngineCycle();
    }
});

// ========== 新版设置面板下拉菜单初始化 ==========
function initCustomSelect(containerId, options, onChange) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const trigger = container.querySelector('.fanlink-select-trigger');
    const dropdown = container.querySelector('.fanlink-select-dropdown');
    const optionsList = dropdown.querySelectorAll('.fanlink-select-option');
    const selectedText = trigger.querySelector('.selected-text');

    document.body.appendChild(dropdown);

    const savedVal = localStorage.getItem(containerId) || options[0].value;
    let found = false;
    optionsList.forEach(opt => {
        if (opt.dataset.value === savedVal) {
            opt.classList.add('selected');
            selectedText.textContent = opt.querySelector('.option-label').textContent;
            found = true;
        } else {
            opt.classList.remove('selected');
        }
    });
    if (!found && options.length > 0) {
        const firstOpt = optionsList[0];
        firstOpt.classList.add('selected');
        selectedText.textContent = firstOpt.querySelector('.option-label').textContent;
        localStorage.setItem(containerId, firstOpt.dataset.value);
        if(onChange) onChange(firstOpt.dataset.value);
    }

    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.toggle('show');
        trigger.classList.toggle('open', isOpen);

        document.querySelectorAll('.fanlink-select-dropdown.show').forEach(el => {
            if (el !== dropdown) {
                el.classList.remove('show');
                document.querySelectorAll('.fanlink-select-trigger.open').forEach(t => {
                    if (t !== trigger) t.classList.remove('open');
                });
            }
        });

        if (isOpen) {
            const rect = trigger.getBoundingClientRect();
            let leftPos = rect.left;
            let topPos = rect.bottom + 8;
            let width = rect.width;

            dropdown.style.left = leftPos + 'px';
            dropdown.style.top = topPos + 'px';
            dropdown.style.width = width + 'px';
            dropdown.style.minWidth = Math.max(width, 140) + 'px';

            const dropRect = dropdown.getBoundingClientRect();
            if (dropRect.right > window.innerWidth) {
                dropdown.style.left = (window.innerWidth - dropRect.width - 12) + 'px';
            }
            if (dropRect.bottom > window.innerHeight) {
                dropdown.style.top = (rect.top - dropRect.height - 8) + 'px';
            }
        }
    });

    optionsList.forEach(opt => {
        opt.addEventListener('click', (e) => {
            e.stopPropagation();
            const val = opt.dataset.value;
            const text = opt.querySelector('.option-label').textContent;
            localStorage.setItem(containerId, val);
            selectedText.textContent = text;
            optionsList.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            dropdown.classList.remove('show');
            trigger.classList.remove('open');
            if(onChange) onChange(val);
        });
    });

    document.addEventListener('click', (e) => {
        if (!container.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('show');
            trigger.classList.remove('open');
        }
    });

    window.addEventListener('resize', () => {
        if (dropdown.classList.contains('show')) {
            const rect = trigger.getBoundingClientRect();
            let leftPos = rect.left;
            let topPos = rect.bottom + 8;
            let width = rect.width;
            dropdown.style.left = leftPos + 'px';
            dropdown.style.top = topPos + 'px';
            dropdown.style.width = width + 'px';
            const dropRect = dropdown.getBoundingClientRect();
            if (dropRect.right > window.innerWidth) {
                dropdown.style.left = (window.innerWidth - dropRect.width - 12) + 'px';
            }
            if (dropRect.bottom > window.innerHeight) {
                dropdown.style.top = (rect.top - dropRect.height - 8) + 'px';
            }
        }
    });
}

// ========== 标题栏样式 ==========
let currentTitleStyle = localStorage.getItem('titleStyle') || 'time';
const timeHeader = document.getElementById('timeHeader');
const searchBar = document.getElementById('searchBar');
const content = document.getElementById('content');

function setTitleStyle(style) {
    currentTitleStyle = style;
    localStorage.setItem('titleStyle', style);
    if (style === 'time') {
        timeHeader.classList.remove('title-mode');
        timeHeader.classList.add('time-mode');
        searchBar.style.top = '80px';
        content.style.marginTop = '150px';
        updateClock();
    } else {
        timeHeader.classList.remove('time-mode');
        timeHeader.classList.add('title-mode');
        searchBar.style.top = '72px';
        content.style.marginTop = '150px';
    }
    adjustLayoutForOldStyle();
}

let currentTimeFormat = localStorage.getItem('timeFormat') || '24';

function switchTimeFormat(f) {
    currentTimeFormat = f;
    localStorage.setItem('timeFormat', f);
    updateClock();
}

function setSidebarPosition(pos) {
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    if (pos === 'right') {
        sidebar.classList.add('sidebar-right');
        content.classList.add('content-right');
    } else {
        sidebar.classList.remove('sidebar-right');
        content.classList.remove('content-right');
    }
    localStorage.setItem('sidebarPos', pos);
    updateSidebarHiddenState();
}

(function() {
    const savedPos = localStorage.getItem('sidebarPos') || 'left';
    setSidebarPosition(savedPos);
})();

function setLayout(l) {
    let uls = document.querySelectorAll('.category ul');
    uls.forEach(ul => {
        if (l === 'grid') { ul.classList.remove('list-layout'); ul.classList.add('grid-layout'); }
        else { ul.classList.remove('grid-layout'); ul.classList.add('list-layout'); }
    });
    localStorage.setItem('layout', l);
}

function setTheme(theme) {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('selectedTheme', theme);
    document.querySelectorAll('.theme-option').forEach(opt => {
        if (opt.dataset.theme === theme) opt.classList.add('selected');
        else opt.classList.remove('selected');
    });
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    if (localStorage.getItem('oldStyle') === 'true') {
        document.body.classList.add('old-style');
    }
}
const savedTheme = localStorage.getItem('selectedTheme') || 'green';
setTheme(savedTheme);
document.querySelector('.theme-options')?.addEventListener('click', function(e) {
    const opt = e.target.closest('.theme-option');
    if (opt && opt.dataset.theme) {
        setTheme(opt.dataset.theme);
    }
});

function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark ? 'true' : 'false');
    const btn = document.getElementById('darkModeToggleBtn');
    if (btn) {
        btn.classList.toggle('active', isDark);
    }
    showHint(isDark ? '暗黑模式已开启' : '暗黑模式已关闭');
}

(function initDarkMode() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
        document.body.classList.add('dark-mode');
    }
    const btn = document.getElementById('darkModeToggleBtn');
    if (btn) {
        btn.classList.toggle('active', darkModeEnabled);
    }
})();

function toggleHighContrast() {
    const isHighContrast = document.body.classList.toggle('high-contrast');
    localStorage.setItem('highContrast', isHighContrast ? 'true' : 'false');
    const btn = document.getElementById('highContrastToggleBtn');
    if (btn) {
        btn.classList.toggle('active', isHighContrast);
    }
    showHint(isHighContrast ? '高对比度模式已开启' : '高对比度模式已关闭');
}

(function initHighContrast() {
    const highContrastEnabled = localStorage.getItem('highContrast') === 'true';
    if (highContrastEnabled) {
        document.body.classList.add('high-contrast');
    }
    const btn = document.getElementById('highContrastToggleBtn');
    if (btn) {
        btn.classList.toggle('active', highContrastEnabled);
    }
})();

let autoHideBottomBarEnabled = localStorage.getItem('autoHideBottomBarEnabled') === 'true';
let hideBarTimeout = null;

function toggleAutoHideBottomBar() {
    autoHideBottomBarEnabled = !autoHideBottomBarEnabled;
    localStorage.setItem('autoHideBottomBarEnabled', autoHideBottomBarEnabled ? 'true' : 'false');
    const btn = document.getElementById('autoHideBarToggleBtn');
    if (btn) {
        btn.classList.toggle('active', autoHideBottomBarEnabled);
    }
    applyAutoHideBar();
    showHint(autoHideBottomBarEnabled ? '自动隐藏底栏已开启' : '自动隐藏底栏已关闭');
}

function applyAutoHideBar() {
    if (autoHideBottomBarEnabled) {
        document.body.classList.add('auto-hide-bottom-bar');
        const bar = document.getElementById('addressBar');
        if (bar) bar.classList.remove('show');
    } else {
        document.body.classList.remove('auto-hide-bottom-bar');
        const bar = document.getElementById('addressBar');
        if (bar) bar.classList.remove('show');
    }
}

document.addEventListener('mousemove', function(e) {
    if (!autoHideBottomBarEnabled) return;
    const bar = document.getElementById('addressBar');
    if (!bar) return;
    const bottomThreshold = 50;
    const isNearBottom = e.clientY > window.innerHeight - bottomThreshold;
    if (isNearBottom) {
        bar.classList.add('show');
        clearTimeout(hideBarTimeout);
    } else {
        clearTimeout(hideBarTimeout);
        hideBarTimeout = setTimeout(() => {
            bar.classList.remove('show');
        }, 350);
    }
});

function toggleOldStyle() {
    const isOld = document.body.classList.toggle('old-style');
    localStorage.setItem('oldStyle', isOld ? 'true' : 'false');
    const toggle = document.getElementById('oldStyleToggle');
    if (toggle) {
        toggle.classList.toggle('active', isOld);
    }
    adjustLayoutForOldStyle();
    showHint(isOld ? '已切换至旧版样式 (3.01 风格)' : '已恢复至新版样式');
}

function adjustLayoutForOldStyle() {
    const isOld = document.body.classList.contains('old-style');
    const searchBar = document.getElementById('searchBar');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const stickyContainer = document.getElementById('sticky-notes-container');

    if (isOld) {
        if (searchBar) searchBar.style.top = '60px';
        if (sidebar) sidebar.style.top = '120px';
        if (content) content.style.marginTop = '120px';
        if (stickyContainer) stickyContainer.style.top = '120px';
    } else {
        const isTime = currentTitleStyle === 'time';
        if (searchBar) searchBar.style.top = isTime ? '80px' : '72px';
        if (sidebar) sidebar.style.top = '140px';
        if (content) content.style.marginTop = '150px';
        if (stickyContainer) stickyContainer.style.top = '140px';
    }
    updateSidebarHiddenState();
}

(function initOldStyle() {
    const oldStyleEnabled = localStorage.getItem('oldStyle') === 'true';
    if (oldStyleEnabled) {
        document.body.classList.add('old-style');
    }
    const toggle = document.getElementById('oldStyleToggle');
    if (toggle) {
        toggle.classList.toggle('active', oldStyleEnabled);
    }
    setTimeout(adjustLayoutForOldStyle, 50);
})();

let searchRadius = parseInt(localStorage.getItem('searchRadius')) || 40;

function updateSearchRadius(val) {
    searchRadius = parseInt(val);
    localStorage.setItem('searchRadius', searchRadius);
    document.documentElement.style.setProperty('--search-radius', searchRadius + 'px');
    const el = document.getElementById('searchRadiusValue');
    if (el) el.textContent = searchRadius + 'px';
}

let btnRadius = parseInt(localStorage.getItem('btnRadius')) || 40;

function updateBtnRadius(val) {
    btnRadius = parseInt(val);
    localStorage.setItem('btnRadius', btnRadius);
    document.documentElement.style.setProperty('--btn-radius', btnRadius + 'px');
    const el = document.getElementById('btnRadiusValue');
    if (el) el.textContent = btnRadius + 'px';
}

let sidebarOpacity = parseInt(localStorage.getItem('sidebarOpacity')) || 100;

function updateSidebarOpacity(val) {
    sidebarOpacity = parseInt(val);
    localStorage.setItem('sidebarOpacity', sidebarOpacity);
    document.documentElement.style.setProperty('--sidebar-opacity', sidebarOpacity / 100);
    const el = document.getElementById('sidebarOpacityValue');
    if (el) el.textContent = sidebarOpacity + '%';
}

function updateSidebarHiddenState() {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    const isHidden = sidebar.style.display === 'none';
    if (isHidden) {
        sidebar.classList.add('hidden-sidebar');
    } else {
        sidebar.classList.remove('hidden-sidebar');
    }
}

(function initFanlinkSelectors() {
    initCustomSelect('titleStyleSelect', [{ value: 'time' }, { value: 'title' }], (val) => {
        setTitleStyle(val);
    });
    initCustomSelect('timeFormatSelect', [{ value: '24' }, { value: '12' }], (val) => {
        switchTimeFormat(val);
    });
    initCustomSelect('layoutSelect', [{ value: 'list' }, { value: 'grid' }], (val) => {
        setLayout(val);
    });
    initCustomSelect('sidebarPosSelect', [{ value: 'left' }, { value: 'right' }], (val) => {
        setSidebarPosition(val);
    });

    autoHideBottomBarEnabled = localStorage.getItem('autoHideBottomBarEnabled') === 'true';
    const autoBtn = document.getElementById('autoHideBarToggleBtn');
    if (autoBtn) {
        autoBtn.classList.toggle('active', autoHideBottomBarEnabled);
    }
    applyAutoHideBar();

    const savedSearchRadius = localStorage.getItem('searchRadius');
    if (savedSearchRadius !== null) {
        const rangeEl = document.getElementById('searchRadiusRange');
        if (rangeEl) rangeEl.value = savedSearchRadius;
        const valEl = document.getElementById('searchRadiusValue');
        if (valEl) valEl.textContent = savedSearchRadius + 'px';
        document.documentElement.style.setProperty('--search-radius', savedSearchRadius + 'px');
    }
    const savedBtnRadius = localStorage.getItem('btnRadius');
    if (savedBtnRadius !== null) {
        const rangeEl = document.getElementById('btnRadiusRange');
        if (rangeEl) rangeEl.value = savedBtnRadius;
        const valEl = document.getElementById('btnRadiusValue');
        if (valEl) valEl.textContent = savedBtnRadius + 'px';
        document.documentElement.style.setProperty('--btn-radius', savedBtnRadius + 'px');
    }
    const savedSidebarOpacity = localStorage.getItem('sidebarOpacity');
    if (savedSidebarOpacity !== null) {
        const rangeEl = document.getElementById('sidebarOpacityRange');
        if (rangeEl) rangeEl.value = savedSidebarOpacity;
        const valEl = document.getElementById('sidebarOpacityValue');
        if (valEl) valEl.textContent = savedSidebarOpacity + '%';
        document.documentElement.style.setProperty('--sidebar-opacity', savedSidebarOpacity / 100);
    }

    if (localStorage.getItem('sidebarHide') === 'true') {
        const s = document.getElementById('sidebar');
        if (s) s.style.display = 'none';
        updateSidebarHiddenState();
    }
})();

function resetToDefaultBg() {
    document.body.style.backgroundImage = '';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundAttachment = 'fixed';
    localStorage.removeItem('bgImg');
    showHint('已恢复默认背景');
}

function applyWebWallpaper() {
    const url = document.getElementById('web-bg-url')?.value.trim();
    const errorEl = document.getElementById('wallpaper-error');
    if (!url) {
        if (errorEl) {
            errorEl.textContent = translations[currentLang]?.wallpaperError || '请输入图片网址';
            errorEl.classList.add('show');
            setTimeout(() => errorEl.classList.remove('show'), 3000);
        }
        return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        if (errorEl) {
            errorEl.textContent = translations[currentLang]?.wallpaperError || '请输入有效的网址';
            errorEl.classList.add('show');
            setTimeout(() => errorEl.classList.remove('show'), 3000);
        }
        return;
    }
    const img = new Image();
    img.onload = function() {
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        localStorage.setItem('bgImg', url);
        localStorage.setItem('bgImgType', 'web');
        if (errorEl) errorEl.classList.remove('show');
        showHint('壁纸已应用');
    };
    img.onerror = function() {
        if (errorEl) {
            errorEl.textContent = translations[currentLang]?.wallpaperError || '图片加载失败';
            errorEl.classList.add('show');
            setTimeout(() => errorEl.classList.remove('show'), 3000);
        }
    };
    img.src = url;
}

function loadSavedWallpaper() {
    const savedBg = localStorage.getItem('bgImg');
    if (savedBg) {
        document.body.style.backgroundImage = `url('${savedBg}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        if (localStorage.getItem('bgImgType') === 'web') {
            const input = document.getElementById('web-bg-url');
            if (input) input.value = savedBg;
        }
    }
}

function setBackgroundImage(i) {
    if (i.files && i.files[0]) {
        let r = new FileReader();
        r.onload = e => {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundAttachment = 'fixed';
            localStorage.setItem('bgImg', e.target.result);
            showHint('背景已更换');
        };
        r.readAsDataURL(i.files[0]);
    }
}

function getAllSites() {
    let sites = [];
    document.querySelectorAll('.category ul li a').forEach(a => {
        if (a.href && a.href.startsWith('http')) {
            sites.push({ name: a.innerText.trim(), url: a.href });
        }
    });
    return sites;
}

function performSiteSearch(query) {
    const sites = getAllSites();
    const results = sites.filter(s => s.name.toLowerCase().includes(query) || s.url.toLowerCase().includes(query));
    if (results.length === 0) { showHint(`🔍 未找到 "${query}" 相关的收录网站`, true); return null; }
    return results;
}

function showSiteSearchResults(results) {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed; top:140px; left:50%; transform:translateX(-50%); width:400px; max-height:300px; overflow-y:auto; background:var(--theme-dropdown-bg); backdrop-filter:blur(16px); border-radius:28px; padding:12px; z-index:1001; box-shadow:0 8px 32px var(--theme-shadow); border:1px solid var(--theme-border);';
    container.innerHTML = `<div style="padding:8px; border-bottom:1px solid var(--theme-border); font-weight:bold;color:var(--theme-text);">📁 找到 ${results.length} 个收录网站</div>`;
    results.forEach(r => {
        const item = document.createElement('div');
        item.style.cssText = 'padding:10px; border-bottom:1px solid var(--theme-border); cursor:pointer; transition:0.2s; display:flex; align-items:center; gap:8px;color:var(--theme-text);';
        item.innerHTML = `<i class="fas fa-link" style="color:var(--theme-primary);"></i> <span style="color:var(--theme-text);">${r.name}</span>`;
        item.onmouseover = () => item.style.background = 'var(--theme-hover-bg)';
        item.onmouseout = () => item.style.background = 'transparent';
        item.onclick = () => { window.open(r.url, '_blank'); container.remove(); recordVisit(r.url, r.name); };
        container.appendChild(item);
    });
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = 'position:absolute; top:12px; right:12px; width:28px; height:28px; border-radius:50%; background:rgba(100,120,140,0.2); display:flex; align-items:center; justify-content:center; cursor:pointer;color:var(--theme-text);';
    closeBtn.onclick = () => container.remove();
    container.appendChild(closeBtn);
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 8000);
}

function performSearch() {
    const inputEl = document.getElementById('search-input');
    const query = inputEl.value.trim();
    if (!query) {
        inputEl.style.animation = 'shake 0.3s';
        setTimeout(() => inputEl.style.animation = '', 300);
        return;
    }
    if (currentEngine === 'site') {
        const results = performSiteSearch(query.toLowerCase());
        if (results && results.length > 0) showSiteSearchResults(results);
    } else {
        window.open(engineConfig[currentEngine].url + encodeURIComponent(query), '_blank');
    }
    inputEl.value = '';
}

// 显示提示：2 秒后自动清空
function showHint(msg, isError = false) {
    const hint = document.getElementById('cmdHint');
    if (!hint) return;
    hint.textContent = isError ? `⚠️ ${msg}` : `✅ ${msg}`;
    hint.style.background = isError ? 'rgba(200,80,60,0.9)' : 'rgba(0,0,0,0.7)';
    clearTimeout(showHint._t);
    showHint._t = setTimeout(() => {
        hint.textContent = '';
        hint.style.background = 'transparent';
    }, 2000);
}

const allCommands = [
    '/help', '/settings', '/recent',
    '/layout list', '/layout grid',
    '/time 24', '/time 12',
    '/title time', '/title fanlink',
    '/theme green', '/theme blue', '/theme lavender', '/theme peach', '/theme mint', '/theme banana',
    '/dark on', '/dark off', '/dark',
    '/contrast on', '/contrast off', '/contrast',
    '/autohide on', '/autohide off', '/autohide',
    '/sidebar left', '/sidebar right', '/sidebar hide', '/sidebar show',
    '/radius search 40', '/radius btn 40',
    '/opacity 100',
    '/bg reset', '/bg https://...',
    '/notes on', '/notes off', '/addnote', '/clearnotes',
    '/history on', '/history off', '/history clear', '/history',
    '/engine bing', '/engine baidu', '/engine google', '/engine sogou', '/engine site',
    '/oldstyle on', '/oldstyle off', '/oldstyle',
    '/random', '/漫游',
    '/language zh', '/language tw', '/language en', '/language ru',
    '/cft social', '/cft 社交', '/cft news', '/cft 新闻', '/cft tools', '/cft 工具',
    '/cft entertainment', '/cft 娱乐', '/cft learning', '/cft 学习',
    '/cft development', '/cft 开发', '/cft miscellaneous', '/cft 其他',
    '/cft cyber', '/cft 网络安全',
    '/dev'
];

function showCommandError(input) {
    const firstChar = input[1] ? input[1].toLowerCase() : '';
    const suggestions = allCommands.filter(cmd => cmd.startsWith('/' + firstChar) || cmd.toLowerCase().includes(firstChar));
    let msg = `❌ 错误指令: "${input}"`;
    if (suggestions.length > 0 && suggestions.length <= 5) {
        msg += `\n\n💡 您是否想输入:\n${suggestions.map(s => `  • ${s}`).join('\n')}`;
    } else if (suggestions.length > 5) {
        msg += `\n\n💡 以 "/${firstChar}" 开头的指令有 ${suggestions.length} 个，输入 /help 查看全部`;
    } else {
        msg += `\n\n💡 输入 /help 查看所有可用指令`;
    }
    alert(msg);
}

function parseQuickCommand(input) {
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (cmd.startsWith('/language ')) {
        const langCode = cmd.substring(10).trim().toLowerCase();
        const langMap = {
            'zh': 'zh', 'cn': 'zh', '简体中文': 'zh', '中文': 'zh',
            'tw': 'zh-TW', 'zh-tw': 'zh-TW', '繁體中文': 'zh-TW', '繁体': 'zh-TW',
            'en': 'en', 'english': 'en', 'us': 'en',
            'ru': 'ru', 'русский': 'ru', '俄语': 'ru', '俄文': 'ru'
        };
        const targetLang = langMap[langCode];
        if (targetLang) {
            setLanguage(targetLang);
            showHint('已切换语言');
            return true;
        }
        showHint('未知语言代码，可用: zh, tw, en, ru', true);
        return false;
    }

    if (cmd === '/help') { showHelpModal(); return true; }
    if (cmd === '/settings') { toggleSettings(); return true; }
    if (cmd === '/market' || cmd === '/widget market') {
        if (typeof window.openWidgetMarket === 'function') window.openWidgetMarket();
        else showHint('请先开启极简模式', true);
        return true;
    }
    if (cmd === '/widget edit' || cmd === '/edit') {
        if (typeof window.toggleWidgetEditMode === 'function') window.toggleWidgetEditMode();
        else showHint('请先开启极简模式', true);
        return true;
    }
    if (cmd === '/recent') {
        const rc = document.getElementById('recentCard');
        if (rc) rc.scrollIntoView({ behavior: 'smooth' });
        showHint('已跳转最近访问');
        return true;
    }

    if (cmd === '/layout list') { setLayout('list'); showHint('已切换列表布局'); return true; }
    if (cmd === '/layout grid') { setLayout('grid'); showHint('已切换网格布局'); return true; }
    if (cmd === '/layout') { showHint('用法: /layout list 或 /layout grid', true); return true; }

    if (cmd === '/time 24') { switchTimeFormat('24'); showHint('已切换 24 小时制'); return true; }
    if (cmd === '/time 12') { switchTimeFormat('12'); showHint('已切换 12 小时制'); return true; }
    if (cmd === '/time') { showHint('用法: /time 24 或 /time 12', true); return true; }

    if (cmd === '/title time') { setTitleStyle('time'); showHint('标题栏已切换为时间显示'); return true; }
    if (cmd === '/title fanlink' || cmd === '/title title') { setTitleStyle('title'); showHint('标题栏已切换为 Fanlink 标签页'); return true; }
    if (cmd === '/title') { showHint('用法: /title time 或 /title fanlink', true); return true; }

    if (cmd.startsWith('/theme ')) {
        const theme = cmd.substring(7).trim();
        const valid = ['green', 'blue', 'lavender', 'peach', 'mint', 'banana'];
        if (valid.indexOf(theme) !== -1) {
            setTheme(theme);
            showHint('主题已切换: ' + theme);
            return true;
        }
        showHint('可用主题: ' + valid.join(', '), true);
        return false;
    }
    if (cmd === '/theme') { showHint('用法: /theme green|blue|lavender|peach|mint|banana', true); return true; }

    if (cmd === '/dark on') {
        if (!document.body.classList.contains('dark-mode')) toggleDarkMode();
        else showHint('暗黑模式已开启');
        return true;
    }
    if (cmd === '/dark off') {
        if (document.body.classList.contains('dark-mode')) toggleDarkMode();
        else showHint('暗黑模式已关闭');
        return true;
    }
    if (cmd === '/dark') { toggleDarkMode(); return true; }

    if (cmd === '/contrast on') {
        if (!document.body.classList.contains('high-contrast')) toggleHighContrast();
        else showHint('高对比度已开启');
        return true;
    }
    if (cmd === '/contrast off') {
        if (document.body.classList.contains('high-contrast')) toggleHighContrast();
        else showHint('高对比度已关闭');
        return true;
    }
    if (cmd === '/contrast') { toggleHighContrast(); return true; }

    if (cmd === '/autohide on') {
        if (!autoHideBottomBarEnabled) toggleAutoHideBottomBar();
        else showHint('自动隐藏底栏已开启');
        return true;
    }
    if (cmd === '/autohide off') {
        if (autoHideBottomBarEnabled) toggleAutoHideBottomBar();
        else showHint('自动隐藏底栏已关闭');
        return true;
    }
    if (cmd === '/autohide') { toggleAutoHideBottomBar(); return true; }

    if (cmd === '/sidebar left') { setSidebarPosition('left'); showHint('侧边栏已移至左侧'); return true; }
    if (cmd === '/sidebar right') { setSidebarPosition('right'); showHint('侧边栏已移至右侧'); return true; }
    if (cmd === '/sidebar hide') {
        const s = document.getElementById('sidebar');
        if (s.style.display !== 'none') toggleSidebarPermanently();
        else showHint('侧边栏已是隐藏状态');
        return true;
    }
    if (cmd === '/sidebar show') {
        const s = document.getElementById('sidebar');
        if (s.style.display === 'none') toggleSidebarPermanently();
        else showHint('侧边栏已是显示状态');
        return true;
    }
    if (cmd === '/sidebar') { showHint('用法: /sidebar left|right|hide|show', true); return true; }

    if (cmd.startsWith('/radius search ')) {
        const val = parseInt(cmd.substring(15).trim(), 10);
        if (!isNaN(val) && val >= 0 && val <= 60) {
            updateSearchRadius(val);
            const range = document.getElementById('searchRadiusRange');
            if (range) range.value = val;
            showHint('搜索框圆角: ' + val + 'px');
            return true;
        }
        showHint('数值需在 0-60 之间', true);
        return false;
    }
    if (cmd.startsWith('/radius btn ')) {
        const val = parseInt(cmd.substring(12).trim(), 10);
        if (!isNaN(val) && val >= 0 && val <= 60) {
            updateBtnRadius(val);
            const range = document.getElementById('btnRadiusRange');
            if (range) range.value = val;
            showHint('按钮圆角: ' + val + 'px');
            return true;
        }
        showHint('数值需在 0-60 之间', true);
        return false;
    }
    if (cmd === '/radius') { showHint('用法: /radius search 0-60 或 /radius btn 0-60', true); return true; }

    if (cmd.startsWith('/opacity ')) {
        const val = parseInt(cmd.substring(9).trim(), 10);
        if (!isNaN(val) && val >= 0 && val <= 100) {
            updateSidebarOpacity(val);
            const range = document.getElementById('sidebarOpacityRange');
            if (range) range.value = val;
            showHint('侧边栏透明度: ' + val + '%');
            return true;
        }
        showHint('数值需在 0-100 之间', true);
        return false;
    }

    if (cmd === '/bg reset') { resetToDefaultBg(); return true; }
    if (cmd.startsWith('/bg ')) {
        const url = raw.substring(4).trim();
        if (url.startsWith('http://') || url.startsWith('https://')) {
            const img = new Image();
            img.onload = function () {
                document.body.style.backgroundImage = "url('" + url + "')";
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundAttachment = 'fixed';
                localStorage.setItem('bgImg', url);
                localStorage.setItem('bgImgType', 'web');
                const input = document.getElementById('web-bg-url');
                if (input) input.value = url;
                showHint('壁纸已应用');
            };
            img.onerror = function () { showHint('图片加载失败', true); };
            img.src = url;
            return true;
        }
        showHint('用法: /bg reset 或 /bg https://图片地址', true);
        return false;
    }

    if (cmd === '/notes on') { enableStickyNotes(); showHint('便签已启用'); return true; }
    if (cmd === '/notes off') { disableStickyNotes(); showHint('便签已禁用'); return true; }
    if (cmd === '/notes') { showHint('用法: /notes on 或 /notes off', true); return true; }
    if (cmd === '/addnote') { createStickyNote(); showHint('已新建便签'); return true; }
    if (cmd === '/clearnotes') { clearAllNotes(); return true; }

    if (cmd === '/history on') {
        const en = localStorage.getItem('searchHistoryEnabled') !== 'false';
        if (!en) toggleSearchHistory();
        else showHint('搜索历史已开启');
        return true;
    }
    if (cmd === '/history off') {
        const en = localStorage.getItem('searchHistoryEnabled') !== 'false';
        if (en) toggleSearchHistory();
        else showHint('搜索历史已关闭');
        return true;
    }
    if (cmd === '/history clear') {
        if (typeof clearAllSearchHistory === 'function') clearAllSearchHistory();
        return true;
    }
    if (cmd === '/history') { toggleSearchHistory(); return true; }

    if (cmd.startsWith('/engine ')) {
        const eng = cmd.substring(8).trim();
        if (engineConfig[eng]) { switchEngine(eng); return true; }
        showHint('可用引擎: bing, baidu, google, sogou, site', true);
        return false;
    }
    if (cmd === '/engine') { showHint('用法: /engine bing|baidu|google|sogou|site', true); return true; }

    if (cmd === '/oldstyle on') {
        if (!document.body.classList.contains('old-style')) toggleOldStyle();
        else showHint('旧版样式已开启');
        return true;
    }
    if (cmd === '/oldstyle off') {
        if (document.body.classList.contains('old-style')) toggleOldStyle();
        else showHint('旧版样式已关闭');
        return true;
    }
    if (cmd === '/oldstyle') { toggleOldStyle(); return true; }

    if (cmd === '/random' || cmd === '/漫游') { randomSite(); return true; }

    if (cmd.startsWith('/cft ')) {
        const target = cmd.substring(5).trim();
        const map = {
            'social': 'social', '社交': 'social',
            'news': 'news', '新闻': 'news',
            'tools': 'tools', '工具': 'tools',
            'entertainment': 'entertainment', '娱乐': 'entertainment',
            'learning': 'learning', '学习': 'learning',
            'development': 'development', '开发': 'development',
            'miscellaneous': 'miscellaneous', '其他': 'miscellaneous',
            'cyber': 'cyber', '网络安全': 'cyber'
        };
        const id = map[target];
        if (id && document.getElementById(id)) {
            document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
            showHint('跳转到 ' + target);
            return true;
        }
        showHint('未找到分类: ' + target, true);
        return false;
    }

    if (cmd === '/dev') {
        localStorage.setItem('devShortcutEnabled', 'true');
        openDevSettings();
        return true;
    }

    return false;
}

function navigateToAddress() {
    let addr = document.getElementById('addressInput').value.trim();
    if (!addr) return;
    if (addr.startsWith('/')) {
        if (!parseQuickCommand(addr)) showCommandError(addr);
        document.getElementById('addressInput').value = '';
        return;
    }
    if (!addr.startsWith('http')) addr = 'https://' + addr;
    window.open(addr, '_blank');
    document.getElementById('addressInput').value = '';
}

const addressInputEl = document.getElementById('addressInput');
if (addressInputEl) {
    addressInputEl.addEventListener('keypress', e => {
        if (e.key === 'Enter') navigateToAddress();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        const enabled = localStorage.getItem('devShortcutEnabled') === 'true';
        if (enabled) {
            openDevSettings();
        } else {
            showHint('请先输入 /dev 初始化开发者设置', true);
        }
    }
});

function updateClock() {
    const now = new Date();
    let h = now.getHours(), m = String(now.getMinutes()).padStart(2, '0'), s = String(now.getSeconds()).padStart(2, '0');
    const clockEl = document.getElementById('liveClock');
    const dateEl = document.getElementById('liveDate');
    if (!clockEl || !dateEl) return;
    if (currentTimeFormat === '12') {
        let h12 = h % 12 || 12;
        clockEl.innerText = `${String(h12).padStart(2,'0')}:${m}:${s} ${h>=12?'PM':'AM'}`;
    } else {
        clockEl.innerText = `${String(h).padStart(2,'0')}:${m}:${s}`;
    }
    dateEl.innerText = `${now.getFullYear()}.${now.getMonth()+1}.${now.getDate()} ${translations[currentLang]?.weekdays?.[now.getDay()] || ['周日','周一','周二','周三','周四','周五','周六'][now.getDay()]}`;
}
updateClock();
setInterval(updateClock, 1000);

let recentLinks = JSON.parse(localStorage.getItem('recentLinks')) || [], showAllRecent = false, recentEnabled = localStorage.getItem('recentEnabled') === 'true';

function renderRecent() {
    let c = document.getElementById('recent-list');
    if (!c) return;
    let items = showAllRecent ? recentLinks : recentLinks.slice(0, 9);
    if (items.length === 0) {
        const noRecentText = translations[currentLang]?.noRecent || '暂无访问记录';
        c.innerHTML = `<div style="padding:12px;text-align:center;color:var(--theme-text-light);">${noRecentText}</div>`;
        return;
    }
    c.innerHTML = items.map(l => `<div class="recent-item"><a href="${l.url}" target="_blank"><i class="fas fa-link"></i> ${l.title.length>24?l.title.slice(0,22)+'..':l.title}</a></div>`).join('');
}

function recordVisit(url, title) {
    if (!url || !recentEnabled) return;
    recentLinks = recentLinks.filter(l => l.url !== url);
    recentLinks.unshift({ url, title: title || url, time: Date.now() });
    if (recentLinks.length > 30) recentLinks.pop();
    localStorage.setItem('recentLinks', JSON.stringify(recentLinks));
    renderRecent();
}

function clearRecent() { recentLinks = []; localStorage.setItem('recentLinks', '[]'); renderRecent(); }

function toggleRecentFeature() {
    recentEnabled = !recentEnabled;
    localStorage.setItem('recentEnabled', recentEnabled);
    const rc = document.getElementById('recentCard');
    if (rc) rc.style.display = recentEnabled ? 'block' : 'none';
    if (recentEnabled) renderRecent();
}
document.getElementById('moreRecentBtn')?.addEventListener('click', () => { showAllRecent = !showAllRecent; renderRecent(); });
document.getElementById('clearRecentBtn')?.addEventListener('click', clearRecent);
document.getElementById('toggleRecentBtn')?.addEventListener('click', toggleRecentFeature);
document.getElementById('forceClearRecentBtn')?.addEventListener('click', clearRecent);
if (recentEnabled) {
    const rc = document.getElementById('recentCard');
    if (rc) rc.style.display = 'block';
}
renderRecent();
document.getElementById('content')?.addEventListener('click', function(e) {
    const link = e.target.closest('.category ul li a');
    if (link && link.href.startsWith('http')) {
        setTimeout(() => recordVisit(link.href, link.innerText.trim()), 30);
    }
});

function randomSite() {
    let all = [...document.querySelectorAll('.category ul li a')].filter(a => a.href.startsWith('http'));
    if (all.length) {
        let r = all[Math.floor(Math.random() * all.length)];
        window.open(r.href, '_blank');
        recordVisit(r.href, r.innerText);
    }
}

function toggleSidebarPermanently() {
    let s = document.getElementById('sidebar');
    if (!s) return;
    if (s.style.display === 'none') {
        s.style.display = '';
        localStorage.setItem('sidebarHide', 'false');
        showHint('侧边栏已显示');
    } else {
        s.style.display = 'none';
        localStorage.setItem('sidebarHide', 'true');
        showHint('侧边栏已隐藏');
    }
    updateSidebarHiddenState();
}

let savedBg = localStorage.getItem('bgImg');
if (savedBg) document.body.style.backgroundImage = `url(${savedBg})`;
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundAttachment = 'fixed';

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('settingsOverlay');
    if (!panel || !overlay) return;
    const isActive = panel.classList.toggle('active');
    overlay.classList.toggle('active', isActive);
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function switchSettingsTab(tabId) {
    document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
    const section = document.getElementById(tabId);
    if (section) section.classList.add('active');
    const navItem = document.querySelector(`.settings-nav-item[data-tab="${tabId}"]`);
    if (navItem) navItem.classList.add('active');
}
document.querySelectorAll('.settings-nav-item').forEach(item => item.addEventListener('click', () => switchSettingsTab(item.dataset.tab)));

function openDevSettings() {
    const panel = document.getElementById('devSettingsPanel');
    const overlay = document.getElementById('devOverlay');
    if (!panel || !overlay) return;
    const t = translations[currentLang];
    const title = document.querySelector('#devSettingsPanel .dev-settings-header h2');
    if (title) title.innerHTML = '<i class="fas fa-code"></i> ' + (t.devTitle || '开发者设置');
    const oldLabel = document.querySelector('#devSettingsPanel .dev-section .dev-item .dev-label');
    if (oldLabel) oldLabel.textContent = t.devOldStyleDesc || '切换回 Fanlink 3.01 的经典视觉风格';
    const devFooter = document.querySelector('#devSettingsPanel .dev-footer');
    if (devFooter) devFooter.innerHTML = '<i class="fas fa-flask"></i> ' + (t.devFooter || '所有功能为实验性功能。');

    panel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDevSettings() {
    const panel = document.getElementById('devSettingsPanel');
    const overlay = document.getElementById('devOverlay');
    if (!panel || !overlay) return;
    panel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('devOverlay')?.addEventListener('click', closeDevSettings);

let notesEnabled = localStorage.getItem('notesEnabled') === 'true', stickyNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [], noteColor = '#fff8c9';
let draggingNote = null, dragOffsetX = 0, dragOffsetY = 0;

function enableStickyNotes() {
    notesEnabled = true;
    localStorage.setItem('notesEnabled', 'true');
    const container = document.getElementById('sticky-notes-container');
    const addBtn = document.getElementById('add-note-btn');
    if (container) container.style.display = 'flex';
    if (addBtn) addBtn.style.display = 'flex';
    loadStickyNotes();
}

function disableStickyNotes() {
    notesEnabled = false;
    localStorage.setItem('notesEnabled', 'false');
    const container = document.getElementById('sticky-notes-container');
    const addBtn = document.getElementById('add-note-btn');
    if (container) container.style.display = 'none';
    if (addBtn) addBtn.style.display = 'none';
}

function loadStickyNotes() {
    let c = document.getElementById('sticky-notes-container');
    if (!c) return;
    c.innerHTML = '';
    stickyNotes.forEach(n => createStickyNoteElement(n));
}

function startDrag(e, noteElement) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
    e.preventDefault();
    draggingNote = noteElement;
    noteElement.style.position = 'fixed';
    noteElement.style.right = 'auto';
    noteElement.style.bottom = 'auto';
    noteElement.style.transform = '';
    const rect = noteElement.getBoundingClientRect();
    dragOffsetX = e.clientX - rect.left;
    dragOffsetY = e.clientY - rect.top;
    noteElement.style.cursor = 'grabbing';
    noteElement.style.zIndex = '10000';
}

function onDrag(e) {
    if (!draggingNote) return;
    e.preventDefault();
    draggingNote.style.left = (e.clientX - dragOffsetX) + 'px';
    draggingNote.style.top = (e.clientY - dragOffsetY) + 'px';
}

function stopDrag() {
    if (draggingNote) {
        draggingNote.style.cursor = '';
        draggingNote.style.zIndex = '';
        saveNotePosition(draggingNote.dataset.id, draggingNote.style.left, draggingNote.style.top);
        draggingNote = null;
    }
}

document.addEventListener('mousemove', onDrag);
document.addEventListener('mouseup', stopDrag);

function createStickyNoteElement(note) {
    let div = document.createElement('div');
    div.className = 'sticky-note';
    div.style.background = `linear-gradient(135deg, ${note.color}, #fff2bf)`;
    div.dataset.id = note.id;
    if (note.left && note.top && note.left !== 'auto') {
        div.style.left = note.left;
        div.style.top = note.top;
        div.style.position = 'fixed';
        div.style.right = 'auto';
        div.style.bottom = 'auto';
    }
    div.innerHTML = `<div class="sticky-note-header"><input class="sticky-note-title" value="${note.title.replace(/"/g,'&quot;')}" placeholder="便签标题"><button class="sticky-note-btn" data-action="deleteNote" data-note-id="${note.id}"><i class="fas fa-trash"></i></button></div><div class="sticky-note-content" contenteditable="true">${note.content}</div><div class="sticky-note-footer">${new Date(note.date).toLocaleDateString()}</div>`;
    document.getElementById('sticky-notes-container').appendChild(div);
    div.querySelector('.sticky-note-header').addEventListener('mousedown', (e) => startDrag(e, div));
    div.querySelector('.sticky-note-title').addEventListener('input', () => saveNotes());
    div.querySelector('.sticky-note-content').addEventListener('input', () => saveNotes());
}

function saveNotePosition(id, left, top) {
    let idx = stickyNotes.findIndex(n => n.id == id);
    if (idx !== -1) { stickyNotes[idx].left = left; stickyNotes[idx].top = top; saveNotes(); }
}

function saveNotes() {
    document.querySelectorAll('.sticky-note').forEach(el => {
        let id = parseInt(el.dataset.id);
        let title = el.querySelector('.sticky-note-title').value;
        let content = el.querySelector('.sticky-note-content').innerHTML;
        let idx = stickyNotes.findIndex(n => n.id === id);
        if (idx !== -1) { stickyNotes[idx].title = title; stickyNotes[idx].content = content; }
    });
    localStorage.setItem('stickyNotes', JSON.stringify(stickyNotes));
}

function createStickyNote() {
    const x = Math.round((window.innerWidth - 280) / 2);
    const y = Math.round((window.innerHeight - 260) / 2);
    let newNote = { id: Date.now(), title: '新便签', content: '', color: noteColor, date: new Date().toISOString(), left: x + 'px', top: y + 'px' };
    stickyNotes.push(newNote);
    saveNotes();
    createStickyNoteElement(newNote);
}

function deleteNote(id) {
    stickyNotes = stickyNotes.filter(n => n.id !== id);
    saveNotes();
    document.querySelector(`.sticky-note[data-id="${id}"]`)?.remove();
}

function clearAllNotes() {
    if (confirm('清除所有便签？')) {
        stickyNotes = [];
        saveNotes();
        const c = document.getElementById('sticky-notes-container');
        if (c) c.innerHTML = '';
    }
}
if (notesEnabled) enableStickyNotes();
else disableStickyNotes();

setTitleStyle(currentTitleStyle);
updateEngineUI();
updateLanguageUI();
applyTranslations();
loadSavedWallpaper();

function showHelpModal() {
    updateHelpModalText();
    const modal = document.getElementById('helpModal');
    if (!modal) return;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeHelpModal() {
    const modal = document.getElementById('helpModal');
    if (!modal) return;
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

document.getElementById('helpModal')?.addEventListener('click', function(e) {
    if (e.target === this) closeHelpModal();
});

function updateHelpModalText() {
    const t = translations[currentLang];
    const title = document.querySelector('.help-title');
    if (title) title.textContent = t.helpTitle || '快捷指令大全';
    const langTitle = document.querySelector('.help-lang-title');
    if (langTitle) langTitle.textContent = t.helpLang || '语言切换';
    const catTitle = document.querySelector('.help-cat-title');
    if (catTitle) catTitle.textContent = t.helpCat || '分类跳转';
    const sysTitle = document.querySelector('.help-sys-title');
    if (sysTitle) sysTitle.textContent = t.helpSys || '系统功能';
}

window.performSearch = performSearch;
window.toggleSidebarPermanently = toggleSidebarPermanently;
window.setLayout = setLayout;
window.randomSite = randomSite;
window.toggleSettings = toggleSettings;
window.enableStickyNotes = enableStickyNotes;
window.disableStickyNotes = disableStickyNotes;
window.createStickyNote = createStickyNote;
window.clearAllNotes = clearAllNotes;
window.deleteNote = deleteNote;
window.setBackgroundImage = setBackgroundImage;
window.resetToDefaultBg = resetToDefaultBg;
window.navigateToAddress = navigateToAddress;
window.setLanguage = setLanguage;
window.closeHelpModal = closeHelpModal;
window.openDevSettings = openDevSettings;
window.closeDevSettings = closeDevSettings;
window.toggleDarkMode = toggleDarkMode;
window.toggleAutoHideBottomBar = toggleAutoHideBottomBar;
window.toggleHighContrast = toggleHighContrast;
window.toggleOldStyle = toggleOldStyle;
window.updateSearchRadius = updateSearchRadius;
window.updateBtnRadius = updateBtnRadius;
window.updateSidebarOpacity = updateSidebarOpacity;
window.parseQuickCommand = parseQuickCommand;
window.setTheme = setTheme;
window.setTitleStyle = setTitleStyle;
window.switchTimeFormat = switchTimeFormat;
window.setSidebarPosition = setSidebarPosition;
window.switchEngine = switchEngine;

/* ================================================================
   搜索历史功能模块
   ================================================================ */
(function () {
    'use strict';

    const SH_I18N = {
        zh: {
            nav: '搜索历史',
            toggleLabel: '搜索历史',
            manageTitle: '搜索历史管理',
            clearAll: '清除所有搜索历史',
            empty: '暂无搜索历史记录',
            headerText: '搜索历史',
            countPrefix: '共 ',
            countSuffix: ' 条记录',
            on: '搜索历史已开启',
            off: '搜索历史已关闭',
            cleared: '搜索历史已清空',
            nothingToClear: '暂无搜索历史',
            confirmClear: '确定要清除所有搜索历史吗？',
            removeHint: '已删除该条历史'
        },
        'zh-TW': {
            nav: '搜尋歷史',
            toggleLabel: '搜尋歷史',
            manageTitle: '搜尋歷史管理',
            clearAll: '清除所有搜尋歷史',
            empty: '暫無搜尋歷史記錄',
            headerText: '搜尋歷史',
            countPrefix: '共 ',
            countSuffix: ' 筆記錄',
            on: '搜尋歷史已開啟',
            off: '搜尋歷史已關閉',
            cleared: '搜尋歷史已清空',
            nothingToClear: '暫無搜尋歷史',
            confirmClear: '確定要清除所有搜尋歷史嗎？',
            removeHint: '已刪除該筆歷史'
        },
        en: {
            nav: 'Search History',
            toggleLabel: 'Search History',
            manageTitle: 'Search History',
            clearAll: 'Clear All History',
            empty: 'No search history yet',
            headerText: 'Search History',
            countPrefix: '',
            countSuffix: ' record(s)',
            on: 'Search history enabled',
            off: 'Search history disabled',
            cleared: 'Search history cleared',
            nothingToClear: 'No search history',
            confirmClear: 'Clear all search history?',
            removeHint: 'History entry removed'
        },
        ru: {
            nav: 'История поиска',
            toggleLabel: 'История поиска',
            manageTitle: 'Управление историей',
            clearAll: 'Очистить всю историю',
            empty: 'История поиска пуста',
            headerText: 'История поиска',
            countPrefix: 'Всего: ',
            countSuffix: '',
            on: 'История поиска включена',
            off: 'История поиска отключена',
            cleared: 'История поиска очищена',
            nothingToClear: 'История пуста',
            confirmClear: 'Очистить всю историю поиска?',
            removeHint: 'Запись удалена'
        }
    };

    function shT() {
        return SH_I18N[currentLang] || SH_I18N.zh;
    }

    const SH_MAX = 100;
    const SH_DROPDOWN_MAX = 8;

    function getMatchThreshold() {
        const v = parseInt(localStorage.getItem('searchHistoryMatchThreshold'), 10);
        if (isNaN(v) || v < 0 || v > 100) return 0.5;
        return v / 100;
    }

    let searchHistoryEnabled = localStorage.getItem('searchHistoryEnabled') !== 'false';
    let searchHistoryList = [];

    try {
        const raw = localStorage.getItem('searchHistory');
        if (raw) {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                searchHistoryList = parsed.filter(function (i) {
                    return i && typeof i.q === 'string' && i.q.trim();
                });
            }
        }
    } catch (err) {
        searchHistoryList = [];
    }

    function escapeHtml(str) {
        return String(str).replace(/[&<>"']/g, function (c) {
            return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c];
        });
    }

    function formatHistoryTime(ts) {
        if (!ts) return '';
        const d = new Date(ts);
        if (isNaN(d.getTime())) return '';
        return (d.getMonth() + 1) + '/' + d.getDate() + ' ' +
            String(d.getHours()).padStart(2, '0') + ':' +
            String(d.getMinutes()).padStart(2, '0');
    }

    function calcMatchRatio(input, history) {
        const a = String(input || '').toLowerCase().trim();
        const b = String(history || '').toLowerCase();
        if (!a || !b) return 0;
        if (b.indexOf(a) !== -1) return 1;

        const pool = {};
        for (let i = 0; i < b.length; i++) {
            const ch = b.charAt(i);
            pool[ch] = (pool[ch] || 0) + 1;
        }
        let matched = 0;
        for (let i = 0; i < a.length; i++) {
            const ch = a.charAt(i);
            if (pool[ch] > 0) {
                matched++;
                pool[ch]--;
            }
        }
        return matched / a.length;
    }

    function saveSearchHistory() {
        try {
            localStorage.setItem('searchHistory', JSON.stringify(searchHistoryList));
        } catch (err) { /* ignore */ }
    }

    function addSearchHistory(query) {
        if (!searchHistoryEnabled) return;
        const q = String(query || '').trim();
        if (!q) return;

        const lower = q.toLowerCase();
        searchHistoryList = searchHistoryList.filter(function (item) {
            return item.q.toLowerCase() !== lower;
        });
        searchHistoryList.unshift({ q: q, time: Date.now() });
        if (searchHistoryList.length > SH_MAX) {
            searchHistoryList.length = SH_MAX;
        }
        saveSearchHistory();
        renderSearchHistoryManageList();
    }

    function removeSearchHistoryItem(query) {
        searchHistoryList = searchHistoryList.filter(function (item) {
            return item.q !== query;
        });
        saveSearchHistory();
        renderSearchHistoryManageList();
        const dd = document.getElementById('searchHistoryDropdown');
        if (dd && dd.classList.contains('show')) {
            handleSearchInput();
        }
    }

    function clearAllSearchHistory() {
        const t = shT();
        if (searchHistoryList.length === 0) {
            if (typeof showHint === 'function') showHint(t.nothingToClear, true);
            return;
        }
        if (!window.confirm(t.confirmClear)) return;
        searchHistoryList = [];
        saveSearchHistory();
        hideSearchHistoryDropdown();
        renderSearchHistoryManageList();
        if (typeof showHint === 'function') showHint(t.cleared, false);
    }

    function getMatchingHistory(input) {
        const threshold = getMatchThreshold();
        const results = [];
        for (let i = 0; i < searchHistoryList.length; i++) {
            const item = searchHistoryList[i];
            const ratio = calcMatchRatio(input, item.q);
            if (ratio >= threshold) {
                results.push({ q: item.q, time: item.time, ratio: ratio });
            }
        }
        results.sort(function (a, b) {
            if (b.ratio !== a.ratio) return b.ratio - a.ratio;
            return (b.time || 0) - (a.time || 0);
        });
        return results.slice(0, SH_DROPDOWN_MAX);
    }

    function highlightMatch(text, input) {
        const idx = String(text).toLowerCase().indexOf(String(input).toLowerCase());
        if (idx === -1) return escapeHtml(text);
        return escapeHtml(text.slice(0, idx)) +
            '<mark class="search-history-mark">' +
            escapeHtml(text.slice(idx, idx + input.length)) +
            '</mark>' +
            escapeHtml(text.slice(idx + input.length));
    }

    function renderSearchHistoryDropdown(matches, inputValue) {
        const dd = document.getElementById('searchHistoryDropdown');
        if (!dd) return;
        const t = shT();

        let html = '<div class="search-history-header">' +
            '<i class="fas fa-history"></i>' +
            '<span class="history-header-text">' + escapeHtml(t.headerText) + '</span>' +
            '<button class="search-history-clear-all" type="button" title="' + escapeHtml(t.clearAll) + '">' +
            '<i class="fas fa-trash-alt"></i></button>' +
            '</div>';

        html += matches.map(function (item, i) {
            const delay = Math.min(i * 0.025, 0.15);
            return '<div class="search-history-item" data-query="' + escapeHtml(item.q) + '"' +
                ' style="animation-delay:' + delay + 's">' +
                '<i class="fas fa-clock search-history-icon"></i>' +
                '<span class="search-history-text">' + highlightMatch(item.q, inputValue) + '</span>' +
                '<button class="search-history-remove" type="button" data-query="' + escapeHtml(item.q) + '">' +
                '<i class="fas fa-times"></i></button>' +
                '</div>';
        }).join('');

        dd.innerHTML = html;
    }

    function positionSearchHistoryDropdown() {
        const inputEl = document.getElementById('search-input');
        const dd = document.getElementById('searchHistoryDropdown');
        if (!inputEl || !dd) return;

        const rect = inputEl.getBoundingClientRect();
        const width = Math.max(rect.width, 260);

        dd.style.width = width + 'px';

        const ddHeight = dd.offsetHeight || 220;
        let left = rect.left;
        let top = rect.bottom + 8;

        if (left + width > window.innerWidth - 12) {
            left = Math.max(12, window.innerWidth - width - 12);
        }
        if (top + ddHeight > window.innerHeight - 12) {
            const above = rect.top - ddHeight - 8;
            top = above >= 12 ? above : Math.max(12, window.innerHeight - ddHeight - 12);
        }

        dd.style.left = left + 'px';
        dd.style.top = top + 'px';
    }

    function showSearchHistoryDropdown() {
        const dd = document.getElementById('searchHistoryDropdown');
        if (!dd) return;
        dd.classList.add('show');
    }

    function hideSearchHistoryDropdown() {
        const dd = document.getElementById('searchHistoryDropdown');
        if (!dd) return;
        dd.classList.remove('show');
    }

    function handleSearchInput() {
        const inputEl = document.getElementById('search-input');
        const dd = document.getElementById('searchHistoryDropdown');
        if (!inputEl || !dd) return;

        if (!searchHistoryEnabled || searchHistoryList.length === 0) {
            hideSearchHistoryDropdown();
            return;
        }

        const value = inputEl.value.trim();
        if (!value) {
            hideSearchHistoryDropdown();
            return;
        }

        const matches = getMatchingHistory(value);
        if (matches.length === 0) {
            hideSearchHistoryDropdown();
            return;
        }

        renderSearchHistoryDropdown(matches, value);
        positionSearchHistoryDropdown();
        showSearchHistoryDropdown();
    }

    function selectSearchHistory(query) {
        const inputEl = document.getElementById('search-input');
        if (!inputEl) return;
        hideSearchHistoryDropdown();
        inputEl.value = query;
        if (typeof window.performSearch === 'function') {
            window.performSearch();
        }
    }

    function onDropdownClick(e) {
        const clearBtn = e.target.closest('.search-history-clear-all');
        if (clearBtn) {
            e.stopPropagation();
            clearAllSearchHistory();
            return;
        }

        const removeBtn = e.target.closest('.search-history-remove');
        if (removeBtn) {
            e.stopPropagation();
            removeSearchHistoryItem(removeBtn.dataset.query);
            if (typeof showHint === 'function') showHint(shT().removeHint, false);
            return;
        }

        const item = e.target.closest('.search-history-item');
        if (item && item.dataset.query !== undefined) {
            e.stopPropagation();
            selectSearchHistory(item.dataset.query);
        }
    }

    function renderSearchHistoryManageList() {
        const listEl = document.getElementById('searchHistoryManageList');
        if (!listEl) return;
        const t = shT();

        const titleEl = document.querySelector('.search-history-manage-title');
        if (titleEl) titleEl.textContent = t.manageTitle;

        const countEl = document.querySelector('.search-history-count-label');
        if (countEl) {
            countEl.innerHTML = '<i class="fas fa-list-ul"></i> ' + t.countPrefix +
                searchHistoryList.length + t.countSuffix;
        }

        const clearText = document.querySelector('.search-history-clear-text');
        if (clearText) clearText.textContent = t.clearAll;

        if (searchHistoryList.length === 0) {
            listEl.innerHTML = '<div class="search-history-empty">' +
                '<i class="fas fa-inbox"></i>' +
                '<span>' + escapeHtml(t.empty) + '</span>' +
                '</div>';
            return;
        }

        listEl.innerHTML = searchHistoryList.map(function (item, i) {
            const delay = Math.min(i * 0.02, 0.3);
            return '<div class="search-history-manage-item" style="animation-delay:' + delay + 's">' +
                '<i class="fas fa-history"></i>' +
                '<span class="manage-text" title="' + escapeHtml(item.q) + '">' + escapeHtml(item.q) + '</span>' +
                '<span class="manage-time">' + formatHistoryTime(item.time) + '</span>' +
                '<button class="manage-delete" type="button" data-query="' + escapeHtml(item.q) + '">' +
                '<i class="fas fa-times"></i></button>' +
                '</div>';
        }).join('');
    }

    function updateSearchHistoryI18n() {
        const t = shT();

        const navItem = document.querySelector('.settings-nav-item[data-tab="searchHistory"]');
        if (navItem) navItem.innerHTML = ' ' + t.nav;

        const toggleLabel = document.querySelector('.search-history-toggle-label');
        if (toggleLabel) toggleLabel.textContent = t.toggleLabel;

        renderSearchHistoryManageList();

        const dd = document.getElementById('searchHistoryDropdown');
        if (dd && dd.classList.contains('show')) {
            handleSearchInput();
        }
    }

    function toggleSearchHistory() {
        searchHistoryEnabled = !searchHistoryEnabled;
        localStorage.setItem('searchHistoryEnabled', searchHistoryEnabled ? 'true' : 'false');

        const btn = document.getElementById('searchHistoryToggleBtn');
        if (btn) btn.classList.toggle('active', searchHistoryEnabled);

        if (!searchHistoryEnabled) hideSearchHistoryDropdown();

        const t = shT();
        if (typeof showHint === 'function') {
            showHint(searchHistoryEnabled ? t.on : t.off, !searchHistoryEnabled);
        }
    }

    function updateMatchThreshold(val) {
        const num = parseInt(val, 10);
        if (isNaN(num) || num < 0 || num > 100) return;

        localStorage.setItem('searchHistoryMatchThreshold', num);

        const valueEl = document.getElementById('matchThresholdValue');
        if (valueEl) valueEl.textContent = num + '%';

        const dd = document.getElementById('searchHistoryDropdown');
        if (dd && dd.classList.contains('show')) {
            handleSearchInput();
        }
    }

    function initSearchHistory() {
        const inputEl = document.getElementById('search-input');
        const dd = document.getElementById('searchHistoryDropdown');

        const toggleBtn = document.getElementById('searchHistoryToggleBtn');
        if (toggleBtn) toggleBtn.classList.toggle('active', searchHistoryEnabled);

        const savedThreshold = localStorage.getItem('searchHistoryMatchThreshold');
        const thresholdVal = savedThreshold !== null ? parseInt(savedThreshold, 10) : 50;
        const rangeEl = document.getElementById('matchThresholdRange');
        if (rangeEl) rangeEl.value = thresholdVal;
        const thresholdValEl = document.getElementById('matchThresholdValue');
        if (thresholdValEl) thresholdValEl.textContent = thresholdVal + '%';

        if (inputEl) {
            inputEl.addEventListener('input', handleSearchInput);
            inputEl.addEventListener('focus', handleSearchInput);
            inputEl.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') hideSearchHistoryDropdown();
            });
        }

        if (dd) dd.addEventListener('click', onDropdownClick);

        const manageList = document.getElementById('searchHistoryManageList');
        if (manageList) {
            manageList.addEventListener('click', function (e) {
                const del = e.target.closest('.manage-delete');
                if (del) {
                    e.stopPropagation();
                    removeSearchHistoryItem(del.dataset.query);
                    if (typeof showHint === 'function') showHint(shT().removeHint, false);
                }
            });
        }

        const navItem = document.querySelector('.settings-nav-item[data-tab="searchHistory"]');
        if (navItem) {
            navItem.addEventListener('click', function () {
                renderSearchHistoryManageList();
            });
        }

        document.addEventListener('mousedown', function (e) {
            const panel = document.getElementById('searchHistoryDropdown');
            const input = document.getElementById('search-input');
            if (!panel || !panel.classList.contains('show')) return;
            if (panel.contains(e.target)) return;
            if (input && (e.target === input || input.contains(e.target))) return;
            hideSearchHistoryDropdown();
        });

        window.addEventListener('resize', function () {
            const panel = document.getElementById('searchHistoryDropdown');
            if (panel && panel.classList.contains('show')) {
                positionSearchHistoryDropdown();
            }
        });

        window.addEventListener('scroll', function () {
            const panel = document.getElementById('searchHistoryDropdown');
            if (panel && panel.classList.contains('show')) {
                positionSearchHistoryDropdown();
            }
        }, { passive: true });

        updateSearchHistoryI18n();
    }

    (function wrapPerformSearch() {
        const original = window.performSearch;
        if (typeof original !== 'function') return;
        window.performSearch = function () {
            const inputEl = document.getElementById('search-input');
            const q = inputEl ? inputEl.value.trim() : '';
            if (q && q.charAt(0) !== '/') {
                addSearchHistory(q);
            }
            hideSearchHistoryDropdown();
            return original.apply(this, arguments);
        };
    })();

    (function wrapSetLanguage() {
        const original = window.setLanguage;
        if (typeof original !== 'function') return;
        window.setLanguage = function (lang) {
            const result = original.apply(this, arguments);
            updateSearchHistoryI18n();
            return result;
        };
    })();

    window.toggleSearchHistory = toggleSearchHistory;
    window.clearAllSearchHistory = clearAllSearchHistory;
    window.removeSearchHistoryItem = removeSearchHistoryItem;
    window.updateMatchThreshold = updateMatchThreshold;

    initSearchHistory();
})();

/* ================================================================
   MV3 扩展必需：统一事件委托绑定
   ================================================================ */
(function bindDelegatedActions() {
    'use strict';

    document.body.addEventListener('click', function (e) {
        const actionEl = e.target.closest('[data-action]');
        if (!actionEl) return;
        const action = actionEl.dataset.action;
        e.stopPropagation();

        switch (action) {
            case 'performSearch': performSearch(); break;
            case 'randomSite': randomSite(); break;
            case 'toggleDarkMode': toggleDarkMode(); break;
            case 'toggleHighContrast': toggleHighContrast(); break;
            case 'toggleAutoHideBottomBar': toggleAutoHideBottomBar(); break;
            case 'toggleDailyQuote':
                if (typeof window.toggleDailyQuote === 'function') window.toggleDailyQuote();
                break;
            case 'toggleMinimalMode':
                if (typeof window.toggleMinimalMode === 'function') window.toggleMinimalMode();
                break;
            case 'toggleDockEnabled':
                if (typeof window.toggleDockEnabled === 'function') window.toggleDockEnabled();
                break;
            case 'toggleSearchHistory':
                if (typeof window.toggleSearchHistory === 'function') window.toggleSearchHistory();
                break;
            case 'toggleSidebarPermanently': toggleSidebarPermanently(); break;
            case 'applyWebWallpaper': applyWebWallpaper(); break;
            case 'resetToDefaultBg': resetToDefaultBg(); break;
            case 'enableStickyNotes': enableStickyNotes(); break;
            case 'disableStickyNotes': disableStickyNotes(); break;
            case 'createStickyNote': createStickyNote(); break;
            case 'clearAllNotes': clearAllNotes(); break;
            case 'clearAllSearchHistory':
                if (typeof window.clearAllSearchHistory === 'function') window.clearAllSearchHistory();
                break;
            case 'toggleSettings': toggleSettings(); break;
            case 'closeDevSettings': closeDevSettings(); break;
            case 'toggleOldStyle': toggleOldStyle(); break;
            case 'navigateToAddress': navigateToAddress(); break;
            case 'closeHelpModal': closeHelpModal(); break;
            case 'setLanguage': {
                const lang = actionEl.dataset.lang;
                if (lang) setLanguage(lang);
                break;
            }
            case 'deleteNote': {
                const id = parseInt(actionEl.dataset.noteId, 10);
                if (!isNaN(id)) deleteNote(id);
                break;
            }
            default: break;
        }
    });

    document.body.addEventListener('input', function (e) {
        const inputEl = e.target.closest('[data-input-action]');
        if (!inputEl) return;
        const action = inputEl.dataset.inputAction;
        const val = inputEl.value;
        switch (action) {
            case 'updateSearchRadius': updateSearchRadius(val); break;
            case 'updateBtnRadius': updateBtnRadius(val); break;
            case 'updateSidebarOpacity': updateSidebarOpacity(val); break;
            case 'updateMatchThreshold':
                if (typeof window.updateMatchThreshold === 'function') window.updateMatchThreshold(val);
                break;
            default: break;
        }
    });

    const bgFile = document.getElementById('bg-image');
    if (bgFile) {
        bgFile.addEventListener('change', function () {
            setBackgroundImage(this);
        });
    }

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') performSearch();
        });
    }
})();

/* ================================================================
   每日一言
   ================================================================ */
(function initDailyQuote() {
    'use strict';

    let quoteCache = null;

    function getDefaultPlaceholder() {
        return (translations[currentLang] && translations[currentLang].placeholder) || '搜索或输入网址...';
    }

    function isDailyQuoteEnabled() {
        return localStorage.getItem('dailyQuoteEnabled') !== 'false';
    }

    async function fetchQuote() {
        try {
            let url = 'text.txt';
            if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.getURL) {
                url = chrome.runtime.getURL('text.txt');
            }

            const res = await fetch(url);
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const text = await res.text();

            const lines = text.split(/\r?\n/);

            const oddLines = [];
            for (let i = 0; i < lines.length; i += 2) {
                const line = lines[i].trim();
                if (line) oddLines.push(line);
            }

            if (oddLines.length === 0) return null;

            return oddLines[Math.floor(Math.random() * oddLines.length)];
        } catch (err) {
            console.warn('[Fanlink] 每日一言加载失败:', err);
            return null;
        }
    }

    async function applyQuote() {
        const inputs = [
            document.getElementById('search-input'),
            document.getElementById('minimalSearchInput')
        ].filter(Boolean);

        // 包含所有小组件搜索框
        document.querySelectorAll('.widget-search-input').forEach(el => inputs.push(el));

        if (inputs.length === 0) return;

        if (!isDailyQuoteEnabled()) {
            inputs.forEach(el => { el.placeholder = getDefaultPlaceholder(); });
            return;
        }

        if (quoteCache === null) {
            quoteCache = await fetchQuote();
        }

        if (!quoteCache) {
            inputs.forEach(el => { el.placeholder = getDefaultPlaceholder(); });
            return;
        }

        inputs.forEach(el => { el.placeholder = quoteCache; });
    }

    function refresh() {
        applyQuote();
    }

    function toggleDailyQuote() {
        const currentlyEnabled = isDailyQuoteEnabled();
        localStorage.setItem('dailyQuoteEnabled', currentlyEnabled ? 'false' : 'true');

        const btn = document.getElementById('dailyQuoteToggleBtn');
        if (btn) btn.classList.toggle('active', !currentlyEnabled);

        applyQuote();

        if (typeof showHint === 'function') {
            showHint(!currentlyEnabled ? '每日一言已开启' : '每日一言已关闭');
        }
    }

    const toggleBtn = document.getElementById('dailyQuoteToggleBtn');
    if (toggleBtn) {
        toggleBtn.classList.toggle('active', isDailyQuoteEnabled());
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', refresh);
    } else {
        refresh();
    }

    const originalSetLang = window.setLanguage;
    if (typeof originalSetLang === 'function') {
        window.setLanguage = function (lang) {
            const result = originalSetLang.apply(this, arguments);
            refresh();
            return result;
        };
    }

    window.refreshDailyQuote = refresh;
    window.toggleDailyQuote = toggleDailyQuote;
})();

/* ================================================================
   超级极简模式（无 Dock、无启动台）
   ================================================================ */
(function initMinimalMode() {
    'use strict';

    const MM = { enabled: false };

    // 时钟
    function updateMinimalClock() {
        const el = document.getElementById('minimalClock');
        if (!el) return;
        if (currentTitleStyle !== 'time') {
            el.style.display = 'none';
            return;
        }
        el.style.display = 'block';
        const now = new Date();
        let h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        let str;
        if (currentTimeFormat === '12') {
            const h12 = h % 12 || 12;
            str = `${String(h12).padStart(2,'0')}:${m} ${h>=12?'PM':'AM'}`;
        } else {
            str = `${String(h).padStart(2,'0')}:${m}`;
        }
        el.textContent = str;
    }
    setInterval(updateMinimalClock, 1000);

    function syncMinimalEngineUI() {
        const cfg = engineConfig[currentEngine];
        if (!cfg) return;
        const name = currentLang === 'zh' ? cfg.name_zh : cfg.name_en;
        const iconEl = document.getElementById('minimalEngineIcon');
        const nameEl = document.getElementById('minimalEngineName');
        if (iconEl) iconEl.className = cfg.icon;
        if (nameEl) nameEl.textContent = name;

        document.querySelectorAll('#minimalEngineDropdown .minimal-engine-option').forEach(opt => {
            if (opt.dataset.value === currentEngine) opt.classList.add('selected');
            else opt.classList.remove('selected');
        });
    }

    // 极简搜索 - 支持地址栏指令
    function performMinimalSearch() {
        const input = document.getElementById('minimalSearchInput');
        if (!input) return;
        const q = input.value.trim();
        if (!q) {
            input.style.animation = 'shake 0.3s';
            setTimeout(() => input.style.animation = '', 300);
            input.focus();
            return;
        }

        // 指令模式
        if (q.startsWith('/')) {
            if (typeof window.parseQuickCommand === 'function') {
                const ok = window.parseQuickCommand(q);
                if (!ok && typeof showHint === 'function') {
                    showHint('未知指令: ' + q, true);
                }
            }
            input.value = '';
            input.focus();
            return;
        }

        // 正常搜索
        const mainInput = document.getElementById('search-input');
        if (mainInput) mainInput.value = q;
        if (typeof window.performSearch === 'function') {
            window.performSearch();
        } else {
            if (currentEngine === 'site') {
                const results = performSiteSearch(q.toLowerCase());
                if (results && results.length > 0) showSiteSearchResults(results);
            } else {
                window.open(engineConfig[currentEngine].url + encodeURIComponent(q), '_blank');
            }
        }
        input.value = '';
        input.focus();
    }

    function applyMinimalMode(enabled) {
        MM.enabled = enabled;
        if (enabled) {
            document.body.classList.add('minimal-active');
            const toggle = document.getElementById('minimalModeToggle');
            if (toggle) toggle.classList.add('active');
            updateMinimalClock();
            syncMinimalEngineUI();
            if (typeof window.refreshDailyQuote === 'function') {
                window.refreshDailyQuote();
            }
        } else {
            document.body.classList.remove('minimal-active');
            const toggle = document.getElementById('minimalModeToggle');
            if (toggle) toggle.classList.remove('active');
            const blur = document.getElementById('minimalBlur');
            if (blur) blur.classList.remove('active');
            if (typeof window.refreshDailyQuote === 'function') {
                window.refreshDailyQuote();
            }
        }
    }

    function toggleMinimalMode() {
        const next = !MM.enabled;
        localStorage.setItem('minimalModeEnabled', next ? 'true' : 'false');
        applyMinimalMode(next);
        if (typeof showHint === 'function') {
            showHint(next ? '超级极简模式已开启' : '超级极简模式已关闭');
        }
    }

    function bindEvents() {
        const savedEnabled = localStorage.getItem('minimalModeEnabled') === 'true';
        applyMinimalMode(savedEnabled);

        const input = document.getElementById('minimalSearchInput');
        const blur = document.getElementById('minimalBlur');

        if (input) {
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter') { e.preventDefault(); performMinimalSearch(); }
                if (e.key === 'Escape') input.blur();
            });
            input.addEventListener('focus', () => {
                if (blur) blur.classList.add('active');
            });
            input.addEventListener('blur', () => {
                if (blur) blur.classList.remove('active');
            });
        }

        const searchBtn = document.getElementById('minimalSearchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => performMinimalSearch());
        }

        // 引擎下拉
        const engineTrigger = document.getElementById('minimalEngineTrigger');
        const engineDropdown = document.getElementById('minimalEngineDropdown');
        if (engineTrigger && engineDropdown) {
            engineTrigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const open = engineDropdown.classList.toggle('show');
                engineTrigger.classList.toggle('open', open);
            });

            engineDropdown.addEventListener('click', (e) => {
                const opt = e.target.closest('.minimal-engine-option');
                if (!opt) return;
                const val = opt.dataset.value;
                if (engineConfig[val]) {
                    currentEngine = val;
                    localStorage.setItem('currentEngine', val);
                    if (typeof updateEngineUI === 'function') updateEngineUI();
                    syncMinimalEngineUI();
                }
                engineDropdown.classList.remove('show');
                engineTrigger.classList.remove('open');
            });

            document.addEventListener('click', (e) => {
                if (!engineTrigger.contains(e.target) && !engineDropdown.contains(e.target)) {
                    engineDropdown.classList.remove('show');
                    engineTrigger.classList.remove('open');
                }
            });
        }

        // 右上角设置
        const settingsBtn = document.getElementById('minimalSettingsBtn');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                if (typeof toggleSettings === 'function') toggleSettings();
            });
        }

        // 语言/标题/暗黑 切换后同步
        const origSetLang = window.setLanguage;
        if (typeof origSetLang === 'function') {
            window.setLanguage = function(lang) {
                const r = origSetLang.apply(this, arguments);
                syncMinimalEngineUI();
                updateMinimalClock();
                return r;
            };
        }

        const origSetTitle = window.setTitleStyle;
        if (typeof origSetTitle === 'function') {
            window.setTitleStyle = function(style) {
                const r = origSetTitle.apply(this, arguments);
                updateMinimalClock();
                return r;
            };
        }

        const origToggleDark = window.toggleDarkMode;
        if (typeof origToggleDark === 'function') {
            window.toggleDarkMode = function() {
                const r = origToggleDark.apply(this, arguments);
                updateMinimalClock();
                return r;
            };
        }
    }

    window.toggleMinimalMode = toggleMinimalMode;
    window.updateMinimalClock = updateMinimalClock;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
        bindEvents();
    }
})();

/* ================================================================
   极简模式 Dock 栏 + 启动台
   ================================================================ */
(function initDock() {
    'use strict';

    const DOCK_KEY = 'dockPinned';
    const DOCK_ENABLED_KEY = 'dockEnabled';

    // 收集页面上所有收录网站
    function collectSites() {
        const sites = [];
        const catIcons = {};
        document.querySelectorAll('.category').forEach(cat => {
            const catId = cat.id;
            const catTitleEl = cat.querySelector('h3');
            const catName = catTitleEl ? catTitleEl.textContent.trim() : catId;
            const catIconEl = catTitleEl ? catTitleEl.querySelector('i') : null;
            catIcons[catName] = catIconEl ? catIconEl.className : '';
            cat.querySelectorAll('ul li a').forEach(a => {
                const href = a.getAttribute('href');
                if (!href || href.startsWith('javascript:')) return;
                const iconEl = a.querySelector('i');
                const iconClass = iconEl ? iconEl.className : '';
                const name = a.textContent.trim().replace(/\s+/g, ' ');
                sites.push({ url: href, name, icon: iconClass, category: catName, catId: catId });
            });
        });
        return { sites, catIcons };
    }

    function getPinned() {
        try {
            return JSON.parse(localStorage.getItem(DOCK_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function savePinned(arr) {
        localStorage.setItem(DOCK_KEY, JSON.stringify(arr));
    }

    function isDockEnabled() {
        return localStorage.getItem(DOCK_ENABLED_KEY) !== 'false';
    }

    function renderDock() {
        const dock = document.getElementById('minimalDock');
        const container = document.getElementById('dockItems');
        if (!dock || !container) return;

        if (!isDockEnabled()) {
            dock.classList.add('dock-hidden');
            return;
        }
        dock.classList.remove('dock-hidden');

        const { sites } = collectSites();
        const pinned = getPinned();
        container.innerHTML = '';

        pinned.forEach(url => {
            const site = sites.find(s => s.url === url);
            if (!site) return;
            const item = createDockItem(site);
            container.appendChild(item);
        });
    }

    function createDockItem(site) {
        const item = document.createElement('div');
        item.className = 'dock-item';
        item.draggable = true;
        item.dataset.url = site.url;
        item.dataset.name = site.name;

        const icon = document.createElement('div');
        icon.className = 'dock-icon';
        if (site.icon) {
            const i = document.createElement('i');
            i.className = site.icon;
            icon.appendChild(i);
        } else {
            const img = document.createElement('img');
            try {
                const domain = new URL(site.url).hostname;
                img.src = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64';
                img.alt = site.name;
            } catch (e) {}
            icon.appendChild(img);
        }

        const tooltip = document.createElement('span');
        tooltip.className = 'dock-tooltip';
        tooltip.textContent = site.name;

        item.appendChild(icon);
        item.appendChild(tooltip);

        // 点击打开网站
        item.addEventListener('click', (e) => {
            if (e.defaultPrevented) return;
            window.open(site.url, '_blank');
        });

        // 右键菜单
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, 'dock', site);
        });

        // 长按（移动端）
        let longPressTimer;
        item.addEventListener('touchstart', () => {
            longPressTimer = setTimeout(() => {
                const rect = item.getBoundingClientRect();
                showContextMenu(rect.left + rect.width / 2, rect.top, 'dock', site);
            }, 500);
        });
        item.addEventListener('touchend', () => clearTimeout(longPressTimer));
        item.addEventListener('touchmove', () => clearTimeout(longPressTimer));

        // 拖拽排序
        item.addEventListener('dragstart', (e) => {
            item.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', site.url);
        });
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
            document.querySelectorAll('.dock-item').forEach(i => i.classList.remove('drag-over'));
        });
        item.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            item.classList.add('drag-over');
        });
        item.addEventListener('dragleave', () => {
            item.classList.remove('drag-over');
        });
        item.addEventListener('drop', (e) => {
            e.preventDefault();
            item.classList.remove('drag-over');
            const draggedUrl = e.dataTransfer.getData('text/plain');
            if (!draggedUrl || draggedUrl === site.url) return;
            reorderDock(draggedUrl, site.url);
        });

        return item;
    }

    function reorderDock(draggedUrl, targetUrl) {
        const pinned = getPinned();
        const fromIdx = pinned.indexOf(draggedUrl);
        const toIdx = pinned.indexOf(targetUrl);
        if (fromIdx === -1 || toIdx === -1) return;
        pinned.splice(fromIdx, 1);
        pinned.splice(toIdx, 0, draggedUrl);
        savePinned(pinned);
        renderDock();
    }

    function pinToDock(site) {
        const pinned = getPinned();
        if (!pinned.includes(site.url)) {
            pinned.push(site.url);
            savePinned(pinned);
            renderDock();
        }
        hideContextMenu();
    }

    function removeFromDock(site) {
        let pinned = getPinned();
        pinned = pinned.filter(u => u !== site.url);
        savePinned(pinned);
        renderDock();
        hideContextMenu();
    }

    // 右键菜单
    let contextMenuTarget = null;
    let contextMenuSource = null;

    function showContextMenu(x, y, source, site) {
        const menu = document.getElementById('dockContextMenu');
        if (!menu) return;
        contextMenuTarget = site;
        contextMenuSource = source;

        const pinItem = menu.querySelector('[data-action="pin-to-dock"]');
        const pinWidgetItem = menu.querySelector('[data-action="pin-to-widget"]');
        const removeItem = menu.querySelector('[data-action="remove-from-dock"]');

        if (source === 'launchpad') {
            const pinned = getPinned();
            if (pinned.includes(site.url)) {
                pinItem.classList.add('hidden');
            } else {
                pinItem.classList.remove('hidden');
            }
            pinWidgetItem.classList.remove('hidden');
            removeItem.classList.add('hidden');
        } else {
            pinItem.classList.add('hidden');
            pinWidgetItem.classList.add('hidden');
            removeItem.classList.remove('hidden');
        }

        menu.style.left = Math.min(x, window.innerWidth - 200) + 'px';
        menu.style.top = Math.min(y, window.innerHeight - 120) + 'px';
        menu.classList.add('show');
    }

    function hideContextMenu() {
        const menu = document.getElementById('dockContextMenu');
        if (menu) menu.classList.remove('show');
        contextMenuTarget = null;
        contextMenuSource = null;
    }

    // 启动台
    function openLaunchpad() {
        const overlay = document.getElementById('launchpadOverlay');
        const grid = document.getElementById('launchpadGrid');
        if (!overlay || !grid) return;

        const { sites, catIcons } = collectSites();
        const pinned = getPinned();

        // 按分类分组
        const categories = {};
        sites.forEach(s => {
            if (!categories[s.category]) categories[s.category] = [];
            categories[s.category].push(s);
        });

        grid.innerHTML = '';
        Object.keys(categories).forEach(catName => {
            const catDiv = document.createElement('div');
            catDiv.className = 'launchpad-category';

            const title = document.createElement('h3');
            title.className = 'launchpad-cat-title';
            const iconClass = catIcons[catName];
            if (iconClass) {
                const icon = document.createElement('i');
                icon.className = iconClass;
                title.appendChild(icon);
            }
            title.appendChild(document.createTextNode(' ' + catName));
            catDiv.appendChild(title);

            const inner = document.createElement('div');
            inner.className = 'launchpad-grid-inner';

            categories[catName].forEach(site => {
                const siteEl = document.createElement('div');
                siteEl.className = 'launchpad-site';
                siteEl.dataset.url = site.url;

                const icon = document.createElement('i');
                icon.className = 'launchpad-site-icon ' + (site.icon || 'fas fa-globe');
                if (!site.icon) {
                    const img = document.createElement('img');
                    try {
                        const domain = new URL(site.url).hostname;
                        img.src = 'https://www.google.com/s2/favicons?domain=' + domain + '&sz=64';
                    } catch (e) {}
                    icon.appendChild(img);
                    icon.className = 'launchpad-site-icon';
                }

                const name = document.createElement('span');
                name.className = 'launchpad-site-name';
                name.textContent = site.name;

                siteEl.appendChild(icon);
                siteEl.appendChild(name);

                siteEl.addEventListener('click', () => {
                    window.open(site.url, '_blank');
                    closeLaunchpad();
                });

                siteEl.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    showContextMenu(e.clientX, e.clientY, 'launchpad', site);
                });

                // 长按
                let lpTimer;
                siteEl.addEventListener('touchstart', () => {
                    lpTimer = setTimeout(() => {
                        const rect = siteEl.getBoundingClientRect();
                        showContextMenu(rect.left + rect.width / 2, rect.top, 'launchpad', site);
                    }, 500);
                });
                siteEl.addEventListener('touchend', () => clearTimeout(lpTimer));
                siteEl.addEventListener('touchmove', () => clearTimeout(lpTimer));

                inner.appendChild(siteEl);
            });

            catDiv.appendChild(inner);
            grid.appendChild(catDiv);
        });

        overlay.classList.add('active');
    }

    function closeLaunchpad() {
        const overlay = document.getElementById('launchpadOverlay');
        if (overlay) overlay.classList.remove('active');
        hideContextMenu();
    }

    // Dock 开关
    function toggleDockEnabled() {
        const next = !isDockEnabled();
        localStorage.setItem(DOCK_ENABLED_KEY, next ? 'true' : 'false');
        const btn = document.getElementById('dockEnabledToggleBtn');
        if (btn) btn.classList.toggle('active', next);
        renderDock();
        if (typeof showHint === 'function') {
            showHint(next ? 'Dock 栏已开启' : 'Dock 栏已关闭');
        }
    }

    // 极简模式下禁用不相关设置
    function updateMinimalSettingsState(enabled) {
        document.querySelectorAll('.setting-card.minimal-sensitive').forEach(card => {
            if (enabled) {
                card.classList.add('minimal-disabled');
            } else {
                card.classList.remove('minimal-disabled');
            }
        });
        // 便签、最近访问选项卡在极简模式下也禁用
        document.querySelectorAll('.settings-nav-item').forEach(item => {
            const tab = item.dataset.tab;
            if (tab === 'notes' || tab === 'recent') {
                if (enabled) {
                    item.style.opacity = '.4';
                    item.style.pointerEvents = 'none';
                } else {
                    item.style.opacity = '';
                    item.style.pointerEvents = '';
                }
            }
        });
    }

    function bindEvents() {
        // 启动台按钮
        const launchpadBtn = document.getElementById('dockLaunchpad');
        if (launchpadBtn) {
            launchpadBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const overlay = document.getElementById('launchpadOverlay');
                if (overlay && overlay.classList.contains('active')) {
                    closeLaunchpad();
                } else {
                    openLaunchpad();
                }
            });
        }

        // 启动台关闭
        const closeBtn = document.getElementById('launchpadClose');
        if (closeBtn) closeBtn.addEventListener('click', closeLaunchpad);

        const overlay = document.getElementById('launchpadOverlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeLaunchpad();
            });
        }

        // 右键菜单点击
        const menu = document.getElementById('dockContextMenu');
        if (menu) {
            menu.addEventListener('click', (e) => {
                const actionEl = e.target.closest('.context-menu-item');
                if (!actionEl || !contextMenuTarget) return;
                const action = actionEl.dataset.action;
                if (action === 'pin-to-dock') pinToDock(contextMenuTarget);
                else if (action === 'pin-to-widget') pinSiteToWidget(contextMenuTarget);
                else if (action === 'remove-from-dock') removeFromDock(contextMenuTarget);
            });
        }

        // 点击其他地方关闭右键菜单
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dock-context-menu')) hideContextMenu();
        });

        // ESC 关闭启动台
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLaunchpad();
                hideContextMenu();
            }
        });

        // Dock 开关按钮
        const dockToggle = document.getElementById('dockEnabledToggleBtn');
        if (dockToggle) {
            dockToggle.classList.toggle('active', isDockEnabled());
            dockToggle.addEventListener('click', toggleDockEnabled);
        }

        // 初始渲染
        renderDock();

        // 监听极简模式切换
        const origToggleMinimal = window.toggleMinimalMode;
        if (typeof origToggleMinimal === 'function') {
            window.toggleMinimalMode = function() {
                const r = origToggleMinimal.apply(this, arguments);
                const isMinimal = document.body.classList.contains('minimal-active');
                updateMinimalSettingsState(isMinimal);
                return r;
            };
        }

        // 初始化时检查极简模式状态
        setTimeout(() => {
            const isMinimal = document.body.classList.contains('minimal-active');
            updateMinimalSettingsState(isMinimal);
        }, 100);
    }

    window.toggleDockEnabled = toggleDockEnabled;
    window.renderDock = renderDock;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
        bindEvents();
    }
})();

/* ================================================================
   设置导入与导出
   ================================================================ */
(function initImportExport() {
    'use strict';

    // 需要导出的 localStorage 键列表
    const EXPORT_KEYS = [
        'currentLang',
        'currentEngine',
        'titleStyle',
        'timeFormat',
        'sidebarPos',
        'layout',
        'selectedTheme',
        'darkMode',
        'highContrast',
        'oldStyle',
        'autoHideBottomBarEnabled',
        'searchRadius',
        'btnRadius',
        'sidebarOpacity',
        'sidebarHide',
        'bgImg',
        'bgImgType',
        'recentLinks',
        'recentEnabled',
        'notesEnabled',
        'stickyNotes',
        'searchHistoryEnabled',
        'searchHistory',
        'searchHistoryMatchThreshold',
        'dailyQuoteEnabled',
        'minimalModeEnabled',
        'dockEnabled',
        'dockPinned',
        'fanlinkWidgets',
        'fanlinkCustomWidgets',
        'devShortcutEnabled'
    ];

    function exportSettings() {
        const data = {
            _meta: {
                app: 'Fanlink 标签页',
                version: '3.05',
                exportedAt: new Date().toISOString()
            },
            settings: {}
        };

        EXPORT_KEYS.forEach(key => {
            const val = localStorage.getItem(key);
            if (val !== null) {
                data.settings[key] = val;
            }
        });

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        const dateStr = new Date().toISOString().slice(0, 10);
        a.href = url;
        a.download = 'fanlink-settings-' + dateStr + '.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (typeof showHint === 'function') {
            showHint('设置已导出为 JSON 文件');
        }
    }

    function importSettings(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (!data.settings || typeof data.settings !== 'object') {
                    alert('文件格式不正确：缺少 settings 字段');
                    return;
                }

                // 确认覆盖
                const confirmed = confirm('导入将覆盖当前所有设置，包括主题、布局、便签、搜索历史等，此操作不可撤销。\n\n确定要继续吗？');
                if (!confirmed) return;

                // 清除现有设置
                EXPORT_KEYS.forEach(key => localStorage.removeItem(key));

                // 写入新设置
                Object.keys(data.settings).forEach(key => {
                    localStorage.setItem(key, data.settings[key]);
                });

                if (typeof showHint === 'function') {
                    showHint('设置导入成功，页面即将刷新');
                }

                setTimeout(() => {
                    window.location.reload();
                }, 1200);

            } catch (err) {
                alert('导入失败：文件不是有效的 JSON 格式');
            }
        };
        reader.readAsText(file);
    }

    function bindEvents() {
        const exportBtn = document.getElementById('exportSettingsBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', exportSettings);
        }

        const importBtn = document.getElementById('importSettingsBtn');
        const fileInput = document.getElementById('importSettingsFile');
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', () => fileInput.click());
            fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) importSettings(file);
                fileInput.value = '';
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
        bindEvents();
    }
})();

/* ================================================================
   小组件系统（Widget System）
   ================================================================ */
(function initWidgetSystem() {
    'use strict';

    const WIDGET_KEY = 'fanlinkWidgets';
    const GRID_COLS = 12;
    const GRID_ROWS = 8;
    const CELL_W = 80;
    const CELL_H = 80;

    const WIDGET_DEFS = {
        clock: {
            name: '时钟',
            desc: '显示当前时间和日期',
            icon: 'far fa-clock',
            defaultW: 3,
            defaultH: 2,
            preview: '<div class="market-preview-clock">12:00</div>'
        },
        search: {
            name: '搜索栏',
            desc: '快速搜索或输入网址',
            icon: 'fas fa-search',
            defaultW: 5,
            defaultH: 1,
            preview: '<div class="market-preview-search"><div class="pv-input"></div><div class="pv-btn"></div></div>'
        },
        site: {
            name: '网站快捷方式',
            desc: '启动台固定的网站图标',
            icon: 'fas fa-globe',
            defaultW: 1,
            defaultH: 1,
            hidden: true,
            preview: '<div class="market-preview-site"><i class="fas fa-globe"></i></div>'
        }
    };

    let widgets = [];
    let editMode = false;
    let draggingWidget = null;
    let dragOffset = { x: 0, y: 0 };
    let placeholderEl = null;
    let contextWidgetId = null;

    function loadWidgets() {
        try {
            const saved = JSON.parse(localStorage.getItem(WIDGET_KEY));
            if (Array.isArray(saved) && saved.length > 0) {
                widgets = saved;
            } else {
                widgets = [
                    { id: genId(), type: 'clock', x: 5, y: 2, w: 3, h: 2 },
                    { id: genId(), type: 'search', x: 4, y: 5, w: 5, h: 1 }
                ];
                saveWidgets();
            }
        } catch (e) {
            widgets = [
                { id: genId(), type: 'clock', x: 5, y: 2, w: 3, h: 2 },
                { id: genId(), type: 'search', x: 4, y: 5, w: 5, h: 1 }
            ];
        }
    }

    function saveWidgets() {
        localStorage.setItem(WIDGET_KEY, JSON.stringify(widgets));
    }

    function genId() {
        return 'w_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    }

    function widgetToPixel(w) {
        return {
            left: w.x * CELL_W + 4,
            top: w.y * CELL_H + 4,
            width: w.w * CELL_W - 8,
            height: w.h * CELL_H - 8
        };
    }

    function pixelToGrid(px, py) {
        return {
            x: Math.max(0, Math.round(px / CELL_W)),
            y: Math.max(0, Math.round(py / CELL_H))
        };
    }

    function renderWidgets() {
        const container = document.getElementById('widgetContainer');
        if (!container) return;
        container.innerHTML = '';

        widgets.forEach(w => {
            const def = WIDGET_DEFS[w.type];
            if (!def && w.type !== 'custom') return;

            const el = document.createElement('div');
            el.className = 'widget widget-' + w.type;
            el.dataset.id = w.id;
            el.dataset.type = w.type;

            const pos = widgetToPixel(w);
            el.style.left = pos.left + 'px';
            el.style.top = pos.top + 'px';
            el.style.width = pos.width + 'px';
            el.style.height = pos.height + 'px';

            if (editMode) el.classList.add('editing');

            if (w.type === 'clock') {
                const timeEl = document.createElement('div');
                timeEl.className = 'widget-clock-time';
                timeEl.textContent = '--:--:--';
                const dateEl = document.createElement('div');
                dateEl.className = 'widget-clock-date';
                el.appendChild(timeEl);
                el.appendChild(dateEl);
                updateClockWidget(el);
            } else if (w.type === 'search') {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'widget-search-input';
                input.placeholder = '搜索或输入网址...';

                // 引擎切换按钮
                const engineBtn = document.createElement('button');
                engineBtn.className = 'widget-engine-btn';
                engineBtn.type = 'button';
                const engineIcon = document.createElement('i');
                const engineName = document.createElement('span');
                const engineArrow = document.createElement('i');
                engineArrow.className = 'engine-arrow fas fa-chevron-down';
                engineBtn.appendChild(engineIcon);
                engineBtn.appendChild(engineName);
                engineBtn.appendChild(engineArrow);

                const engineDropdown = document.createElement('div');
                engineDropdown.className = 'widget-engine-dropdown';
                const engines = [
                    { value: 'bing', icon: 'fab fa-microsoft', name: '必应' },
                    { value: 'baidu', icon: 'fas fa-paw', name: '百度' },
                    { value: 'google', icon: 'fab fa-google', name: 'Google' },
                    { value: 'sogou', icon: 'fas fa-search', name: '搜狗' },
                    { value: 'site', icon: 'fas fa-folder-open', name: '站内搜索' }
                ];
                engines.forEach(eng => {
                    const opt = document.createElement('div');
                    opt.className = 'engine-option';
                    opt.dataset.value = eng.value;
                    opt.innerHTML = `<i class="${eng.icon}"></i><span>${eng.name}</span>`;
                    opt.addEventListener('click', (e) => {
                        e.stopPropagation();
                        currentEngine = eng.value;
                        localStorage.setItem('currentEngine', eng.value);
                        if (typeof updateEngineUI === 'function') updateEngineUI();
                        updateWidgetEngineUI(engineIcon, engineName, engineDropdown);
                        engineDropdown.classList.remove('show');
                    });
                    engineDropdown.appendChild(opt);
                });
                engineBtn.appendChild(engineDropdown);
                updateWidgetEngineUI(engineIcon, engineName, engineDropdown);

                engineBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    engineDropdown.classList.toggle('show');
                });

                const btn = document.createElement('button');
                btn.className = 'widget-search-btn';
                btn.textContent = '搜索';
                btn.addEventListener('click', () => performWidgetSearch(input));
                input.addEventListener('keydown', e => {
                    if (e.key === 'Enter') performWidgetSearch(input);
                });

                document.addEventListener('click', (e) => {
                    if (!engineBtn.contains(e.target)) engineDropdown.classList.remove('show');
                });

                el.appendChild(input);
                el.appendChild(engineBtn);
                el.appendChild(btn);
            } else if (w.type === 'site') {
                const siteData = w.siteData || { name: '网站', url: '', icon: '' };
                el.classList.add('widget-site-clickable');
                const siteWrap = document.createElement('div');
                siteWrap.className = 'widget-site-wrap';
                const siteIcon = document.createElement('div');
                siteIcon.className = 'widget-site-icon';
                if (siteData.icon) {
                    siteIcon.innerHTML = `<img src="${siteData.icon}" alt="" onerror="this.style.display='none';this.parentNode.innerHTML='<i class=\\'fas fa-globe\\'></i>'">`;
                } else {
                    siteIcon.innerHTML = '<i class="fas fa-globe"></i>';
                }
                const siteName = document.createElement('div');
                siteName.className = 'widget-site-name';
                siteName.textContent = siteData.name || '网站';
                siteWrap.appendChild(siteIcon);
                siteWrap.appendChild(siteName);
                el.appendChild(siteWrap);
                if (!editMode) {
                    el.style.cursor = 'pointer';
                    el.addEventListener('click', () => {
                        if (siteData.url) window.open(siteData.url, '_blank');
                    });
                }
            } else if (w.type === 'custom') {
                renderCustomWidget(el, w);
            }

            el.addEventListener('contextmenu', e => {
                if (!editMode) return;
                e.preventDefault();
                e.stopPropagation();
                contextWidgetId = w.id;
                showWidgetContextMenu(e.clientX, e.clientY);
            });

            if (editMode) {
                el.addEventListener('mousedown', startDrag);
                el.addEventListener('touchstart', startDragTouch, { passive: false });
            }

            container.appendChild(el);
        });

        startClockTicker();

        // 小组件渲染完成后刷新每日一言（搜索小组件 placeholder）
        if (typeof window.refreshDailyQuote === 'function') {
            window.refreshDailyQuote();
        }
    }

    function performWidgetSearch(input) {
        const q = input.value.trim();
        if (!q) return;
        if (q.startsWith('/')) {
            if (typeof window.parseQuickCommand === 'function') window.parseQuickCommand(q);
            input.value = '';
            return;
        }
        const mainInput = document.getElementById('search-input');
        if (mainInput) mainInput.value = q;
        if (typeof window.performSearch === 'function') {
            window.performSearch();
        } else {
            if (currentEngine === 'site') {
                const results = performSiteSearch(q.toLowerCase());
                if (results && results.length > 0 && typeof showSiteSearchResults === 'function') {
                    showSiteSearchResults(results);
                }
            } else {
                window.open(engineConfig[currentEngine].url + encodeURIComponent(q), '_blank');
            }
        }
        input.value = '';
    }

    function updateWidgetEngineUI(iconEl, nameEl, dropdown) {
        const engines = {
            bing: { icon: 'fab fa-microsoft', name: '必应' },
            baidu: { icon: 'fas fa-paw', name: '百度' },
            google: { icon: 'fab fa-google', name: 'Google' },
            sogou: { icon: 'fas fa-search', name: '搜狗' },
            site: { icon: 'fas fa-folder-open', name: '站内搜索' }
        };
        const eng = engines[currentEngine] || engines.bing;
        if (iconEl) iconEl.className = eng.icon;
        if (nameEl) nameEl.textContent = eng.name;
        if (dropdown) {
            dropdown.querySelectorAll('.engine-option').forEach(opt => {
                opt.classList.toggle('selected', opt.dataset.value === currentEngine);
            });
        }
    }

    let clockTickerStarted = false;
    function startClockTicker() {
        if (clockTickerStarted) return;
        clockTickerStarted = true;
        setInterval(() => {
            document.querySelectorAll('.widget-clock').forEach(updateClockWidget);
        }, 1000);
    }

    function updateClockWidget(el) {
        const timeEl = el.querySelector('.widget-clock-time');
        const dateEl = el.querySelector('.widget-clock-date');
        if (!timeEl) return;
        const now = new Date();
        let h = now.getHours();
        const m = String(now.getMinutes()).padStart(2, '0');
        const s = String(now.getSeconds()).padStart(2, '0');
        const fmt = localStorage.getItem('timeFormat') || '24';
        let timeStr;
        if (fmt === '12') {
            const h12 = h % 12 || 12;
            timeStr = `${String(h12).padStart(2,'0')}:${m}:${s} ${h>=12?'PM':'AM'}`;
        } else {
            timeStr = `${String(h).padStart(2,'0')}:${m}:${s}`;
        }
        timeEl.textContent = timeStr;
        if (dateEl) {
            const days = ['周日','周一','周二','周三','周四','周五','周六'];
            dateEl.textContent = `${now.getFullYear()}年${now.getMonth()+1}月${now.getDate()}日 ${days[now.getDay()]}`;
        }
    }

    function startDrag(e) {
        if (!editMode) return;
        const el = e.currentTarget;
        draggingWidget = widgets.find(w => w.id === el.dataset.id);
        if (!draggingWidget) return;

        const rect = el.getBoundingClientRect();
        const containerRect = document.getElementById('widgetContainer').getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;

        el.classList.add('dragging');
        placeholderEl = document.createElement('div');
        placeholderEl.className = 'widget-placeholder';
        const pos = widgetToPixel(draggingWidget);
        placeholderEl.style.left = pos.left + 'px';
        placeholderEl.style.top = pos.top + 'px';
        placeholderEl.style.width = pos.width + 'px';
        placeholderEl.style.height = pos.height + 'px';
        document.getElementById('widgetContainer').appendChild(placeholderEl);

        document.addEventListener('mousemove', onDrag);
        document.addEventListener('mouseup', endDrag);
        e.preventDefault();
    }

    function startDragTouch(e) {
        if (!editMode) return;
        e.preventDefault();
        const touch = e.touches[0];
        const el = e.currentTarget;
        draggingWidget = widgets.find(w => w.id === el.dataset.id);
        if (!draggingWidget) return;

        const rect = el.getBoundingClientRect();
        dragOffset.x = touch.clientX - rect.left;
        dragOffset.y = touch.clientY - rect.top;

        el.classList.add('dragging');
        placeholderEl = document.createElement('div');
        placeholderEl.className = 'widget-placeholder';
        const pos = widgetToPixel(draggingWidget);
        placeholderEl.style.left = pos.left + 'px';
        placeholderEl.style.top = pos.top + 'px';
        placeholderEl.style.width = pos.width + 'px';
        placeholderEl.style.height = pos.height + 'px';
        document.getElementById('widgetContainer').appendChild(placeholderEl);

        document.addEventListener('touchmove', onDragTouch, { passive: false });
        document.addEventListener('touchend', endDragTouch);
    }

    function checkOverlap(x, y, w, h, excludeId) {
        return widgets.some(widget => {
            if (widget.id === excludeId) return false;
            return x < widget.x + widget.w && x + w > widget.x &&
                   y < widget.y + widget.h && y + h > widget.y;
        });
    }

    function onDrag(e) {
        if (!draggingWidget || !placeholderEl) return;
        const containerRect = document.getElementById('widgetContainer').getBoundingClientRect();
        let px = e.clientX - containerRect.left - dragOffset.x;
        let py = e.clientY - containerRect.top - dragOffset.y;
        const grid = pixelToGrid(px, py);
        const maxX = GRID_COLS - draggingWidget.w;
        const maxY = GRID_ROWS - draggingWidget.h;
        grid.x = Math.min(Math.max(0, grid.x), maxX);
        grid.y = Math.min(Math.max(0, grid.y), maxY);

        const overlap = checkOverlap(grid.x, grid.y, draggingWidget.w, draggingWidget.h, draggingWidget.id);
        placeholderEl.classList.toggle('overlap', overlap);

        const pos = widgetToPixel({ ...draggingWidget, x: grid.x, y: grid.y });
        placeholderEl.style.left = pos.left + 'px';
        placeholderEl.style.top = pos.top + 'px';

        const draggingEl = document.querySelector('.widget.dragging');
        if (draggingEl) {
            draggingEl.style.left = (e.clientX - containerRect.left - dragOffset.x) + 'px';
            draggingEl.style.top = (e.clientY - containerRect.top - dragOffset.y) + 'px';
        }
    }

    function onDragTouch(e) {
        e.preventDefault();
        const touch = e.touches[0];
        onDrag({ clientX: touch.clientX, clientY: touch.clientY });
    }

    function endDrag() {
        if (!draggingWidget) return;
        const originalX = draggingWidget.x;
        const originalY = draggingWidget.y;
        const containerRect = document.getElementById('widgetContainer').getBoundingClientRect();
        const draggingEl = document.querySelector('.widget.dragging');
        let placed = false;
        if (draggingEl) {
            const rect = draggingEl.getBoundingClientRect();
            let px = rect.left - containerRect.left;
            let py = rect.top - containerRect.top;
            const grid = pixelToGrid(px, py);
            const maxX = GRID_COLS - draggingWidget.w;
            const maxY = GRID_ROWS - draggingWidget.h;
            grid.x = Math.min(Math.max(0, grid.x), maxX);
            grid.y = Math.min(Math.max(0, grid.y), maxY);
            if (!checkOverlap(grid.x, grid.y, draggingWidget.w, draggingWidget.h, draggingWidget.id)) {
                draggingWidget.x = grid.x;
                draggingWidget.y = grid.y;
                placed = true;
            }
        }
        cleanupDrag();
        if (!placed) {
            draggingWidget.x = originalX;
            draggingWidget.y = originalY;
            if (typeof showHint === 'function') showHint('位置重叠，已弹回原位', true);
        }
        saveWidgets();
        renderWidgets();
    }

    function endDragTouch() {
        endDrag();
        document.removeEventListener('touchmove', onDragTouch);
        document.removeEventListener('touchend', endDragTouch);
    }

    function cleanupDrag() {
        document.removeEventListener('mousemove', onDrag);
        document.removeEventListener('mouseup', endDrag);
        if (placeholderEl) { placeholderEl.remove(); placeholderEl = null; }
        draggingWidget = null;
    }

    function toggleEditMode() {
        editMode = !editMode;
        const btn = document.getElementById('widgetEditToggle');
        const grid = document.getElementById('widgetGridOverlay');
        if (btn) btn.classList.toggle('active', editMode);
        if (grid) grid.classList.toggle('active', editMode);
        renderWidgets();
        if (typeof showHint === 'function') {
            showHint(editMode ? '编辑模式已开启，拖拽小组件调整位置' : '编辑模式已关闭');
        }
    }

    function showWidgetContextMenu(x, y) {
        const menu = document.getElementById('widgetContextMenu');
        if (!menu) return;
        const w = widgets.find(item => item.id === contextWidgetId);
        const isSite = w && w.type === 'site';
        menu.querySelectorAll('[data-action^="resize-"]').forEach(item => {
            item.classList.toggle('hidden', !isSite);
            if (isSite) {
                const size = parseInt(item.dataset.size);
                item.classList.toggle('selected', w.w === size && w.h === size);
            }
        });
        menu.querySelector('.widget-context-divider').classList.toggle('hidden', !isSite);
        menu.style.left = Math.min(x, window.innerWidth - 180) + 'px';
        menu.style.top = Math.min(y, window.innerHeight - 160) + 'px';
        menu.classList.add('show');
    }

    function hideWidgetContextMenu() {
        const menu = document.getElementById('widgetContextMenu');
        if (menu) menu.classList.remove('show');
        contextWidgetId = null;
    }

    function deleteWidget(id) {
        widgets = widgets.filter(w => w.id !== id);
        saveWidgets();
        renderWidgets();
        hideWidgetContextMenu();
        if (typeof showHint === 'function') showHint('小组件已删除');
    }

    function pinSiteToWidget(site) {
        hideContextMenu();
        closeLaunchpad();
        const siteData = {
            name: site.name || site.title || '网站',
            url: site.url || '',
            icon: site.icon || site.favicon || ''
        };
        // 检查是否已存在
        const exists = widgets.some(w => w.type === 'site' && w.siteData && w.siteData.url === siteData.url);
        if (exists) {
            if (typeof showHint === 'function') showHint('该网站已固定为小组件', true);
            return;
        }
        // 找空位
        let placed = false;
        for (let y = 0; y < GRID_ROWS && !placed; y++) {
            for (let x = 0; x < GRID_COLS && !placed; x++) {
                if (!checkOverlap(x, y, 1, 1, null)) {
                    widgets.push({ id: genId(), type: 'site', x: x, y: y, w: 1, h: 1, siteData: siteData });
                    placed = true;
                }
            }
        }
        if (!placed) {
            if (typeof showHint === 'function') showHint('没有足够空间放置该小组件', true);
            return;
        }
        saveWidgets();
        renderWidgets();
        if (typeof showHint === 'function') showHint(`已将「${siteData.name}」固定为小组件`);
    }

    function resizeWidget(id, newW, newH) {
        const w = widgets.find(item => item.id === id);
        if (!w) return;
        newW = Math.min(Math.max(1, newW), 3);
        newH = Math.min(Math.max(1, newH), 3);
        // 检查边界
        if (w.x + newW > GRID_COLS || w.y + newH > GRID_ROWS) {
            if (typeof showHint === 'function') showHint('超出网格边界，无法调整大小', true);
            return;
        }
        // 检查重叠
        if (checkOverlap(w.x, w.y, newW, newH, id)) {
            if (typeof showHint === 'function') showHint('调整后会与其他小组件重叠', true);
            return;
        }
        w.w = newW;
        w.h = newH;
        saveWidgets();
        renderWidgets();
        hideWidgetContextMenu();
        if (typeof showHint === 'function') showHint(`大小已调整为 ${newW}×${newH}`);
    }

    function openMarket(tab) {
        const overlay = document.getElementById('widgetMarketOverlay');
        if (!overlay) return;
        tab = tab || 'market';
        switchMarketTab(tab);
        renderMarketItems();
        renderManagerList();
        overlay.classList.add('active');
    }

    function switchMarketTab(tab) {
        document.querySelectorAll('.widget-market-nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.marketTab === tab);
        });
        document.getElementById('marketTabContent')?.classList.toggle('active', tab === 'market');
        document.getElementById('managerTabContent')?.classList.toggle('active', tab === 'manager');
        document.getElementById('devTabContent')?.classList.toggle('active', tab === 'dev');
        if (tab === 'dev') renderCustomWidgetList();
        if (tab === 'manager') renderManagerList();
    }

    function renderMarketItems() {
        const grid = document.getElementById('widgetMarketGrid');
        if (!grid) return;
        grid.innerHTML = '';

        // 内置小组件
        Object.keys(WIDGET_DEFS).forEach(type => {
            const def = WIDGET_DEFS[type];
            if (def.hidden) return;
            const item = createMarketItem({
                icon: def.icon,
                name: def.name,
                desc: def.desc,
                preview: def.preview,
                onAdd: () => addWidget(type)
            });
            grid.appendChild(item);
        });

        // 自定义小组件
        if (customWidgets.length > 0) {
            const divider = document.createElement('div');
            divider.className = 'market-section-divider';
            divider.textContent = '自定义小组件';
            grid.appendChild(divider);

            customWidgets.forEach(cw => {
                const item = document.createElement('div');
                item.className = 'market-item';

                const preview = document.createElement('div');
                preview.className = 'market-item-preview';
                const pIframe = document.createElement('iframe');
                pIframe.style.cssText = 'width:100%;height:100%;border:none;background:transparent;pointer-events:none;';
                let pHtml = cw.html;
                if (!pHtml.startsWith('﻿')) pHtml = '﻿' + pHtml;
                pIframe.srcdoc = pHtml;
                preview.appendChild(pIframe);

                const name = document.createElement('div');
                name.className = 'market-item-name';
                name.innerHTML = `<i class="${cw.icon}"></i> ${cw.name}${cw.version ? ' v' + cw.version : ''}`;

                const desc = document.createElement('div');
                desc.className = 'market-item-desc';
                desc.textContent = cw.desc + (cw.author ? ' · ' + cw.author : '');

                const addBtn = document.createElement('button');
                addBtn.className = 'market-item-add';
                addBtn.textContent = '添加';
                addBtn.addEventListener('click', e => { e.stopPropagation(); addCustomWidgetToDesktop(cw.id); });

                item.appendChild(preview);
                item.appendChild(name);
                item.appendChild(desc);
                item.appendChild(addBtn);
                item.addEventListener('click', () => addCustomWidgetToDesktop(cw.id));
                grid.appendChild(item);
            });
        }
    }

    function createMarketItem(opts) {
        const item = document.createElement('div');
        item.className = 'market-item';

        const preview = document.createElement('div');
        preview.className = 'market-item-preview';
        preview.innerHTML = opts.preview;

        const name = document.createElement('div');
        name.className = 'market-item-name';
        name.innerHTML = `<i class="${opts.icon}"></i> ${opts.name}`;

        const desc = document.createElement('div');
        desc.className = 'market-item-desc';
        desc.textContent = opts.desc;

        const addBtn = document.createElement('button');
        addBtn.className = 'market-item-add';
        addBtn.textContent = '添加';
        addBtn.addEventListener('click', e => { e.stopPropagation(); opts.onAdd(); });

        item.appendChild(preview);
        item.appendChild(name);
        item.appendChild(desc);
        item.appendChild(addBtn);
        item.addEventListener('click', opts.onAdd);
        return item;
    }

    function renderManagerList() {
        const list = document.getElementById('widgetManagerList');
        if (!list) return;
        list.innerHTML = '';
        if (widgets.length === 0) {
            list.innerHTML = '<div class="manager-empty"><i class="fas fa-inbox"></i>暂无小组件，去市场添加吧</div>';
            return;
        }
        widgets.forEach(w => {
            const def = WIDGET_DEFS[w.type];
            if (!def && w.type !== 'custom') return;
            const item = document.createElement('div');
            item.className = 'manager-item';

            const icon = document.createElement('div');
            icon.className = 'manager-item-icon';
            if (w.type === 'site' && w.siteData && w.siteData.icon) {
                icon.innerHTML = `<img src="${w.siteData.icon}" style="width:60%;height:60%;object-fit:contain;" onerror="this.style.display='none';this.parentNode.innerHTML='<i class=\\'fas fa-globe\\'></i>'">`;
            } else if (w.type === 'custom') {
                const cw = customWidgets.find(c => c.id === w.customId);
                icon.innerHTML = `<i class="${cw ? cw.icon : 'fas fa-puzzle-piece'}"></i>`;
            } else {
                icon.innerHTML = `<i class="${def.icon}"></i>`;
            }

            const info = document.createElement('div');
            info.className = 'manager-item-info';
            const name = document.createElement('div');
            name.className = 'manager-item-name';
            if (w.type === 'site' && w.siteData) {
                name.textContent = w.siteData.name;
            } else if (w.type === 'custom') {
                const cw = customWidgets.find(c => c.id === w.customId);
                name.textContent = cw ? cw.name : '自定义小组件';
            } else {
                name.textContent = def.name;
            }
            const pos = document.createElement('div');
            pos.className = 'manager-item-pos';
            pos.textContent = `位置: 第${w.y + 1}行 第${w.x + 1}列 · ${w.w}×${w.h}格`;
            info.appendChild(name);
            info.appendChild(pos);

            const actions = document.createElement('div');
            actions.className = 'manager-item-actions';
            const delBtn = document.createElement('button');
            delBtn.className = 'manager-item-btn delete';
            delBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
            delBtn.title = '删除';
            delBtn.addEventListener('click', () => {
                deleteWidget(w.id);
                renderManagerList();
            });
            actions.appendChild(delBtn);

            item.appendChild(icon);
            item.appendChild(info);
            item.appendChild(actions);
            list.appendChild(item);
        });
    }

    function closeMarket() {
        const overlay = document.getElementById('widgetMarketOverlay');
        if (overlay) overlay.classList.remove('active');
    }

    function addWidget(type) {
        const def = WIDGET_DEFS[type];
        if (!def) return;
        let placed = false;
        for (let y = 0; y < GRID_ROWS && !placed; y++) {
            for (let x = 0; x < GRID_COLS - def.defaultW + 1 && !placed; x++) {
                if (!checkOverlap(x, y, def.defaultW, def.defaultH, null)) {
                    widgets.push({ id: genId(), type: type, x: x, y: y, w: def.defaultW, h: def.defaultH });
                    placed = true;
                }
            }
        }
        if (!placed) {
            if (typeof showHint === 'function') showHint('没有足够空间放置该小组件', true);
            return;
        }
        saveWidgets();
        renderWidgets();
        renderManagerList();
        if (typeof showHint === 'function') showHint(`已添加「${def.name}」小组件`);
    }

    function bindEvents() {
        loadWidgets();
        loadCustomWidgets();
        renderWidgets();
        renderCustomWidgetList();

        const editBtn = document.getElementById('widgetEditToggle');
        if (editBtn) editBtn.addEventListener('click', toggleEditMode);

        const marketClose = document.getElementById('widgetMarketClose');
        if (marketClose) marketClose.addEventListener('click', closeMarket);
        const marketOverlay = document.getElementById('widgetMarketOverlay');
        if (marketOverlay) {
            marketOverlay.addEventListener('click', e => {
                if (e.target === marketOverlay) closeMarket();
            });
        }

        // 双栏切换
        document.querySelectorAll('.widget-market-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const tab = item.dataset.marketTab;
                switchMarketTab(tab);
                if (tab === 'manager') renderManagerList();
            });
        });

        const ctxMenu = document.getElementById('widgetContextMenu');
        if (ctxMenu) {
            ctxMenu.addEventListener('click', e => {
                const item = e.target.closest('.widget-context-item');
                if (!item) return;
                const action = item.dataset.action;
                if (action === 'delete-widget' && contextWidgetId) {
                    deleteWidget(contextWidgetId);
                } else if (action && action.startsWith('resize-') && contextWidgetId) {
                    const size = parseInt(item.dataset.size);
                    resizeWidget(contextWidgetId, size, size);
                }
            });
        }

        const minimalMode = document.getElementById('minimalMode');
        if (minimalMode) {
            function isBlankArea(target) {
                return !target.closest('.widget') && !target.closest('.minimal-dock') &&
                       !target.closest('.widget-edit-toggle') && !target.closest('.minimal-settings-btn') &&
                       !target.closest('.launchpad-overlay') && !target.closest('.widget-market-overlay') &&
                       !target.closest('.widget-context-menu');
            }

            minimalMode.addEventListener('contextmenu', e => {
                if (!editMode) return;
                if (!isBlankArea(e.target)) return;
                e.preventDefault();
                openMarket();
            });

            // 触屏长按支持
            let longPressTimer = null;
            let longPressMoved = false;
            minimalMode.addEventListener('touchstart', e => {
                if (!editMode) return;
                if (!isBlankArea(e.target)) return;
                longPressMoved = false;
                const touch = e.touches[0];
                longPressTimer = setTimeout(() => {
                    if (!longPressMoved) {
                        openMarket();
                        if (navigator.vibrate) navigator.vibrate(50);
                    }
                }, 500);
            }, { passive: true });
            minimalMode.addEventListener('touchmove', () => {
                longPressMoved = true;
                if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
            }, { passive: true });
            minimalMode.addEventListener('touchend', () => {
                if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
            });
        }

        document.addEventListener('click', e => {
            if (!e.target.closest('.widget-context-menu')) hideWidgetContextMenu();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') {
                closeMarket();
                hideWidgetContextMenu();
                closeWidgetEditor();
                if (editMode) toggleEditMode();
            }
        });

        // 自定义小组件 - 开发 tab
        const createBtn = document.getElementById('createCustomWidgetBtn');
        if (createBtn) createBtn.addEventListener('click', () => openWidgetEditor(null));
        const importZipBtn = document.getElementById('importZipBtn');
        const zipInput = document.getElementById('zipFileInput');
        if (importZipBtn && zipInput) {
            importZipBtn.addEventListener('click', () => zipInput.click());
            zipInput.addEventListener('change', e => {
                if (e.target.files[0]) importCustomWidgetFromZip(e.target.files[0]);
                e.target.value = '';
            });
        }
        const importHtmlBtn = document.getElementById('importHtmlBtn');
        const htmlInput = document.getElementById('htmlFileInput');
        if (importHtmlBtn && htmlInput) {
            importHtmlBtn.addEventListener('click', () => htmlInput.click());
            htmlInput.addEventListener('change', e => {
                if (e.target.files[0]) importCustomWidgetFromHtml(e.target.files[0]);
                e.target.value = '';
            });
        }
        const dlTemplateBtn = document.getElementById('downloadTemplateBtn');
        if (dlTemplateBtn) dlTemplateBtn.addEventListener('click', downloadDevTemplate);

        // 编辑器
        const editorClose = document.getElementById('widgetEditorClose');
        if (editorClose) editorClose.addEventListener('click', closeWidgetEditor);
        const editorCancel = document.getElementById('widgetEditorCancel');
        if (editorCancel) editorCancel.addEventListener('click', closeWidgetEditor);
        const editorSave = document.getElementById('widgetEditorSave');
        if (editorSave) editorSave.addEventListener('click', saveWidgetEditor);
        const editorCode = document.getElementById('widgetEditorCode');
        if (editorCode) {
            let previewTimer;
            editorCode.addEventListener('input', () => {
                clearTimeout(previewTimer);
                previewTimer = setTimeout(updateEditorPreview, 300);
            });
        }
        const editorOverlay = document.getElementById('widgetEditorOverlay');
        if (editorOverlay) {
            editorOverlay.addEventListener('click', e => {
                if (e.target === editorOverlay) closeWidgetEditor();
            });
        }
    }

    window.toggleWidgetEditMode = toggleEditMode;
    window.openWidgetMarket = openMarket;

    // ========== 自定义小组件系统 ==========
    const CUSTOM_WIDGET_KEY = 'fanlinkCustomWidgets';
    let customWidgets = [];

    function loadCustomWidgets() {
        try {
            const saved = JSON.parse(localStorage.getItem(CUSTOM_WIDGET_KEY));
            customWidgets = Array.isArray(saved) ? saved : [];
        } catch (e) { customWidgets = []; }
    }

    function saveCustomWidgets() {
        localStorage.setItem(CUSTOM_WIDGET_KEY, JSON.stringify(customWidgets));
    }

    // 轻量 ZIP 解析（仅支持 STORE 不压缩方式）
    function parseZip(buffer) {
        const data = new Uint8Array(buffer);
        const view = new DataView(buffer);
        const files = {};
        let eocd = -1;
        for (let i = data.length - 22; i >= 0; i--) {
            if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
        }
        if (eocd === -1) throw new Error('不是有效的 ZIP 文件');
        const count = view.getUint16(eocd + 10, true);
        let offset = view.getUint32(eocd + 16, true);
        for (let i = 0; i < count; i++) {
            if (view.getUint32(offset, true) !== 0x02014b50) break;
            const method = view.getUint16(offset + 10, true);
            const uSize = view.getUint32(offset + 24, true);
            const nLen = view.getUint16(offset + 28, true);
            const eLen = view.getUint16(offset + 30, true);
            const cLen = view.getUint16(offset + 32, true);
            const lhOff = view.getUint32(offset + 42, true);
            const name = new TextDecoder().decode(data.slice(offset + 46, offset + 46 + nLen));
            const lhNLen = view.getUint16(lhOff + 26, true);
            const lhELen = view.getUint16(lhOff + 28, true);
            const dOff = lhOff + 30 + lhNLen + lhELen;
            if (method === 0) {
                files[name] = new TextDecoder().decode(data.slice(dOff, dOff + uSize));
            } else {
                throw new Error('ZIP 使用了压缩，请用"存储/不压缩"方式重新打包');
            }
            offset += 46 + nLen + eLen + cLen;
        }
        return files;
    }

    function importCustomWidgetFromZip(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const files = parseZip(e.target.result);
                let manifest = null;
                let html = '';
                // 找 manifest.json
                for (const name in files) {
                    if (name.toLowerCase().endsWith('manifest.json')) {
                        try { manifest = JSON.parse(files[name]); } catch(err) {}
                    }
                }
                // 找 widget.html 或 index.html 或第一个 html
                for (const name in files) {
                    if (name.toLowerCase() === 'widget.html' || name.toLowerCase() === 'index.html') {
                        html = files[name];
                        break;
                    }
                }
                if (!html) {
                    for (const name in files) {
                        if (name.toLowerCase().endsWith('.html')) { html = files[name]; break; }
                    }
                }
                if (!html) throw new Error('ZIP 中未找到 HTML 文件');
                const id = 'cw_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
                const widget = {
                    id: id,
                    name: (manifest && manifest.name) || '自定义小组件',
                    desc: (manifest && manifest.desc) || '自定义 HTML 小组件',
                    icon: (manifest && manifest.icon) || 'fas fa-puzzle-piece',
                    defaultW: (manifest && manifest.defaultW) || 2,
                    defaultH: (manifest && manifest.defaultH) || 2,
                    author: (manifest && manifest.author) || '',
                    version: (manifest && manifest.version) || '1.0',
                    html: html
                };
                customWidgets.push(widget);
                saveCustomWidgets();
                renderCustomWidgetList();
                if (typeof showHint === 'function') showHint(`已导入「${widget.name}」`);
            } catch (err) {
                if (typeof showHint === 'function') showHint('导入失败：' + err.message, true);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    function importCustomWidgetFromHtml(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const id = 'cw_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
            const widget = {
                id: id,
                name: file.name.replace(/\.(html?|htm)$/i, '') || '自定义小组件',
                desc: '自定义 HTML 小组件',
                icon: 'fas fa-puzzle-piece',
                defaultW: 2,
                defaultH: 2,
                author: '',
                version: '1.0',
                html: e.target.result
            };
            customWidgets.push(widget);
            saveCustomWidgets();
            renderCustomWidgetList();
            if (typeof showHint === 'function') showHint(`已导入「${widget.name}」`);
        };
        reader.readAsText(file);
    }

    function renderCustomWidgetList() {
        const list = document.getElementById('customWidgetList');
        if (!list) return;
        if (customWidgets.length === 0) {
            list.innerHTML = '<div class="custom-widget-empty"><i class="fas fa-inbox"></i><p>暂无自定义小组件，创建或导入一个吧</p></div>';
            return;
        }
        list.innerHTML = '';
        customWidgets.forEach(cw => {
            const item = document.createElement('div');
            item.className = 'custom-widget-item';
            item.innerHTML = `
                <div class="cw-icon"><i class="${cw.icon}"></i></div>
                <div class="cw-info">
                    <div class="cw-name">${cw.name} ${cw.version ? '<span class="cw-ver">v' + cw.version + '</span>' : ''}</div>
                    <div class="cw-desc">${cw.desc || ''} ${cw.author ? '· ' + cw.author : ''}</div>
                    <div class="cw-size">默认 ${cw.defaultW}×${cw.defaultH} 格</div>
                </div>
                <div class="cw-actions">
                    <button class="cw-btn add" title="添加到桌面"><i class="fas fa-plus"></i></button>
                    <button class="cw-btn edit" title="编辑"><i class="fas fa-edit"></i></button>
                    <button class="cw-btn del" title="删除"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
            item.querySelector('.cw-btn.add').addEventListener('click', () => addCustomWidgetToDesktop(cw.id));
            item.querySelector('.cw-btn.edit').addEventListener('click', () => openWidgetEditor(cw.id));
            item.querySelector('.cw-btn.del').addEventListener('click', () => {
                if (confirm(`确定删除「${cw.name}」吗？桌面上的该小组件也会被移除。`)) {
                    customWidgets = customWidgets.filter(c => c.id !== cw.id);
                    widgets = widgets.filter(w => !(w.type === 'custom' && w.customId === cw.id));
                    saveCustomWidgets();
                    saveWidgets();
                    renderCustomWidgetList();
                    renderWidgets();
                    if (typeof showHint === 'function') showHint('已删除');
                }
            });
            list.appendChild(item);
        });
    }

    function addCustomWidgetToDesktop(customId) {
        const cw = customWidgets.find(c => c.id === customId);
        if (!cw) {
            if (typeof showHint === 'function') showHint('小组件不存在', true);
            return;
        }
        const w = parseInt(cw.defaultW) || 2;
        const h = parseInt(cw.defaultH) || 2;
        let placed = false;
        for (let gy = 0; gy < GRID_ROWS && !placed; gy++) {
            for (let gx = 0; gx <= GRID_COLS - w && !placed; gx++) {
                if (!checkOverlap(gx, gy, w, h, null)) {
                    widgets.push({ id: genId(), type: 'custom', customId: customId, x: gx, y: gy, w: w, h: h });
                    placed = true;
                }
            }
        }
        if (!placed) {
            if (typeof showHint === 'function') showHint('桌面空间不足，请先删除或移动其他小组件', true);
            return;
        }
        saveWidgets();
        renderWidgets();
        closeMarket();
        if (typeof showHint === 'function') showHint(`已添加「${cw.name}」到桌面`);
    }

    // 编辑器
    let editingCustomId = null;
    function openWidgetEditor(customId) {
        editingCustomId = customId || null;
        const overlay = document.getElementById('widgetEditorOverlay');
        const title = document.getElementById('widgetEditorTitle');
        const nameInput = document.getElementById('widgetEditorName');
        const wSel = document.getElementById('widgetEditorW');
        const hSel = document.getElementById('widgetEditorH');
        const codeArea = document.getElementById('widgetEditorCode');
        if (customId) {
            const cw = customWidgets.find(c => c.id === customId);
            if (cw) {
                title.textContent = '编辑：' + cw.name;
                nameInput.value = cw.name;
                wSel.value = cw.defaultW;
                hSel.value = cw.defaultH;
                codeArea.value = cw.html;
            }
        } else {
            title.textContent = '创建自定义小组件';
            nameInput.value = '';
            wSel.value = '2';
            hSel.value = '2';
            codeArea.value = '<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:1.2rem;color:#888;">我的小组件</div>';
        }
        updateEditorPreview();
        overlay.classList.add('active');
    }

    function closeWidgetEditor() {
        document.getElementById('widgetEditorOverlay').classList.remove('active');
        editingCustomId = null;
    }

    function updateEditorPreview() {
        const preview = document.getElementById('widgetEditorPreview');
        const code = document.getElementById('widgetEditorCode').value;
        if (preview) {
            const iframe = document.createElement('iframe');
            iframe.style.cssText = 'width:100%;height:100%;border:none;background:transparent;';
            let html = code;
            if (!html.startsWith('﻿')) html = '﻿' + html;
            iframe.srcdoc = html;
            preview.innerHTML = '';
            preview.appendChild(iframe);
        }
    }

    function saveWidgetEditor() {
        const name = document.getElementById('widgetEditorName').value.trim() || '未命名';
        const w = parseInt(document.getElementById('widgetEditorW').value);
        const h = parseInt(document.getElementById('widgetEditorH').value);
        const html = document.getElementById('widgetEditorCode').value;
        if (editingCustomId) {
            const cw = customWidgets.find(c => c.id === editingCustomId);
            if (cw) {
                cw.name = name; cw.defaultW = w; cw.defaultH = h; cw.html = html;
            }
        } else {
            const id = 'cw_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
            customWidgets.push({ id, name, desc: '自定义 HTML 小组件', icon: 'fas fa-puzzle-piece', defaultW: w, defaultH: h, author: '', version: '1.0', html });
        }
        saveCustomWidgets();
        renderCustomWidgetList();
        renderWidgets();
        closeWidgetEditor();
        if (typeof showHint === 'function') showHint('已保存');
    }

    // 开发模板下载
    function downloadDevTemplate() {
        const manifest = JSON.stringify({
            name: "我的小组件",
            desc: "这是一个示例自定义小组件",
            icon: "fas fa-puzzle-piece",
            defaultW: 2,
            defaultH: 2,
            author: "你的名字",
            version: "1.0"
        }, null, 2);
        const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  body { margin:0; padding:12px; height:100vh; box-sizing:border-box;
    display:flex; flex-direction:column; align-items:center; justify-content:center;
    font-family:system-ui,sans-serif; color:#333; }
  .title { font-size:1rem; font-weight:600; margin-bottom:8px; }
  .content { font-size:.8rem; opacity:.7; text-align:center; }
</style>
</head>
<body>
  <div class="title">我的小组件</div>
  <div class="content">在这里编写你的 HTML/CSS/JS</div>
  <script>
    // 你的 JavaScript 代码
    console.log('小组件已加载');
  <\/script>
</body>
</html>`;
        const readme = `# Fanlink 自定义小组件开发模板

## 文件结构
- manifest.json - 小组件元数据
- widget.html - 小组件主页面（HTML + CSS + JS）

## 打包方式
使用"存储/不压缩"方式打包为 ZIP：
- 命令行：zip -0 my-widget.zip manifest.json widget.html
- 图形界面：压缩级别选择"存储/Store"

## manifest.json 字段
- name: 小组件名称
- desc: 描述
- icon: Font Awesome 图标类名
- defaultW/defaultH: 默认大小（格，1-5）
- author: 作者
- version: 版本号

## 注意事项
- 所有 CSS/JS 内联在 widget.html 中
- 小组件在 iframe 中运行，与主页面隔离
- 可使用完整的 HTML5 API
`;
        // 生成 ZIP（STORE 方式）
        const zipBlob = createStoreZip([
            { name: 'manifest.json', content: manifest },
            { name: 'widget.html', content: html },
            { name: 'README.md', content: readme }
        ]);
        const url = URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'fanlink-widget-template.zip';
        a.click();
        URL.revokeObjectURL(url);
    }

    // 生成 STORE 方式 ZIP
    function createStoreZip(files) {
        const enc = new TextEncoder();
        const chunks = [];
        const centralDir = [];
        let offset = 0;
        files.forEach(f => {
            const nameBytes = enc.encode(f.name);
            const contentBytes = enc.encode(f.content);
            // Local file header
            const lh = new ArrayBuffer(30 + nameBytes.length);
            const lv = new DataView(lh);
            lv.setUint32(0, 0x04034b50, true);
            lv.setUint16(4, 20, true);
            lv.setUint16(6, 0, true);
            lv.setUint16(8, 0, true);
            lv.setUint16(10, 0, true); // STORE
            lv.setUint16(12, 0, true);
            lv.setUint16(14, 0, true);
            lv.setUint32(16, 0, true); // crc32 简化
            lv.setUint32(20, contentBytes.length, true);
            lv.setUint32(24, contentBytes.length, true);
            lv.setUint16(28, nameBytes.length, true);
            lv.setUint16(30, 0, true);
            new Uint8Array(lh, 30, nameBytes.length).set(nameBytes);
            chunks.push(new Uint8Array(lh), contentBytes);
            // Central directory
            const cd = new ArrayBuffer(46 + nameBytes.length);
            const cv = new DataView(cd);
            cv.setUint32(0, 0x02014b50, true);
            cv.setUint16(4, 20, true);
            cv.setUint16(6, 20, true);
            cv.setUint16(8, 0, true);
            cv.setUint16(10, 0, true);
            cv.setUint16(12, 0, true);
            cv.setUint16(14, 0, true);
            cv.setUint32(16, 0, true);
            cv.setUint32(20, contentBytes.length, true);
            cv.setUint32(24, contentBytes.length, true);
            cv.setUint16(28, nameBytes.length, true);
            cv.setUint16(30, 0, true);
            cv.setUint16(32, 0, true);
            cv.setUint16(34, 0, true);
            cv.setUint16(36, 0, true);
            cv.setUint32(38, 0, true);
            cv.setUint32(42, offset, true);
            new Uint8Array(cd, 46, nameBytes.length).set(nameBytes);
            centralDir.push(new Uint8Array(cd));
            offset += lh.byteLength + contentBytes.length;
        });
        const cdSize = centralDir.reduce((s, c) => s + c.length, 0);
        // EOCD
        const eocd = new ArrayBuffer(22);
        const ev = new DataView(eocd);
        ev.setUint32(0, 0x06054b50, true);
        ev.setUint16(4, 0, true);
        ev.setUint16(6, 0, true);
        ev.setUint16(8, files.length, true);
        ev.setUint16(10, files.length, true);
        ev.setUint32(12, cdSize, true);
        ev.setUint32(16, offset, true);
        ev.setUint16(20, 0, true);
        const all = [...chunks, ...centralDir, new Uint8Array(eocd)];
        const total = all.reduce((s, a) => s + a.length, 0);
        const result = new Uint8Array(total);
        let pos = 0;
        all.forEach(a => { result.set(a, pos); pos += a.length; });
        return new Blob([result], { type: 'application/zip' });
    }

    // 自定义小组件渲染（在 renderWidget 中调用）
    function renderCustomWidget(el, w) {
        const cw = customWidgets.find(c => c.id === w.customId);
        if (!cw) {
            el.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:.8rem;">小组件不存在</div>';
            return;
        }
        const iframe = document.createElement('iframe');
        iframe.className = 'widget-custom-iframe';
        // 确保 HTML 以 UTF-8 BOM 开头，解决 srcdoc 中文乱码
        let html = cw.html;
        if (!html.startsWith('﻿')) {
            html = '﻿' + html;
        }
        iframe.srcdoc = html;
        iframe.style.cssText = 'width:100%;height:100%;border:none;background:transparent;display:block;';
        if (editMode) iframe.style.pointerEvents = 'none';
        el.appendChild(iframe);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindEvents);
    } else {
        bindEvents();
    }
})();