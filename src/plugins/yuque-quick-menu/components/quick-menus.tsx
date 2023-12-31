/// <reference types="vite-plugin-svgr/client" />

import { Menu } from 'antd';
import DocIcon from '@assets/icons/doc.svg?react';
import SheetIcon from '@assets/icons/sheet.svg?react';
import BoardIcon from '@assets/icons/board.svg?react';
import TableIcon from '@assets/icons/table.svg?react';

import { useEffect, useMemo, useState } from 'react';
import { DocService } from '../services/doc-service';
import { DocType } from '../../yuque-biz/interfaces/i-doc';
import { useStyles } from './quick-menus.styles';

type MenuType = {
  name: string;
  type: DocType;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
};

export function QuickMenus(props) {
  const [recentId, setRecentId] = useState(props.recentId);
  const { styles } = useStyles();
  const menus: MenuType[] = [
    {
      name: '文档',
      type: 'Doc',
      icon: DocIcon,
    },
    {
      name: '表格',
      type: 'Sheet',
      icon: SheetIcon,
    },
    {
      name: '画板',
      type: 'Board',
      icon: BoardIcon,
    },
    {
      name: '数据表',
      type: 'Table',
      icon: TableIcon,
    },
  ];

  useEffect(() => {
    setRecentId(props.recentId);
  }, [props.recentId]);

  const docService = useMemo(() => {
    return new DocService();
  }, []);

  return (
    <>
      <Menu className={styles.menus} selectable={false}>
        {menus.map((item, index) => {
          if (item.name === 'divide') {
            return <Menu.Divider key={index} />;
          }

          const Icon = item.icon;
          return (
            <Menu.Item
              key={item.type}
              onClick={() => {
                docService.createDocument(item.type, recentId);
              }}
            >
              {Icon && <Icon className={styles.icon} />}
              新建{item.name}
            </Menu.Item>
          );
        })}
      </Menu>
    </>
  );
}
