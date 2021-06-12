import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw} from 'draft-js';

import '../styles/editor.css'

const uploadImageCallBack = async () => {

}

const EditorContainer = () => {
  const [editorState,setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (newState: React.SetStateAction<EditorState>) => {
    setEditorState(newState)
  }
  const editorToHtml = () => {
    
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html)
  }
  const uploadFeed = () => {
    
  }
  const tempStore = () => {

  }
  return (
    <>
    <div>
      <div className="editor-wrapper">
        <div className="feed-title">
          <h1>
            <input 
              type="text" 
              name="title" 
              placeholder="제목을 입력 해 주세요"
              required
              autoComplete="off" 
            />
          </h1>
        </div>
        <div className='editor'>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}    
            toolbar={{
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
            }}
          />
        </div>
        <div className='buttons'>
          <button onClick={uploadFeed}>
            완료
          </button>
          <button onClick={tempStore}>
            임시저장
          </button>
        </div>
      </div>
    </div>
    </>
  )
};

export default EditorContainer;