import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function DisableStateNode({id,data, isConnectable }) {
  const [number, setNumber] = useState(0);
  const [fileName, setFileName] = useState('');

  const onNumberChange = useCallback((evt) => {
    setNumber(evt.target.value);
  }, []);

  const onFileChange = useCallback((evt) => {
    const file = evt.target.files[0];
    if (file) {
      console.log(file);
      setFileName(file.name);
    }
  }, []);
//   const id = (Math.random() + 1).toString(36).substring(7);
  const fileInputId = `state-file-input-${id}`;
  const numberInputId = `number-input-${id}`;
  return (
    <div className="dis-able-state-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
      <label htmlFor="file-input-state-node" className="file-input-label">{data.label}</label>
       
      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default DisableStateNode;
