import styles from "./view.module.css";
import CopyToClipboard from "react-copy-to-clipboard";
import Router, {useRouter} from 'next/router';
import {useEffect, useState} from "react";
import axios from '../lib/api';

import {message} from "antd";

function getTaskID(router) {
  const { TaskID }: any = router.query;
  return TaskID ? TaskID as string : ""
}

export default function View(){
  const copyList = ["Src", "MarkDown", "HTML"]
  const router = useRouter();
  const [url, setUrl] = useState("")
  const [success, setSuccess] = useState(false)
  const [copyUrl, setCopyUrl] = useState(copyList[0])
  const [copyMD, setCopyMD] = useState(copyList[1])
  const [copyImg, setCopyImg] = useState(copyList[2])

  let taskID = getTaskID(router)
  useEffect(() => {
      if (taskID) {
        getUrl(taskID)
      }
  }, [taskID])


  const copyValue: Array<string> = [copyUrl, copyMD, copyImg]
  const copyFunc = [setCopyUrl, setCopyMD, setCopyImg]
  useEffect(() => {
    copyValue.forEach(function (cv, index) {
      if (cv !== copyList[index]) {
        setTimeout(()=> {
          copyFunc[index](copyList[index])
        }, 500)
      }
    });
    }, copyValue)

  function getUrl(taskID: string) {
    axios.get("/api/url/"+ taskID)
      .then(res => {
        setUrl(res.data.URL)
        setSuccess(true)
      })
      .catch(e => {
        message.error("File not found! Please upload first!", 0.5)
        setTimeout(() => Router.push({pathname: "/"}), 1)
      })
  }

  if (!success){
    return <></>
  } else {
    return (
      <>
        <img className={styles.preview} src={url} />
        <div className="line">
          <CopyToClipboard text={url}>
            <label htmlFor="src" className={styles.copyLabel} onClick={() => setCopyUrl("Copied!")}>{copyUrl}</label>
          </CopyToClipboard>
          <input name="src" value={url} disabled/>
        </div>
        <div className="line">
          <CopyToClipboard text={"![](" + url + ")"}>
            <label htmlFor="markdown" className={styles.copyLabel} onClick={() => setCopyMD("Copied!")}>{copyMD}</label>
          </CopyToClipboard>
          <input name="markdown" value={"[]!(" + url + ")"} disabled/>
        </div>
        <div className="line">
          <CopyToClipboard text={"<img src=\"" + url + "\" >"}>
            <label htmlFor="html" className={styles.copyLabel} onClick={() => setCopyImg("Copied!")}>{copyImg}</label>
          </CopyToClipboard>
          <input name="html" value={"<img src=\"" + url + "\" >"} disabled/>
        </div>
      </>
    )
  }
}
