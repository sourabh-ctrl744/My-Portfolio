import React from 'react'

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  )
}
