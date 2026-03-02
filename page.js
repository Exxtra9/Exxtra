"use client"
import { useEffect, useState } from "react"

export default function Home() {
  const [article, setArticle] = useState(null)
  const [headline, setHeadline] = useState("")
  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch("/api/article").then(r=>r.json()).then(setArticle)
  }, [])

  const submitHeadline = async () => {
    const res = await fetch("/api/score", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        userHeadline:headline,
        realHeadline:article.title,
        description:article.description
      })
    })
    setResult(await res.json())
  }

  return (
    <main style={{maxWidth:"500px", margin:"40px auto"}}>
      <h1>Headline Hero</h1>
      {article && (
        <div style={{background:"#fff", padding:"15px", borderRadius:"8px"}}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      )}
      <input
        style={{width:"100%", padding:"10px", marginTop:"10px"}}
        placeholder="Write your headline..."
        value={headline}
        onChange={(e)=>setHeadline(e.target.value)}
      />
      <button
        style={{width:"100%", padding:"10px", marginTop:"10px"}}
        onClick={submitHeadline}
      >
        Submit
      </button>

      {result && (
        <div style={{marginTop:"20px", background:"#fff", padding:"15px"}}>
          <h3>Score: {result.score}</h3>
          <p>Creativity: {result.creativity}</p>
          <p>Relevance: {result.relevance}</p>
          <p>Impact: {result.impact}</p>
        </div>
      )}
    </main>
  )
}