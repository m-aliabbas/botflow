import React, { useCallback, useState,useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function StateNode ({ id, onSendData, data, isConnectable,onInputChange,onFileChange,onCheckChange}) {
  const [inputValue, setInputValue] = useState('');
  const [fileName, setFileName] = useState('');
  const [checked, setChecked] = useState(false);

  // console.log("checkbox",checked)

  const handleChange = (event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onInputChange) {
      onInputChange(id, newValue);
    }
  };
  // Inside StateNode component

  const handleCheckChange = (event) => {
    const newChecked = event.target.checked;
    setChecked(newChecked); // This updates the local state
    if (onCheckChange) {
      onCheckChange(id, newChecked); // Make sure this is being called
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileName(file);
    if (onFileChange) {
      onFileChange(id, file);
    }
  };
  // Use useEffect to send data whenever inputValue or fileName changes
  useEffect(() => {
    const sendData = async () => {
      console.log('Send Data B')
      // Check if both inputValue and fileName have values
      if (typeof onSendData === 'function' && inputValue && fileName) {
        const dataToSend = {
          inputValue,
          fileName,
          checked,
        };
        console.log(dataToSend)
        onSendData(id, dataToSend);
      }
    };

    sendData();
  }, [id, inputValue, fileName,checked, onSendData]);
  // console.log('checked_status','input value',checked,inputValue);
  const checkBoxId = `state-check-input-${id}`;
  const fileInputId = `state-file-input-${id}`;
  const numberInputId = `number-input-${id}`;
  return (
    <div className="state-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
      <label htmlFor="file-input-state-node" className="file-input-label">{data.label}</label>
<div className='checkbox-out'><p style={{fontSize:"6pt"}}>Rebuttal State</p>
<input
  id="customCheckbox"
  type="checkbox"
  checked={checked}
  onChange={handleCheckChange} // Make sure this matches your method name
  className='checkbox-div'
/>

</div>

        <label htmlFor="number-input" className='numbers'>Listening seconds</label>
        <input 
        className='input-numbers'
        value={inputValue}
        onChange={handleChange}
          type="number"
          id={numberInputId}
          // value={number}
          step="1"
          // placeHolder='Listening Sec'
          // onChange={onNumberChange}
        />
      </div>
      <div>
   
        <input 
          type="file"
          id={fileInputId}
          name="file"
          // onChange={onFileChange}
          className="nodrag file-input"
          style={{ display: 'none' }}
  
          onChange={handleFileChange}
        />
                 <label className='numbers'>Please select an audio file (requeird)</label>
        {/* <button className="file-select-button" onClick={() => document.getElementById(fileInputId).click()}>
          Select File
        </button> */}
        <Button  className="file-select-button" onClick={() => document.getElementById(fileInputId).click()} variant="contained" startIcon={<CloudUploadIcon />}>
      Upload file 
    </Button>
        {fileName && <div className="file-name-display">{fileName.name}</div>}
        {/* {selectedFile && <div className="file-name-display">{selectedFile.name}</div>} */}

      </div>
      <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default StateNode;
