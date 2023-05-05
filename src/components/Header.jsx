import React from 'react';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const Header = function () {
  return (
    <div className="heading-container">
      <button onClick={() => window.location.reload()}>
        <TextSnippetIcon sx={{ fontSize: 50 }} />
      </button>
      <h1>TaskMate</h1>
    </div>
  );
};

export default Header;
