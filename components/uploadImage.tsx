import styles from './upload.module.css'
import React, {useState} from "react";
import axios from '../lib/api';
import Router from "next/router";

import {message} from 'antd';

export default function UploadImage(){
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose File");
  const [pwd, setPassword] = useState("");

  function onClick() {
    if (file == null) {
      message.warning("Please choose file first!")
      return
    }

    if (!pwd) {
      message.warning("Please input password!")
      return
    }

    const result = fileUpload(file, pwd);
    result.then((data) => {
      if (data.data) {
        Router.push({pathname: "/view", query: data.data}, "")
      }
    }).catch(e => message.error(e.response.data))
  }

  function fileUpload(file, pwd){
    const formData = new FormData();
    formData.append('uploadFile',file);
    formData.set("password", pwd);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return axios.post("/api/upload", formData,config)
  }

  function handleImageChange(e) {
    e.preventDefault();
    const uploadFile = e.target.files[0]
    if (uploadFile) {
      setFile(uploadFile);
      setFileName(uploadFile.name);
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  return (
    <div className={styles.uploadForm}>
      <img className="logo" src="/images/misaki.png" width="20%"/>
      <div className="line">
          <label className={styles.uploadBtn} htmlFor="uploadFile">Choose</label>
          <input id="filename" placeholder={fileName} disabled/>
          <input id="uploadFile" name="uploadFile" type="file" accept="image/*" onChange={handleImageChange} hidden/>
        </div>
        <div className="line">
          <label htmlFor="password">Password</label>
          <input className={styles.passwordInput} id="password" name="password" type="password" onChange={handlePasswordChange}/>
        </div>
        <input className={styles.submitBtn} type="submit" value="Upload" onClick={onClick}/>
    </div>
  )
}

