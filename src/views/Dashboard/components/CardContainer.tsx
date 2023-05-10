import React from 'react';
import {Card} from '@material-ui/core';

interface CardContainerProps {
    children?: React.ReactNode;
}

const CardContainer: React.FC<CardContainerProps> = ({children}) => <Card variant="outlined"
                                                                          style={{
                                                                              background: 'rgba(35, 40, 75, 0.75)',
                                                                              borderColor: '#728CDF',
                                                                              padding: '12px'
                                                                          }}>{children}</Card>;

export default CardContainer;

