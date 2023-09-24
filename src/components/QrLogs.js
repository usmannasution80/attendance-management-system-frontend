import {useRef, useEffect, useState} from 'react';
import {Box} from '@mui/material';

function QrLogs(){

  const {component} = window.web;
  const [render, setRender] = useState(-1);
  component('QrLogs', 'render', () => setRender(render * -1), false);

  let logs = component('QrLogs', 'logs');

  const logsRef = useRef(null);
  const [lastTime, setLastTime] = useState(null);

  useEffect(() => {
    if(logsRef.current)
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
  });

  useEffect(() => {
    setInterval(() => {
      if(logs.time !== lastTime)
        setLastTime(logs.time);
    }, 100);
  }, [])

  return (
        <Box
          sx={{overflow:'scroll', maxHeight:'5em'}}
          ref={logsRef}>
          {(() => {
            const logDivs = [];
            for(let log of logs.list){
              const [time, color, text] = log.split(',');
              logDivs.push(
                <div key={String(time)} style={{color, whiteSpace:'nowrap'}}>
                  {time} : {text}
                </div>
              );
            }
            return logDivs;
          })()}
        </Box>
  );
}

export default QrLogs;