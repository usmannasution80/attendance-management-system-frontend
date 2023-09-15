import {useRef, useEffect, useState} from 'react';
import {Box} from '@mui/material';

function QrLogs(props){
  const {logs} = props;
  const logsRef = useRef(null);
  const [lastTime, setLastTime] = useState(null);
  useEffect(() => {
    if(logsRef.current)
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
  });
  useEffect(() => {
    setInterval(() => {
      if(logs.current.time !== lastTime)
        setLastTime(logs.current.time);
    }, 100);
  }, [])
  return (
        <Box
          sx={{overflow:'scroll', maxHeight:'5em'}}
          ref={logsRef}>
          {(() => {
            const logDivs = [];
            for(let log of logs.current.list){
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