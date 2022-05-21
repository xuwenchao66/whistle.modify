import { useEffect, useRef, FC } from 'react';
import JSONEditor, { JSONEditorOptions } from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

export interface CustomJSONEditorProps {
  value?: Record<string, any>;
}

const CustomJSONEditor: FC<CustomJSONEditorProps> = ({ value }) => {
  const containerRef = useRef(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    const options: JSONEditorOptions = { language: 'en' };

    if (containerRef.current) {
      editorRef.current = new JSONEditor(containerRef.current, options, value);
    }

    return () => {
      editorRef.current && editorRef.current.destroy();
    };
  }, [containerRef, value]);

  return <div ref={containerRef} />;
};

export default CustomJSONEditor;
