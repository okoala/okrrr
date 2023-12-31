import reloadOnUpdate from 'virtual:reload-on-update-in-background-script';
import 'webextension-polyfill';
import { RunBackground } from './main';

reloadOnUpdate('core');
reloadOnUpdate('plugins');
reloadOnUpdate('pages/background');
/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate('pages/content/style.less');

RunBackground();
