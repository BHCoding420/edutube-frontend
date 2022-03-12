import React from 'react'

interface Props {
  file:any;
}

const VideoPlayer = ({file}:Props) => {
  return (
    <video
            id="my-video"
            className="video-js"
            controls
            preload="auto"
            width="100%"
            height="500px"
            poster="MY_VIDEO_POSTER.jpg"
            data-setup="{}"

          >
            <source src={file.file} type="video/mp4" />

            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
              >
                supports HTML5 video
              </a>
            </p>
          </video>
  )
}

export default VideoPlayer