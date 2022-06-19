import { useEffect, useRef, FC, memo, useState } from 'react';
import { JSONEditor } from 'svelte-jsoneditor/dist/jsoneditor.js';
import {
  MenuButtonItem,
  TextContent,
  FontAwesomeIcon,
} from 'svelte-jsoneditor';
import {
  faUpRightAndDownLeftFromCenter,
  faDownLeftAndUpRightToCenter,
} from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import style from './index.module.less';

export interface CustomJSONEditorProps {
  value?: string;
  onChange: (val: string) => void;
}

export type Mode = 'tree' | 'code';

const MODE: Record<Mode, Mode> = {
  code: 'code',
  tree: 'tree',
};

const CustomJSONEditor: FC<CustomJSONEditorProps> = ({
  value = '',
  onChange,
}) => {
  const containerRef = useRef(null);
  const editorRef = useRef<any>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    // @ts-ignore
    editorRef.current = new JSONEditor({
      target: containerRef.current,
      props: {
        mode: MODE.code,
        content: { text: value },
        onChange: (updatedContent: TextContent) => {
          onChange(updatedContent.text);
        },
        onRenderMenu: (mode: Mode, items: MenuButtonItem[]) => {
          // remove mode switcher
          items.splice(0, 3);
          // remove sort & filter
          items.splice(3, 2);
          items.push({
            icon: (isFullScreen
              ? faDownLeftAndUpRightToCenter
              : faUpRightAndDownLeftFromCenter) as FontAwesomeIcon,
            onClick: () => setIsFullScreen(!isFullScreen),
          });
          return items;
        },
      },
    });

    const onkeydown = (e: KeyboardEvent) => {
      e.key === 'Escape' && setIsFullScreen(false);
    };

    isFullScreen && document.addEventListener('keydown', onkeydown, true);

    return () => {
      isFullScreen && document.removeEventListener('keydown', onkeydown, true);

      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, [isFullScreen]);

  useEffect(() => {
    editorRef.current.update({ text: value });
  }, [value]);

  return (
    <div
      className={classnames(style.container, {
        [style.fullScreen]: isFullScreen,
      })}
      ref={containerRef}
    />
  );
};

export default memo(CustomJSONEditor);
