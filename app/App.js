import React, { useState, useCallback } from "react"
import { Container } from "react-bootstrap"
import { ipcRenderer } from "electron"
import ForwardHeadPosture from "react-forward-head-posture"
import Store from "electron-store"

const store = new Store()
const q = []
function onEstimate(under, score) {
  if (q.length > 9) {
    q.shift()
  }
  q.push(score)
  const averageScore = q.reduce((prev, curr) => prev + curr, 0) / q.length
  ipcRenderer.send("score", averageScore)
  if (averageScore < under) {
    ipcRenderer.send("alert", averageScore)
  }
}

export default function() {
  const [under, setUnder] = useState(store.get("under", 0))
  const [score, setScore] = useState(0)
  const onEstimateCallback = useCallback(
    scoresArray => {
      onEstimate(under, scoresArray[0][0])
      setScore(scoresArray[0][0])
    },
    [under]
  )

  return (
    <Container>
      <div className="d-flex">
        <h4>Alert under : </h4>
        <input
          type="number"
          value={under}
          onChange={e => {
            setUnder(e.target.value)
            store.set("under", e.target.value)
          }}
        />
      </div>
      <h5>score: {score}</h5>
      <div style={{ height: "80%", width: "100%" }}>
        <ForwardHeadPosture onEstimate={onEstimateCallback} frameRate={5} />
      </div>
    </Container>
  )
}
