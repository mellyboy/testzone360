import React from 'react';
import { CFooter } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cibGithub } from '@coreui/icons';

const AppFooter = () => {
  return (
    <CFooter className="px-4 d-flex justify-content-center">
      <div>
        <span className="me-1">
          <CIcon icon={cibGithub} />
        </span>
        <a href="#" target="_blank" rel="noopener noreferrer">
          TestZone360
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
