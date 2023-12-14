import { Configuration } from '@core/configuration';
import { IApp, IAppConfig } from './interfaces/i-app';
import { SidepanelPluginManager } from './sidepanel/sidepanel-manager';
import { IPlugin } from './interfaces/i-plugin';

export class AppSidepanel implements IApp {
  static init(config: IAppConfig) {
    return new AppSidepanel({ ...config });
  }

  readonly config: IAppConfig;
  readonly configuration: Configuration;
  readonly pluginMananger?: SidepanelPluginManager;

  constructor(config: IAppConfig) {
    this.config = config;

    this.configuration = new Configuration();
    this.pluginMananger = new SidepanelPluginManager();

    const pluginInstances: IPlugin[] = [];
    for (const Plugin of config.plugins) {
      const plugin = new Plugin();
      // 自定义配置
      if (plugin.registerConfiguraion) {
        plugin.registerConfiguraion.call(plugin, this.configuration);
      }
      pluginInstances.push(plugin);
    }

    for (const pluginInstance of pluginInstances) {
      // 自定义配置渲染页
      if (pluginInstance.registerSidepanelRender) {
        this.pluginMananger?.registerSidepanelRender.call(
          pluginInstance,
          pluginInstance.registerSidepanelRender(),
        );
      }

      if (pluginInstance.registerSidepanelItem) {
        this.pluginMananger?.registerSidepanelItem.call(
          pluginInstance,
          pluginInstance.registerSidepanelItem(),
          this.configuration,
        );
      }

      if (pluginInstance.registerSidepanelFooterItem) {
        this.pluginMananger?.registerSidepanelFooterItem.call(
          pluginInstance,
          pluginInstance.registerSidepanelFooterItem(),
        );
      }
    }
  }

  start() {
    return this.pluginMananger?.getRender();
  }
}