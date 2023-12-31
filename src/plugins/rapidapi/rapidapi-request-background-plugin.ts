import { IAppBackgroundPlugin } from '@core';
import { ajax } from './services/request-runtime';
import {
  pluginId,
  pluginName,
  pluginDesc,
  backgrondRequestEventName,
} from './constants';

export class RapidApiBackgroundPlugin implements IAppBackgroundPlugin {
  readonly pluginId = pluginId;
  readonly pluginName = pluginName;
  readonly pluginDesc = pluginDesc;

  // 注册请求的消息处理
  registerBackgroundMessager() {
    return {
      name: backgrondRequestEventName,
      handler: ({ url, config, options = {} }) => {
        return ajax(url, config, options);
      },
    };
  }
}
