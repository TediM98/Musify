import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { Howl, Howler } from 'howler';

//GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=The%20office&key=[YOUR_API_KEY] HTTP/1.1


export function StationPlayer() {
  return (
  <div>
  <h1>Im gonna be a music player!</h1>
  <iframe width="420" height="315"
src="https://www.youtube.com/embed/tgbNymZ7vqY">
</iframe>
  
  
  </div>
  )
}
