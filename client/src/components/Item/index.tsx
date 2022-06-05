import { FC, ReactNode } from 'react';
import style from './index.module.less';
import classnames from 'classnames';

export interface GroupItem {
  children: ReactNode;
  className?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onPrefixClick?: () => any;
  onSuffixClick?: () => any;
}

const GroupItem: FC<GroupItem> = ({
  children,
  prefix,
  suffix,
  className,
  onPrefixClick,
  onSuffixClick,
}) => {
  return (
    <div className={classnames(style.container, className)}>
      {prefix && (
        <div
          className={classnames(style.prefix, {
            [style.clickable]: onPrefixClick,
          })}
          onClick={onPrefixClick}
        >
          {prefix}
        </div>
      )}
      <div className={style.content}>{children}</div>
      {suffix && (
        <div
          className={classnames(style.suffix, {
            [style.clickable]: onSuffixClick,
          })}
          onClick={onSuffixClick}
        >
          {suffix}
        </div>
      )}
    </div>
  );
};

export default GroupItem;
