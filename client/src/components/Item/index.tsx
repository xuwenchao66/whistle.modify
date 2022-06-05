import { FC, ReactNode } from 'react';
import style from './index.module.less';
import classnames from 'classnames';

export interface GroupItem {
  children: ReactNode;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}

const GroupItem: FC<GroupItem> = ({ children, prefix, suffix, className }) => {
  return (
    <div className={classnames(style.container, className)}>
      {prefix && <div className={style.prefix}>{prefix}</div>}
      <div className={style.content}>{children}</div>
      {suffix && <div className={style.suffix}>{suffix}</div>}
    </div>
  );
};

export default GroupItem;
