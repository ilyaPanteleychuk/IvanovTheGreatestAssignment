import StudentPage from 'pages/student';
import React from 'react';

import PageContainer from './components/PageContainer';

const Student = (props) => {
  return (
    <PageContainer>
      <StudentPage {...props} />
    </PageContainer>
  );
};

export default Student;
