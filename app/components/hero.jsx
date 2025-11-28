"use client";

import React from "react";
// import {
//   motion,
//   useInView,
//   useScroll,
//   useSpring,
//   useTransform,
// } from "framer-motion";
import Button from "./button";
import Stats from "./stats";
// import heroVid from "/videos/heroVid.mp4";
// import Video from "next-video";
// import VimeoNova from "player.style/vimeonova/react";

export default function Hero() {
  // const videoContainerRef = useRef(null);
  // const videoElementRef = useRef(null);
  // const { scrollYProgress } = useScroll({
  //   target: videoContainerRef,
  //   // start easing in when the video nears the viewport, settle by mid-viewport
  //   offset: ["start 80%", "center 40%"],
  // });
  // const isVideoInView = useInView(videoContainerRef, { amount: 0.5 });

  // const tilt = useTransform(scrollYProgress, [0, 1], [25, 0]); // slight backward tilt -> flat
  // const tiltSpring = useSpring(tilt, { stiffness: 160, damping: 18 });

  // useEffect(() => {
  //   const videoEl = videoElementRef.current;
  //   if (!videoEl) return;

  //   if (isVideoInView) {
  //     const playPromise = videoEl.play?.();
  //     if (playPromise?.catch) playPromise.catch(() => {});
  //   } else {
  //     videoEl.pause?.();
  //   }
  // }, [isVideoInView]);

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
          <Button variant="secondary" href="#services">Explore Services</Button>
        </div>
        {/* <motion.div
          ref={videoContainerRef}
          className="w-full max-w-5xl"
          style={{
            rotateX: tiltSpring,
            transformPerspective: 1400,
          }}
        >
          <Video
            ref={videoElementRef}
            muted
            loop
            autoPlay
            src={heroVid}
            theme={VimeoNova}
            accentColor="#fff"
            className="overflow-hidden rounded-xl mt-6"
            style={{
              "--media-primary-color": "#f7f7f7",
              "--media-secondary-color": "#141426",
              "--media-accent-color": "#f8333c",
            }}
          />
        </motion.div> */}
      </div>
      <Stats />
    </section>
  );
}
