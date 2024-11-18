import React, { useState } from 'react';
import styled from 'styled-components';


const MenuBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: green;
  padding: 0.25rem;
  color: white;
  font-size: 9.5rem;
`;

const MenuItem = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 0.25rem;
  font-size: 24px;  /* Increased font size */
  &:hover {
    background-color: green;
  }
`;

const UploadButton = styled.label`
  background-color: blue;
  color: white;
  padding: 0.25rem 1rem;
  cursor: pointer;
  border-radius: 5px;
  display: inline-block;
  font-size: 14px;
  text-align: center;

  &:hover {
    background-color: black;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  margin-top: 5px;
  padding: 0.25rem;
  background-color: #f4f4f4;
  border-radius: 5px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.25rem;
  border-bottom: 1px solid #ddd;
  font-weight: bold;
`;

const TableColumn = styled.div`
  flex: 1;
  text-align: center;
  padding: 3px;
  font-size: 12px;
  border-right: 1px solid #ddd;

  &:last-child {
    border-right: none;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const Preview = styled.div`
  margin-top: 5px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

const NoFileMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
  margin-top: 20px;
`;

function AssemblerPage() {
  const [files, setFiles] = useState([]);
  const [sinoCounter, setSinoCounter] = useState(1); 
  const uploadedBy = "User1";

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      fileName: file.name,
      uploadDate: new Date().toLocaleString(),
      sino: sinoCounter, 
      fileData: URL.createObjectURL(file),
      type: file.type,
      lastModifiedBy: uploadedBy,
      lastModifiedOn: new Date().toLocaleString()
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    setSinoCounter(prevCounter => prevCounter + newFiles.length);
  };

  const openFileInNewTab = (fileData, fileName, uploadDate, sino) => {
    const fileWindow = window.open();
    fileWindow.document.write(`
      <html>
        <head><title>Uploaded File</title></head>
        <body>
          <h1>Uploaded File: ${fileName}</h1>
          <p><strong>SINO:</strong> ${sino}</p>
          <p><strong>Upload Date:</strong> ${uploadDate}</p>
          <hr />
          <h3>View File</h3>
          <embed src="${fileData}" width="100%" height="600px" />
        </body>
      </html>
    `);
    fileWindow.document.close();
  };

  return (
    <div>
      <MenuBarWrapper>
        <MenuItem>Assembler</MenuItem>
      </MenuBarWrapper>

      <div style={{ padding: '1rem' }}>
        {/* Upload button centered */}
        <UploadContainer>
          <UploadButton htmlFor="fileInput">
            Upload
            <FileInput type="file" id="fileInput" onChange={handleFileUpload} multiple />
          </UploadButton>
        </UploadContainer>

                {files.length === 0 && (
          <NoFileMessage>File not found</NoFileMessage>
        )}

                {files.length > 0 && (
          <FileInfo>
            <div style={{ marginBottom: '10px' }}>
              <TableWrapper>
                <TableColumn><strong>SINO</strong></TableColumn>
                <TableColumn><strong>File Name</strong></TableColumn>
                <TableColumn><strong>Last Modified By</strong></TableColumn>
                <TableColumn><strong>Last Modified On</strong></TableColumn>
                <TableColumn><strong>View Source Code</strong></TableColumn>
              </TableWrapper>
              {files.map((file, index) => (
                <TableWrapper key={index}>
                  <TableColumn>{file.sino}</TableColumn>
                  <TableColumn>{file.fileName}</TableColumn>
                  <TableColumn>{file.lastModifiedBy}</TableColumn>
                  <TableColumn>{file.lastModifiedOn}</TableColumn>
                  <TableColumn>
                    <button onClick={() => openFileInNewTab(file.fileData, file.fileName, file.uploadDate, file.sino)}>
                      View
                    </button>
                  </TableColumn>
                </TableWrapper>
              ))}
            </div>
          </FileInfo>
        )}

        
        {files.length > 0 && files.map((file, index) => (
          file.type.startsWith('image') && (
            <Preview key={index}>
              <h3>Image Preview:</h3>
              <ImagePreview src={file.fileData} alt="File preview" />
            </Preview>
          )
        ))}
      </div>
    </div>
  );
}

export default AseemblerPage;
