import React, { useEffect, useMemo, useRef } from 'react';
import moment from 'moment/moment';
import Page from '../../components/Page';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import CardContainer from './components/CardContainer';

//Style
import styled, { createGlobalStyle } from 'styled-components';
import { Box, CardHeader, Grid } from '@material-ui/core';

//Icons
import bomb from '../../assets/img/bbond-256.png';
import discordIcon from '../../assets/img/discord.svg';
import readDocsIcon from '../../assets/img/bnb.png';
import bombBitcoin from '../../assets/img/bomb-bitcoin-LP.png';

//Background image
import BgImage from '../../assets/img/background.jpg';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BgImage}) repeat !important;
    background-size: cover !important;
    background-color: #0C1125 !important;
  }
`;
const TITLE = 'Dashboard';

const Dashboard = () => {
  const bombFinanceSummaryTable = [
    {
      name: '$BOMB',
      current: '11.4k',
      total: '60.9k',
      price: '$0.24',
    },
    { name: '$BSHARE', current: '11.43k', total: '8.49m', price: '0.24' },
    { name: '$BBOND', current: '20.00k', total: '175k', price: '0.2B' },
  ];

  return (
    <>
      <Page>
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>
        <BackgroundImage />
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CardContainer>
                <p style={{ color: '#ffffff', textAlign: 'center' }}>Bomb Finance Summary</p>
                <StyledThinLine></StyledThinLine>

                <Grid container spacing={2}>
                  <Grid item xs={10}>
                    <table style={{ width: '50%', height: '100%' }}>
                      <tr>
                        <th></th>
                        <th>
                          <small>Current supply</small>
                        </th>
                        <th>
                          <small>Total supply</small>
                        </th>
                        <th>
                          <small>Price</small>
                        </th>
                      </tr>

                      {bombFinanceSummaryTable.map((data) => (
                        <tr style={{ textAlign: 'center' }}>
                          <td>{data.name}</td>
                          <td>{data.current}</td>
                          <td>{data.total}</td>
                          <td>{data.price}</td>
                        </tr>
                      ))}
                    </table>
                    <div
                      style={{
                        height: '0.5px',
                        width: '98%',
                        marginLeft: '32px',
                        background: 'rgba(195, 197, 203, 0.75)',
                      }}
                    ></div>
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ alignItems: 'end', textAlign: 'center', marginTop: '4px' }}>
                      <p>Current Epoch</p>
                      <p variant="h4" style={{ color: '#ffffff' }}>
                        258
                      </p>
                      <div
                        style={{
                          height: '0.5px',
                          width: '100%',
                          background: 'rgba(195, 197, 203, 0.75)',
                        }}
                      ></div>
                      <ProgressCountdown
                        base={moment().toDate()}
                        hideBar={true}
                        deadline={moment().toDate()}
                        description="Next Epoch"
                      />
                      <p>Next Epoch in</p>
                      <div
                        style={{
                          height: '0.5px',
                          width: '100%',
                          background: 'rgba(195, 197, 203, 0.75)',
                        }}
                      ></div>
                      <p>
                        <small>Live TWAP:</small>
                        <small style={{ color: '#00E8A2' }}>2</small>
                      </p>
                      <p>
                        <small style={{ color: '#00E8A2' }}>TVL:5000</small>
                      </p>
                      <p>
                        <small>Last Epoch TWAP:</small>
                        <small style={{ color: '#00E8A2' }}>1.222</small>
                      </p>
                    </div>
                  </Grid>
                </Grid>
              </CardContainer>
            </Grid>

            <Grid item xs={7}>
              <Link to="/">
                <a style={{ textAlign: 'end', textDecoration: 'underline', color: '#9EE6FF' }}>
                  Read Investment Strategy{'>'}
                </a>
              </Link>
              <p>
                <Button text="Invest Now" size="lg" />
              </p>
              <Grid container spacing={2} style={{ marginBottom: '4px' }}>
                <Grid item xs={6}>
                  <StyledCustomBtn>
                    <img
                      style={{ background: '#ffffff', borderRadius: '62px', marginRight: '12px' }}
                      src={discordIcon}
                    />
                    <p>Chat on Discord</p>
                  </StyledCustomBtn>
                </Grid>
                <Grid item xs={6}>
                  <StyledCustomBtn>
                    <img
                      style={{
                        background: '#ffffff',
                        borderRadius: '62px',
                        marginRight: '12px',
                        height: '20px',
                        padding: '3px',
                      }}
                      src={readDocsIcon}
                    />
                    <p>Read Docs</p>
                  </StyledCustomBtn>
                </Grid>
              </Grid>

              <CardContainer>
                <StyledWrapper>
                  <StyledWrapper>
                    <img src={bombBitcoin} style={{ width: '32px' }} />
                    <p style={{ marginLeft: '6px', marginRight: '6px' }}>BOMB-BTCB </p>
                    <Tag>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bolder',
                        }}
                      >
                        Recommended
                      </p>
                    </Tag>
                  </StyledWrapper>

                  <p>TVL:gsjhdgsjhgdjhsga</p>
                </StyledWrapper>
                <div
                  style={{
                    height: '0.5px',
                    width: '95%',
                    marginLeft: '32px',
                    background: 'rgba(195, 197, 203, 0.75)',
                  }}
                ></div>
                <div
                  style={{
                    textAlign: 'end',
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                  }}
                >
                  <small>Total Stacked:</small>
                  <img src={bombBitcoin} style={{ width: '32px' }} />
                  <small>4563</small>
                </div>

                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <small>Daily Returns:</small>
                    <p>2%</p>
                  </Grid>
                  <Grid item xs={2}>
                    <small>Daily Returns:</small>
                    <p>2%</p>
                  </Grid>
                  <Grid item xs={3}>
                    <small>Daily Returns:</small>
                    <p>2%</p>
                  </Grid>
                  <Grid item xs={5}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button text="Deposit" size="sm" />
                      </Grid>
                      <Grid item xs={6}>
                        <Button text="Withdraw" size="sm" />
                      </Grid>
                      <Grid item xs={12}>
                        <Button text="Claim Reward" size="sm" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContainer>
            </Grid>
            <Grid item xs={5}>
              <CardContainer>
                <div style={{ height: '274px' }}>
                  <p>Latest News</p>
                </div>
              </CardContainer>
            </Grid>
          </Grid>
        </Box>
      </Page>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledThinLine = styled.div`
  height: 0.5px;
  width: 100%;
  background: rgba(195, 197, 203, 0.75);
`;
const StyledCustomBtn = styled.div`
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #728cdf;
`;
const Tag = styled.div`
  padding: 2px 5px;
  background: rgba(0, 232, 162, 0.5);
  border-radius: 3px;
`;

export default Dashboard;
