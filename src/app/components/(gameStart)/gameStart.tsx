'use client'

import React from 'react'
import styled from 'styled-components'

const GameStartPanel = styled.div`
  position: absolute;
  top: 10px;
  display: inline-block;
  border: 4px solid red;
  text-align: center;
  background-color: #232451;
  padding: 2px;
`;

const GameStartText = styled.div`
  border: 8px solid blue;
  color: white;
  text-align: center;
  padding: 2px 24px;
  font-size: 24px;
  line-height: 24px;
`;

const GameStart: React.FC = () => {
  return (
    <GameStartPanel>
      <GameStartText>PUSH 1 TO PLAY</GameStartText>
    </GameStartPanel>
  );

}
export default GameStart;