import React, { useState, useEffect, useRef, createRef } from "react";

let timer;

export default function App() {
  const audioElement = useRef(null);


  const [playing, setPlaying] = useState(false);
  const [mood, setMood] = useState('sunny');
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (audioElement.current !== null) {
      if (playing) {
        audioElement.current.play();
      } else {
        audioElement.current.pause();
      }
    }
  }, [playing, mood]);

  const setTimer = minutes => () => {
    setSecondsLeft(minutes * 60 * 1000);
  };

  const mm = Math.floor(secondsLeft / 1000 / 60);
  const ss = (secondsLeft / 1000) % 60;

  useEffect(() => {
    clearInterval(timer);
    timer = setInterval(() => {
      if (playing) {
        console.log("plaing");

        if (secondsLeft - 1000 >= 0) {
          setSecondsLeft(secondsLeft - 1000);
        } else {
          setPlaying(false)
          console.log("not playing");
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [playing, secondsLeft]);

  const toggle = () => {
    setPlaying(!playing);
  };

  return (
    <div className="App">
      <button onClick={setTimer(1)}>1 minute</button>
      <br />
      <button onClick={setTimer(5)}>5 minutes</button>
      <br />
      <button onClick={setTimer(10)}>10 minutes</button>
      <br />
      <button onClick={setTimer(15)}>15 minutes</button>
      <br />

      <button onClick={() => setMood('sunny')}>Sunny</button>
      <br />
      <button onClick={() => setMood('cloudy')}>Cloudy</button>
      <br />

      <button onClick={toggle}>{playing ? 'Stop' : 'Start'}</button>
      <br />

      <div>
        {mm}:{ss}
      </div>

      <audio ref={audioElement} key={mood}>
        {/* <source src="melody.ogg" type="audio/ogg" /> */}
        <source src={`${mood}.mp3`} type="audio/mpeg" />
      </audio>
    </div>
  );
}
