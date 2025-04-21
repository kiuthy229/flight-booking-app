import React from 'react'

interface SubtitleProps {
  subtitle: string
}

const Subtitle: React.FC<SubtitleProps> = ({ subtitle }) => {
  return <div className="section__subtitle">{subtitle}</div>
}

export default Subtitle
