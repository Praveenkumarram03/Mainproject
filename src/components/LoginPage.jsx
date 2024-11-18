import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #3b3f47, #1e2125);
`;

const LoginWrapper = styled.div`
  background-color: #ffffff;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #333;
  box-sizing: border-box;
`;

const InputField = styled.input`
  width: 95%;
  padding: 0.85rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border 0.3s ease-in-out;
  margin-bottom: 1.5rem;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const PasswordInput = styled.input`
  width: 95%;
  padding: 0.85rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: border 0.3s ease-in-out;

  &:focus {
    border-color: #3498db;
    outline: none;
  }
`;

const EyeIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
 
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  width: 80%;
  padding: 0.85rem;
  background-color: green;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2e8b57;
  }
`;

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      console.log('User logged in');
      navigate('/main'); 
    } else {
      alert('Please enter a valid 10-digit mobile number');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <LoginContainer>
      <LoginWrapper>
        <form onSubmit={handleSubmit}>
          <h3>WELCOME LoginPage</h3>

          <div>
            <label htmlFor="MobileNumber">Mobile Number</label>
            <InputField 
              type="text" 
              placeholder="Enter Mobile Number" 
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required 
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <PasswordWrapper>
              <PasswordInput
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
             
            </PasswordWrapper>
          </div>

          <div>
            <SubmitButton type="submit">Login</SubmitButton>
          </div>
        </form>
      </LoginWrapper>
    </LoginContainer>
  );
}

export default LoginPage;
