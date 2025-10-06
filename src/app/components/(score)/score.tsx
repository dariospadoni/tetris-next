'use client'

import React from 'react'
import styled from 'styled-components'

// Styled Components
const ScoreContainer = styled.div`
  background-color: #242554;
  padding: 5px;
  color: #ff0000;
  display: grid;
  column-gap: 20px;
  grid-template-columns: 1fr 1fr;
  font-size: 24px;
  line-height: 24px;
  border-width: 5px;
  border-style: inset;
  border-top-color: #242554;
  border-bottom-color: #d9d9fd;  
`;

// Props interface
interface ScoreProps {
  score: number
  numLines: number
}

// Score Component
const Score: React.FC<ScoreProps> = ({ 
  score = 0, 
  numLines = 0, 
}) => {
  return (
    <ScoreContainer>
      <span>SCORE</span>
      <span>{score}</span>
      <span>LINES</span>
      <span>{numLines}</span>
    </ScoreContainer>
  )
}

export default Score
