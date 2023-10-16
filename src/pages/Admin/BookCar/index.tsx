import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import BookCarForm from './components/BookCarForm';
import BookCarList from './components/BookCarList';

const BookCar: React.FC = () => {
  return (
    <PageContainer>
      <BookCarList />
      <BookCarForm />
    </PageContainer>
  );
};

export default BookCar;
