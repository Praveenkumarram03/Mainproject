import React, { useState, useEffect } from "react";
import { FaBars, FaCogs, FaTh } from "react-icons/fa";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";

// Styled Components
const SidebarContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Sidebar = styled.div`
  width: ${(props) => (props.isOpen ? "240px" : "60px")};
  background-color: green;
  color: white;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`;

const BarsIcon = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    transform: rotate(90deg);
  }
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #4caf50;
    transform: translateX(10px);
  }
  &.active {
    background-color: #4caf50;
  }
`;

const Icon = styled.div`
  font-size: 1.4rem;
  margin-right: ${(props) => (props.isOpen ? "20px" : "0")};
`;

const LinkText = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MainContent = styled.main`
  margin-left: ${(props) => (props.isOpen ? "240px" : "60px")};
  padding: 20px;
  width: 100%;
`;

const FileUploadWrapper = styled.div`
  padding: 20px;
`;

const UploadButton = styled.label`
  background-color: blue;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: black;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f4f4f4;
  border-radius: 5px;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  border-bottom: 1px solid #ddd;
`;

const TableColumn = styled.div`
  flex: 1;
  text-align: center;
`;

const NoFileMessage = styled.div`
  text-align: center;
  font-size: 16px;
  color: #888;
`;

// Components
const FileUpload = ({ title }) => {
  const [files, setFiles] = useState([]);
  const [sinoCounter, setSinoCounter] = useState(1);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map((file) => ({
      sino: sinoCounter++,
      fileName: file.name,
      uploadDate: new Date().toLocaleString(),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setSinoCounter(sinoCounter);
  };

  return (
    <FileUploadWrapper>
      <h1>{title}</h1>
      <UploadButton htmlFor="fileInput">Upload File</UploadButton>
      <FileInput
        id="fileInput"
        type="file"
        onChange={handleFileUpload}
        multiple
      />
      {files.length === 0 ? (
        <NoFileMessage>No files uploaded.</NoFileMessage>
      ) : (
        <FileInfo>
          <TableWrapper>
            <TableColumn><strong>SINO</strong></TableColumn>
            <TableColumn><strong>File Name</strong></TableColumn>
            <TableColumn><strong>Upload Date</strong></TableColumn>
          </TableWrapper>
          {files.map((file, index) => (
            <TableWrapper key={index}>
              <TableColumn>{file.sino}</TableColumn>
              <TableColumn>{file.fileName}</TableColumn>
              <TableColumn>{file.uploadDate}</TableColumn>
            </TableWrapper>
          ))}
        </FileInfo>
      )}
    </FileUploadWrapper>
  );
};

const SidebarPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { path: "/assembler", name: "Assembler", icon: <FaTh /> },
    { path: "/cobol", name: "Cobol", icon: <FaTh /> },
    { path: "/java", name: "Java", icon: <FaTh /> },
    { path: "/settings", name: "Settings", icon: <FaCogs /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContainer>
      <Sidebar isOpen={isOpen}>
        <TopSection>
          <BarsIcon onClick={toggleSidebar}>
            <FaBars />
          </BarsIcon>
        </TopSection>
        {menuItems.map((item, index) => (
          <MenuLink to={item.path} key={index}>
            <Icon isOpen={isOpen}>{item.icon}</Icon>
            <LinkText isOpen={isOpen}>{item.name}</LinkText>
          </MenuLink>
        ))}
      </Sidebar>
      <MainContent isOpen={isOpen}>
        <Routes>
          <Route path="/assembler" element={<FileUpload title="Assembler" />} />
          <Route path="/cobol" element={<FileUpload title="Cobol" />} />
          <Route path="/java" element={<FileUpload title="Java" />} />
          <Route path="/settings" element={<div>Settings</div>} />
          <Route path="/" element={<div>Welcome Home</div>} />
        </Routes>
      </MainContent>
    </SidebarContainer>
  );
};

export default SidebarPage;
