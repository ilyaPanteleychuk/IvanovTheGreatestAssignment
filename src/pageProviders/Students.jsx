import StudentsPage from 'pages/students';
import React from 'react';
import PageContainer from './components/PageContainer';


const Students = (props) => {
  return (
    <PageContainer>
      <StudentsPage {...props} />
    </PageContainer>
  );
};

export default Students;
