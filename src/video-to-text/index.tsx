import React, { useRef, useEffect, useState, ReactNode } from 'react';
import { toCharts, getCharsMap } from '../utils';
import mp from './badapple.mp4';

interface VideoToTextProps {
  source: string | ReactNode;
}

const VideoToText = (props: VideoToTextProps) => {
  const { source } = props;
  const videoRef = useRef<any>(null);
  const cavRef = useRef<any>(null);
  const [code, setCode] = useState('');
  console.log(mp);
  let timer: any = null;
  useEffect(() => {
    videoRef.current.addEventListener('play', beginCapture);
    videoRef.current.addEventListener('pause', endCapture);
    videoRef.current.addEventListener('ended', endCapture);
    videoRef.current.addEventListener('playing', function () {
      endCapture();
      beginCapture();
    });
  });
  const captureImage = function () {
    let ctx = null;
    cavRef.current.width = videoRef.current.videoWidth;
    cavRef.current.height = videoRef.current.videoHeight;
    if (cavRef.current.width) {
      ctx = cavRef.current.getContext('2d');
      ctx.clearRect(0, 0, cavRef.current.width, cavRef.current.height);
      ctx.drawImage(
        videoRef.current,
        0,
        0,
        cavRef.current.width,
        cavRef.current.height,
      );
      setCode(
        toCharts({
          context: ctx,
          width: cavRef.current.width,
          height: cavRef.current.height,
          rowChars: 100,
        }),
      );
    }
  };
  const beginCapture = function () {
    timer = setInterval(function () {
      captureImage();
    }, 100);
  };
  const endCapture = function () {
    if (timer) {
      clearInterval(timer);
    }
  };

  // const play = function () {

  //     video.src = 'http://localhost:8002//static/badapple.7ce6c6ad.mp4';
  //     video.play();
  // };
  return (
    <div>
      <br />
      <video
        ref={videoRef}
        style={{ width: '200px', height: '200px' }}
        src={'http://localhost:8000/static/badapple.7ce6c6ad.mp4'}
        controls
      />
      <canvas ref={cavRef}></canvas>
      <pre
        style={{
          fontSize: '10px',
          lineHeight: '8px',
          fontFamily: 'Courier New',
        }}
      >
        {code}
      </pre>
      {/* {
        (file)?
        <canvas ref={cavRef}></canvas>:
        ""
      } */}
    </div>
  );
};

export default VideoToText;
