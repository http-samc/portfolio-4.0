import { Button, Link, Text } from '@geist-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
// @ts-ignore
import TypeAnimation from 'react-type-animation';

const Hype = () => {
  const router = useRouter();
  const video = React.useRef<any>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [hasTransitioned, setHasTransitioned] = React.useState(false);
  const [videoEnded, setVideoEnded] = React.useState(false);

  const toggleVideo = () => {
    isPlaying
      ? video.current.pause()
      : video.current.play()
    setIsPlaying(!isPlaying);
  }

  const onEnded = async () => {
    setVideoEnded(true)
    await new Promise((resolve, reject) => setTimeout(resolve, 5000));
    router.push('/')
  };

  React.useEffect(() => {
    if (video.current) video.current.onended = onEnded;
  }, [video])

  React.useEffect(() => {
    const transition = async () => {
      await new Promise((resolve, reject) => setTimeout(resolve, 5000));
      setHasTransitioned(true);
    }
    transition()
  }, [])

  return (
    <div>
      <video controls={false} id="hype-video" ref={video} style={{ backgroundColor: 'black' }}>
        <source src="https://firebasestorage.googleapis.com/v0/b/stake-a4a5c.appspot.com/o/hype.mp4?alt=media&token=59bb49b6-c85e-4799-9673-f26fa69f503f" type="video/mp4" />
      </video>
      <section id="hype-content">
        {!hasTransitioned &&
          <Text h1>
            hi@smrth.dev
            <TypeAnimation
              sequence={[' $ cd apps/server', 2000, '', 2000]}
              wrapper="span"
              repeat={1}
              cursor
            />
          </Text>
        }
        {hasTransitioned && !isPlaying &&
          <Button onClick={toggleVideo} type='warning' ghost auto scale={1.5} className='goat' style={{ backgroundColor: 'black' }}>
            <p style={{ fontFamily: 'monospace', letterSpacing: 5 }}>LAUNCH</p>
          </Button>
        }
        {
          hasTransitioned && isPlaying &&
          <Link style={{ position: 'fixed', bottom: 50 }} href='/' id='skip-hype-video'>skip video</Link>
        }
        {videoEnded &&
          <Text h1>
            <TypeAnimation
              sequence={['samarth chitgopekar: back to the basics', 2000]}
              wrapper="span"
              repeat={1}
              cursor
            />
          </Text>
        }
      </section>
    </div>
  )
}

export default Hype