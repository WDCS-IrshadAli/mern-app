import React from 'react'

interface myButtonProps {
    children: string;
    onClick?: () => void;
}

const Button: React.FC<myButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick}>{children}</button>
  )
}

export default Button
