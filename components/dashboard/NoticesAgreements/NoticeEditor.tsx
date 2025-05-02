'use client';
/*eslint-disable */
import { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface NoticeEditorProps {
  onContentChange?: (html: string) => void;
  initialContent?: string;
}

export default function NoticeEditor({ onContentChange, initialContent = 'Type your notice here...' }: NoticeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [editorReady, setEditorReady] = useState(false);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const container = document.createElement('div');
      editorRef.current.appendChild(container);
  
      const q = new Quill(container, {
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });
  
      quillRef.current = q;
  
      // ✅ Correct way to render formatted HTML
      q.clipboard.dangerouslyPasteHTML(initialContent);
  
      const initialFocusHandler = () => {
        if (q.getText().trim() === initialContent) {
          q.setText('');
        }
        q.root.removeEventListener('focus', initialFocusHandler);
      };
  
      q.root.addEventListener('focus', initialFocusHandler);
  
      if (onContentChange) {
        q.on('text-change', () => {
          onContentChange(q.root.innerHTML);
        });
      }
  
      setEditorReady(true);
    }
  }, [initialContent, onContentChange]);
  

  // Expose methods to parent component
  const getContent = () => {
    if (!quillRef.current) return '';
    return quillRef.current.root.innerHTML;
  };

  const getText = () => {
    if (!quillRef.current) return '';
    return quillRef.current.getText().trim();
  };

  const resetEditor = () => {
    if (!quillRef.current) return;
    quillRef.current.setText('');
  };

  // Make methods available to parent components
  if (typeof window !== 'undefined') {
    // @ts-ignore - this is a hack to expose methods to parent
    window.noticeEditor = {
      getContent,
      getText,
      resetEditor
    };
  }

  return (
    <div className="w-full">
      <label 
        className="block text-sm font-medium mb-2"
        style={{ fontFamily: "Plus Jakarta Sans" }}
      >
        Notice Content
      </label>
      
      <div 
        className=" rounded-lg overflow-hidden" 
        ref={editorRef}
        // style={{ minHeight: '450px' }}
      ></div>
    </div>
  );
}