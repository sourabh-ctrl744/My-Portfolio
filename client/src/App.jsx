import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Section from './components/Section'
import About from './components/About'
import WhatsAppButton from './components/WhatsAppButton'
import Testimonials from './components/Testimonials'
import Education from './components/Education';
import ContactCard from './components/ContactCard' // NEW
import RatePortfolio from './components/RatePortfolio'

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
        <Section id="home"><Hero /></Section>
        <Section id="about" title="About"><About /></Section>
        <Section id="experience" title="Experience"><Experience /></Section>
        <Section id="projects" title="Projects"><Projects /></Section>
        {/* <Section id="testimonials" title="Recommendations">
          <Testimonials />
        </Section> */}
        {/* <Section id="blogs" title="Blogs"><Blogs /></Section> */}
        <Section id="education" title="Education">
          <Education />
        </Section>
        <Section id="contact" title="Contact">
          <Contact />
          <ContactCard />   {/* Card appears below form */}
        </Section>
        {/* <Section id="rate" title="Rate My Portfolio">
          <RatePortfolio />
        </Section> */}
      </div>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
