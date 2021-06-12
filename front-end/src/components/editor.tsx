import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw} from 'draft-js';
import xssFilters from 'xss-filters';
import '../styles/editor.css'
import axios from 'axios';
import env from '../config/env';

const uploadImageCallBack = async () => {

}

const EditorContainer = () => {
  const [editorState,setEditorState] = useState(EditorState.createEmpty())
  const [title,setTitle] = useState("")
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }
  const onEditorStateChange = (newState: React.SetStateAction<EditorState>) => {
    setEditorState(newState)
  }
  const editorToHtml = () => {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    return html
  }

  const validateValues = (title:string, content:string) => {
    console.log("content: ",content)
    if ( title && content) {
      return true
    } else {
      return false
    }
  }

  const uploadFeed = async () => {
    const html: string = editorToHtml()
    const isValidated = validateValues(title,html)
    if ( !isValidated ) {
      alert("내용을 알맞게 작성 해 주세요")
      return 
    }

    try {
      console.log("bearer "+localStorage.getItem("token"))
      const response = await axios.post(env.BACKEND_BASEURL+"/api/feed/createFeed",
        {
          title: title,
          content: html
        },
        {
          headers: {
            Authorization: "bearer "+localStorage.getItem("token")
          }
        }
      )
      console.log(response)
    } catch (err) {
      console.log("im err",err)
    
    }
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
              onChange={handleTitleChange} 
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