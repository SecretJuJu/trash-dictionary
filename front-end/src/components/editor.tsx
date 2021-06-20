import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import '../styles/editor.css'
import axios from 'axios';
import env from '../config/env';
import { useHistory } from 'react-router-dom';



interface IFeedDTO {
  title: string
  content: string
}




const EditorContainer = () => {
  const history = useHistory();
  const [editorState,setEditorState] = useState(EditorState.createEmpty())
  const [title,setTitle] = useState("")
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }
  const onEditorStateChange = (newState: React.SetStateAction<EditorState>) => {
    setEditorState(newState)
  }
  const editorToHtml = () => {
    const html = convertToHTML(editorState.getCurrentContent())
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
      const _id = response?.data?._id
      history.push(`/feed/${_id}`)
    } catch (err) {
      alert("업로드 실패..")
      console.log("im err",err)
    }

  }
  
  const tempStore = () => {
    const tempData: IFeedDTO = {
      title: title,
      content: editorToHtml()
    }
    
    localStorage.setItem("tempStored",JSON.stringify(tempData))
  }
  
  const getTempData = () => {
    const tempString:any = (localStorage.getItem("tempStored") !== null)? localStorage.getItem("tempStored"): null
    let tempData: IFeedDTO
    try {
      tempData = JSON.parse(tempString)
      return tempData
    } catch (err) {
      console.log(err)
      alert("임시저장을 불러오는데 실패했습니다.")
      return null
    }
  }

  const loadTmp = () => {
    const tempData = getTempData()
    if (tempData === null) {
      alert("불러올 임시저장이 없습니다.")
      return
    }
    try {
      const newState = EditorState.push(editorState, convertFromHTML(tempData.content),'undo')
      onEditorStateChange(newState)
      setTitle(tempData.title)
      alert("임시저장을 불러왔습니다.")
    } catch(err) {
      console.log(err)
      alert("임시저장 불러오기 실패")
      return
    }
    
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
              value={title}
            />
          </h1>
        </div>
        <div className='editor'>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}    
            toolbar={{
              image: { alt: { present: true, mandatory: true } },
              inline: { inDropdown: true },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true }
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
          <button onClick={loadTmp}>
            임시저장 불러오기
          </button>
        </div>
      </div>
    </div>
    </>
  )
};

export default EditorContainer;