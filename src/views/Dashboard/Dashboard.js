import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import moment from 'moment/moment';
import Page from '../../components/Page';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import IconButton from '../../components/IconButton';
import ExchangeCard from '../Bond/components/ExchangeCard';

import ProgressCountdown from '../Boardroom/components/ProgressCountdown';
import CardContainer from './components/CardContainer';

//Style
import styled, { createGlobalStyle } from 'styled-components';
import { Box, CardHeader, CardContent, Grid } from '@material-ui/core';

//Icons
import MetamaskFox from '../../assets/img/metamask-fox.svg';
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

//Bomb farm Import
import { getDisplayBalance } from '../../utils/formatBalance';
import useTotalStakedOnBoardroom from '../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../hooks/useStakedBalanceOnBoardroom';
import useHarvestFromBoardroom from '../../hooks/useHarvestFromBoardroom';
import useStakedTokenPriceInDollars from '../../hooks/useStakedTokenPriceInDollars';
import useBombFinance from '../../hooks/useBombFinance';
import useFetchBoardroomAPR from '../../hooks/useFetchBoardroomAPR';

//Bombfarm
import BombfarmBNB from './components/BombfarmsBNB';
import BombfarmBTCB from './components/BombfarmBTCB';

import useStakeToBoardroom from '../../hooks/useStakeToBoardroom';
import useTokenBalance from '../../hooks/useTokenBalance';

import useClaimRewardCheck from '../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../hooks/boardroom/useWithdrawCheck';
import useRedeemOnBoardroom from '../../hooks/useRedeemOnBoardroom';

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
      name: 'BOMB',
      current: bombCurrentSupply,
      total: bombTotalSupply,
      price: `${bombPriceDollars} ${bombPriceBNB} BTCB`,
    },
    {
      name: 'BSHARE',
      current: bShareCurrentSupply,
      total: bShareTotalSupply,
      price: `${bSharePriceDollars} ${bSharePriceBNB} BTCB`,
    },
    {
      name: 'BBond',
      current: bBondCurrentSupply,
      total: bBondTotalSupply,
      price: `${bBondPriceDollars} ${bBondPriceBNB} BTCB`,
    },
  ];

  const tStaked = useTotalStakedOnBoardroom();
  const totalStaked = getDisplayBalance(tStaked);
  const stakBalance = useStakedBalanceOnBoardroom();
  const stakedBalance = getDisplayBalance(stakBalance);
  const earnings = useEarningsOnBoardroom();
  const totalEarning = getDisplayBalance(earnings);
  const earnedInDollars = (Number(bombPriceDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const onRedeem = useRedeemOnBoardroom();
  const harvestBoardroom = useHarvestFromBoardroom();
  const boardroomAPR = (useFetchBoardroomAPR() / 365).toFixed(2);
  const { onStake } = useStakeToBoardroom();
  const bombFinance = useBombFinance();

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isClaim, setIsClaim] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const onDeposit = useCallback(async () => {
    if (isDeposit) return;
    setIsDeposit(true);
    onStake(1);
    setIsDeposit(false);
  }, [isDeposit]);

  const onWithdraw = useCallback(async () => {
    if (isWithdraw) return;
    setIsWithdraw(true);
    onRedeem();
    setIsWithdraw(false);
  }, [isWithdraw]);

  const onClaim = useCallback(async () => {
    if (isClaim) return;
    setIsClaim(true);
    harvestBoardroom();
    setIsClaim(false);
  }, [isClaim]);

  const addToken = useCallback(async () => {
    if (isClick) return;
    setIsClick(true);
    bombFinance.watchAssetInMetamask('BOMB');
    setIsClick(false);
  }, [isClick]);

  // console.log(handleStack(2.00));
  // console.log(canClaimReward)
  // console.log(canWithdraw)
  // console.log(stakedBalance )
  const bondBalance = useTokenBalance(bombFinance?.BBOND);

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

                      {bombFinanceSummaryTable.map((data, name) => (
                        <tr style={{ textAlign: 'center' }} key={name}>
                          <td>${data.name}</td>
                          <td>${data.current}</td>
                          <td>${data.total}</td>
                          <td>${data.price} </td>
                          <td>
                            <img src={MetamaskFox} onClick={addToken} alt="" />
                          </td>
                        </tr>
                      ))}
                    </table>
                    <StyledThinLine></StyledThinLine>
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
                    <a
                      style={{ color: 'black', textDecoration: 'none' }}
                      rel="noopener noreferrer"
                      href="http://discord.bomb.money/"
                      target="_blank"
                    >
                      Chat on Discord
                    </a>
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
                    <a
                      style={{ color: 'black', textDecoration: 'none' }}
                      rel="noopener noreferrer"
                      href="https://docs.bomb.money/"
                      target="_blank"
                    >
                      Read Docs
                    </a>
                  </StyledCustomBtn>
                </Grid>
              </Grid>

              <CardContainer>
                <StyledWrapper>
                  <StyledWrapper>
                    <img src={bombBitcoin} style={{ width: '40px' }} />
                    <p style={{ marginLeft: '6px', marginRight: '6px' }}>BOMB-BTCB </p>
                    <Tag>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bolder',
                          height: 'fit-content',
                        }}
                      >
                        Recommended
                      </p>
                    </Tag>
                  </StyledWrapper>

                  <p>TVL: {TVL}</p>
                </StyledWrapper>
                &nbsp; &nbsp; &nbsp; &nbsp; Stake BSHARE and earn BOMB every epoch
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
                  <small>{totalStaked}</small>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={2}>
                    <small>Daily Returns:</small>
                    <p>{boardroomAPR}%</p>
                  </Grid>
                  <Grid item xs={2}>
                    <small>Your Stake</small>
                    <p>{stakedBalance} </p>
                    <p> {`≈ $${stakedBalance * bSharePriceDollars}`}</p>
                  </Grid>
                  <Grid item xs={3}>
                    <small>Earned</small>
                    <p>{totalEarning} </p>
                    <p>{earnedInDollars}</p>
                  </Grid>
                  <Grid item xs={5}>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Button text="Deposit" onClick={onDeposit} size="sm" />
                      </Grid>
                      <Grid item xs={6}>
                        <Button
                          disabled={stakBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                          onClick={onWithdraw}
                          size="sm"
                          text="Withdraw"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          disabled={stakBalance.eq(0) || !canClaimReward}
                          onClick={onClaim}
                          size="sm"
                          text="Claim Reward"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContainer>
            </Grid>
            <Grid item xs={5}>
              <CardContainer>
                <div style={{ height: '306px' }}>
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
                    <Button text="Claim all" size="sm" />
                  </div>
                </StyledWrapper>

                <CardContent>
                  <BombfarmBTCB />
                  <BombfarmBNB />
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
                    <p>{Number(BBondStats?.tokenInFtm).toFixed(4)} BTCB</p>
                  </Grid>
                  <Grid item xs={3}>
                    <span>Available to redeem: </span>
                    <p>{`${getDisplayBalance(bondBalance)}`}</p>
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
