import React from 'react';
import { Link } from 'react-router-dom';

function Td({ children, to }) {
  const ContentTag = to ? Link : 'div';

  return (
    <td>
      <ContentTag to={to}>{children}</ContentTag>
    </td>
  )
}

export default Td;