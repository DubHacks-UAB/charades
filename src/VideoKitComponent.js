import React, { useEffect, useRef } from 'react';
import VideoKit from 'videokit';
 
/**
 * This component represents a user's video and consists of 4 things:
 * 1. the video display
 * 2. the two buttons on the side (audio and video)
 * 3. user's name
 * 4. user's avatar
 * 
 * Display name and avatar have default values set by videokit. They can be overriden
 * by passing in `name` and `avatar` props.
 */
const VideoKitComponent = props => {
  const vk = VideoKit({
    apiKey: '1v3s1x1w2N3417P1cP3l3793W12X',
    callId: 'my-call-1293487',
    user: {
      name: props.name !== undefined ? props.name : '',
      avatar: props.avatar !== undefined ? props.avatar : '',
    }
  });

  const videoCallEl = useRef();
  useEffect(() => vk.mount(videoCallEl.current));
  return (
    <div ref={videoCallEl}></div>
  )
}

export default VideoKitComponent;