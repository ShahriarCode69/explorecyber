import React from "react";
import Button from "./button";
import Stats from "./stats";
import heroVid from "/videos/heroVid.mp4";
import Video from "next-video";
import VimeoNova from "player.style/vimeonova/react";

export default function Hero() {
  return (
    <section className='h-auto overflow-hidden bg-[url("/backgrounds/heroBg.png")] bg-cover bg-bottom'>
      <div className="flex-center mx container flex-col gap-10 pt-48">
        <div className="flex-center flex-col text-center">
          <h1 className="heading-xl leading-5">
            Securing Today, <br /> Defending Tomorrow
          </h1>
          <p className="description mt-4">
            Elite cybersecurity solutions protecting your digital infrastructure
            from evolving threats. We secure what matters most.
          </p>
        </div>
        <div className="flex gap-3">
          <Button href="/bookdemo">Book A Demo</Button>
          <Button href="#services">Explore Services</Button>
        </div>
        <Video
          muted
          autoPlay
          loop
          src={heroVid}
          theme={VimeoNova}
          accentColor="#fff"
          className="overflow-hidden rounded-xl"
          style={{
            "--media-primary-color": "#f7f7f7",
            "--media-secondary-color": "#141426",
            "--media-accent-color": "#f8333c",
          }}
        />
      </div>
      <Stats />
    </section>
  );
}
