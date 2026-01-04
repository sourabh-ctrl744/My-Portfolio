import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendMessage } from '../services/api'

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [status, setStatus] = useState({ type: '', msg: '' })

  const onSubmit = async (data) => {
    setStatus({ type: '', msg: '' })
    try {
      await sendMessage({
        name: data.name,
        email: data.email,
        subject: data.subject,
        body: data.body
      })
      setStatus({ type: 'success', msg: 'Thanks! Your message has been sent successfully.' })
      reset()
    } catch (err) {
      const msg = err?.response?.data?.message || 'Something went wrong. Please try again.'
      setStatus({ type: 'error', msg })
    }
  }

  return (
    <div className="contact-form-section">
      <div className="contact-header">
        <h3 className="contact-title">Get In Touch</h3>
        <p className="contact-subtitle">
          Have a project in mind or want to hire me ? I'd love to hear from you. 
          Send me a message and I'll respond as soon as possible.
        </p>
      </div>
      
      <form className="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label className="label" htmlFor="name">Full Name</label>
            <input 
              id="name"
              className="input" 
              {...register('name', { required: 'Name is required' })} 
              placeholder="Enter your full name" 
            />
            {errors.name && <small className="error">{errors.name.message}</small>}
          </div>
          
          <div className="form-group">
            <label className="label" htmlFor="email">Email Address</label>
            <input 
              id="email"
              className="input" 
              type="email" 
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /\S+@\S+\.\S+/, message: 'Please enter a valid email address' }
              })} 
              placeholder="your.email@example.com" 
            />
            {errors.email && <small className="error">{errors.email.message}</small>}
          </div>
          
          <div className="form-group full-width">
            <label className="label" htmlFor="subject">Subject</label>
            <input 
              id="subject"
              className="input" 
              {...register('subject', { required: 'Subject is required', maxLength: 200 })} 
              placeholder="What's this about?" 
            />
            {errors.subject && <small className="error">{errors.subject.message}</small>}
          </div>
          
          <div className="form-group full-width">
            <label className="label" htmlFor="message">Message</label>
            <textarea 
              id="message"
              className="textarea" 
              {...register('body', { required: 'Message is required' })} 
              placeholder="Tell me about your project or just say hello..." 
              rows="5"
            />
            {errors.body && <small className="error">{errors.body.message}</small>}
          </div>
        </div>

        <div className="form-actions">
          <button className="btn primary submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                </svg>
                Send Message
              </>
            )}
          </button>
          
          {status.msg && (
            <div className={`status-message ${status.type}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {status.type === 'success' ? (
                  <polyline points="20,6 9,17 4,12"/>
                ) : (
                  <>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </>
                )}
              </svg>
              {status.msg}
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
