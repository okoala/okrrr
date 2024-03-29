import { AppContent } from '@core/app-content';
import { createRoot } from 'react-dom/client';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { QuickMenuContentPlugin } from '@plugins/yuque-quick-menu/quick-menu-content-plugin';
import { TranslateYoutubeContentPlugin } from '@plugins/youtube-translate/translate-yt-content-plugin';
// import { SidebarContentPlugin } from '@plugins/sidebar/sidebar-content-plugin';
import { ThemeProvider } from '@plugins/theme/theme-provider';
import { YuqueBeautifyContentPlugin } from '@plugins/yuque-beautify/yuque-beautify-content-plugin';
import { YuqueBizContentPlugin } from '@plugins/yuque-biz/yuque-biz-content-plugin';
// import { YuqueTableContentPlugin } from '@plugins/yuque-table/yuque-table-content-plugin';

refreshOnUpdate('core');
refreshOnUpdate('plugins');
refreshOnUpdate('pages/content');

const root = document.createElement('div');
root.id = 'okrrr-extension-root-container';

document.body.append(root);

const rootIntoShadow = document.createElement('div');
rootIntoShadow.id = 'okrrr-shadow-root';

const shadowRoot = root.attachShadow({ mode: 'open' });
shadowRoot.appendChild(rootIntoShadow);

const app = AppContent.init({
  plugins: [
    // SidebarContentPlugin,
    YuqueBizContentPlugin,
    QuickMenuContentPlugin,
    TranslateYoutubeContentPlugin,
    YuqueBeautifyContentPlugin,
    // YuqueTableContentPlugin,
  ],
});

// antd5 针对 shadow dom 的支持
// https://ant-design.gitee.io/docs/react/compatible-style-cn#shadow-dom-%E5%9C%BA%E6%99%AF
createRoot(rootIntoShadow).render(
  <ThemeProvider container={shadowRoot}>{app.start()}</ThemeProvider>,
);
