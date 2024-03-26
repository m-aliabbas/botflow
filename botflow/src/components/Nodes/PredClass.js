import React, { useCallback, useState } from 'react';
import { Handle, Position } from 'reactflow';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function FileSelectorNode({ id, data, isConnectable, onFileSelect }) {
    const [fileName, setFileName] = useState('');

    const onFileChange = useCallback((evt) => {
        const file = evt.target.files[0];
        if (file) {
            setFileName(file.name);
            if (onFileSelect) {
                onFileSelect(id, file); // Communicate the file back to the parent
            }
        }
    }, [onFileSelect]);

    const fileInputId = `class-file-input-${id}`;

    return (
        <div className="file-selector-node">
            <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
            <div className="file-input-container">
                <label htmlFor={fileInputId} className="file-input-label">{data.label}</label>
                <input 
                    type="file"
                    id={fileInputId}
                    name="file"
                    onChange={onFileChange}
                    className="nodrag file-input"
                    style={{ display: 'none' }} // Hide the actual file input
                />
                <label htmlFor={fileInputId} className='numbers'>Please select an audio file (optional)</label>
                <Button 
                    className="file-select-button" 
                    onClick={() => document.getElementById(fileInputId).click()} 
                    variant="contained" 
                    startIcon={<CloudUploadIcon />}>
                    Upload file
                </Button>
     <div className="file-name-display">{data.fileName}</div>
            </div>
            <Handle type="source" position={Position.Bottom} id="b" isConnectable={isConnectable} />
        </div>
    );
}

export default FileSelectorNode;
