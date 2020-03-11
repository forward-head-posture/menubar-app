import React, { useState, useCallback } from "react"
import { Container } from "react-bootstrap"
import { ipcRenderer } from "electron"
import ForwardHeadPosture from "react-forward-head-posture"
import Store from "electron-store"

const store = new Store()
const q = []

export default function() {
  const [under, setUnder] = useState(store.get("under", 0))
  const [averageScore, setAverageScore] = useState(0)
  const onEstimate = useCallback(
    score => {
      if (q.length > 9) {
        q.shift()
      }
      q.push(score)
      const average = q.reduce((prev, curr) => prev + curr, 0) / q.length
      ipcRenderer.send("notification", { average, under })
      setAverageScore(average)
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
      <h5>score: {averageScore}</h5>
      <div style={{ height: "80%", width: "100%" }}>
        <ForwardHeadPosture onEstimate={onEstimate} frameRate={5} />
      </div>
    </Container>
  )
}
