import React, { useState, useCallback, useRef } from "react"
import { ipcRenderer } from "electron"
import ForwardHeadPosture from "react-forward-head-posture"

export default function() {
  const onEstimate = useCallback(score => {
    // if (q.current.length > 9) {
    //   q.current.shift()
    // }
    // q.current.push(score)
    // q.current.reduce((prev, curr) => prev + curr, 0) / q.current.length
    ipcRenderer.send("score", score)
  }, [])
  return <ForwardHeadPosture onEstimate={onEstimate} frameRate={5} />
}
