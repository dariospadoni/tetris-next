'use client'

import React from 'react'
import styled from 'styled-components'

const GameOverPanel = styled.div`
  position: absolute;
  margin-left: 25px;
  display: inline-block;
  border: 4px solid red;
  text-align: center;
  background-color: #232451;
  padding: 2px;
`;

const GameOverText = styled.div`
  border: 8px solid blue;
  color: white;
  text-align: center;
  padding: 2px 24px;
  font-size: 24px;
  line-height: 24px;
`;

const GameOver: React.FC = () => 
  <GameOverPanel>
    <GameOverText>GAME<br/>OVER</GameOverText>
  </GameOverPanel>

export default GameOver;