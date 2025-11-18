import React from 'react'
import Button from './button';

export default function Cta() {
	return (
    <section className='relative h-auto bg-[url("/backgrounds/ctaBg.png")] bg-cover bg-center'>
      <div className="section mx flex-center container flex-col p-22">
        <h2 className="heading-xl">2200</h2>
        <h4 className="heading-sm mb-4 text-center">Number of Cyber Attacks Per Day</h4>
        <p className="description mb-8 text-center">
          It's Happening 39 Seconds On Average. Need help with your security
          problem? No worries !!!
        </p>

        <Button>Contact Us</Button>
      </div>
    </section>
  );
}
