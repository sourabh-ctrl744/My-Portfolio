import React from 'react'
import { blogs } from '../data/resume'

export default function Blogs() {
  return (
    <div className="cards">
      {blogs.map((b, i) => (
        <article key={i} className="card pad">
          <small className="mono" style={{opacity:.7}}>{b.date}</small>
          <h3 style={{fontSize:18, margin:'6px 0'}}>{b.title}</h3>
          <p style={{opacity:.9}}>{b.excerpt}</p>
          <div style={{marginTop:10}}>
            <a className="btn" href={b.url} target="_blank" rel="noreferrer">Read</a>
          </div>
        </article>
      ))}
    </div>
  )
}
