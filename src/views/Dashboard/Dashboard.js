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
import { Box, CardHeader, CardContent, Grid } from '@material-ui/core';

//Icons
import bomb from '../../assets/img/bbond-256.png';
import discordIcon from '../../assets/img/discord.svg';
import readDocsIcon from '../../assets/img/bnb.png';
import bombBitcoin from '../../assets/img/bomb-bitcoin-LP.png';

// import stats
import useBombStats from '../../hooks/useBombStats';
import usebShareStats from '../../hooks/usebShareStats';
import useBondStats from '../../hooks/useBondStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';


//Bombfarm
import Bombfarms from './components/Bombfarms';

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
  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  const lastSwap = scalingFactor;

  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const BBondStats = useBondStats();

//   console.log(bombStats);
//   console.log(bShareStats);

  //bomb Table Stats
  const bombPriceBNB = useMemo(() => (bombStats ? Number(bombStats.tokenInFtm).toFixed(4) : ''), [bombStats]);
  const bombPriceDollars = useMemo(() => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null), [bombStats]);
  const bombCurrentSupply = useMemo(() => (bombStats ? String(bombStats.circulatingSupply) : null), [bombStats]);
  const bombTotalSupply = useMemo(() => (bombStats ? String(bombStats.totalSupply) : null), [bombStats]);

  //bBond Table Stats
  const bBondPriceBNB = useMemo(() => (BBondStats ? Number(BBondStats.tokenInFtm).toFixed(4) : null), [BBondStats]);
  const bBondPriceDollars = useMemo(
    () => (BBondStats ? Number(BBondStats.priceInDollars).toFixed(2) : null),
    [BBondStats],
  );
  const bBondCurrentSupply = useMemo(() => (BBondStats ? String(BBondStats.circulatingSupply) : null), [BBondStats]);
  const bBondTotalSupply = useMemo(() => (BBondStats ? String(BBondStats.totalSupply) : null), [bShareStats]);

  //bShare Table Stats
  const bSharePriceBNB = useMemo(() => (bShareStats ? Number(bShareStats.tokenInFtm).toFixed(4) : null), [bShareStats]);
  const bSharePriceDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );
  const bShareCurrentSupply = useMemo(
    () => (bShareStats ? String(bShareStats.circulatingSupply) : null),
    [bShareStats],
  );
  const bShareTotalSupply = useMemo(() => (bShareStats ? String(bShareStats.totalSupply) : null), [bShareStats]);

  const TVL = useTotalValueLocked();
  const currentEpoch = Number(useCurrentEpoch());
  

  const bombFinanceSummaryTable = [
    {
      name: '$BOMB',
      current: bombCurrentSupply,
      total: bombTotalSupply,
      price: `$${bombPriceDollars} ${bombPriceBNB} BTCB`,
    },
    {
      name: '$BSHARE',
      current: bShareCurrentSupply,
      total: bShareTotalSupply,
      price: `$${bSharePriceDollars} ${bSharePriceBNB} BTCB`,
    },
    {
      name: '$BBond',
      current: bBondCurrentSupply,
      total: bBondTotalSupply,
      price: `$${bBondPriceDollars} ${bBondPriceBNB} BTCB`,
    },
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
                    <StyledThinLine></StyledThinLine>
                    {/* <div
                      style={{
                        height: '0.5px',
                        width: '98%',
                        marginLeft: '32px',
                        background: 'rgba(195, 197, 203, 0.75)',
                      }}
                    ></div> */}
                  </Grid>
                  <Grid item xs={2}>
                    <div style={{ alignItems: 'end', textAlign: 'center', marginTop: '4px' }}>
                      <p>Current Epoch</p>
                      <p variant="h4" style={{ color: '#ffffff' }}>
                        {currentEpoch}
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
                        deadline={to}
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
                        <small style={{ color: '#00E8A2' }}>{scalingFactor}</small>
                      </p>
                      <p>
                        <small>TVL:</small>
                        <small style={{ color: '#00E8A2' }}>{TVL}</small>
                      </p>
                      <p>
                        <small>Last Epoch TWAP:</small>
                        <small style={{ color: '#00E8A2' }}>{lastSwap}</small>
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
                <Button text="Invest Now" size="sm" />
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

            <Grid item xs={12}>
              <CardContainer>
                <StyledWrapper>
                  <div>
                    <p>Bomb Farms</p>
                    <p>
                      <small> Stake your LP tokens in our farms to start earning $BSHARE</small>
                    </p>
                  </div>
                  <div>
                    <Button text="Purchase" size="sm" />
                  </div>
                </StyledWrapper>

                <CardContent>
                  <Bombfarms />
                </CardContent>
              </CardContainer>
            </Grid>

            <Grid item xs={12}>
              <CardContainer>
                <CardHeader
                  avatar={<img src={bomb} style={{ objectFit: 'contain', width: '42px' }} />}
                  title="Bonds"
                  subheader="BBOND can be purchased only on contraction periods, when TWAP of BOMB is below 1"
                />
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <span>Current Price: (Bomb)^2</span>
                    <p>BBond = 6.2872 BTCB</p>
                  </Grid>
                  <Grid item xs={3}>
                    <span>Available to redeem: </span>
                    <p>456</p>
                  </Grid>
                  <Grid item xs={5}>
                    <div>
                      <StyledWrapper>
                        <div>
                          <p>Purchase BBond</p>
                          <p>Bomb is over peg</p>
                        </div>
                        <div>
                          <Button disabled={true} text="Purchase" size="sm" />
                        </div>
                      </StyledWrapper>
                      <StyledThinLine></StyledThinLine>
                      <StyledWrapper>
                        <div>
                          <p>Redeem Bomb</p>
                        </div>
                        <div>
                          <Button text="Claim All" size="sm" />
                        </div>
                      </StyledWrapper>
                    </div>
                  </Grid>
                </Grid>
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
  height: 30px;
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
