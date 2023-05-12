import React, {  useState, useMemo, useCallback } from 'react';
import moment from 'moment/moment';

import ProgressCountdown from '../../Boardroom/components/ProgressCountdown';
import CardContainer from './CardContainer';
//Style
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
//Icons
import MetamaskFox from '../../../assets/img/metamask-fox.svg';

// import stats
import useBombStats from '../../../hooks/useBombStats';
import usebShareStats from '../../../hooks/usebShareStats';
import useBondStats from '../../../hooks/useBondStats';
import useTotalValueLocked from '../../../hooks/useTotalValueLocked';
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useTreasuryAllocationTimes from '../../../hooks/useTreasuryAllocationTimes';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';

import useBombFinance from '../../../hooks/useBombFinance';



const BombFinanceSummary = () => {
  const cashStat = useCashPriceInEstimatedTWAP();
  const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
  const { to } = useTreasuryAllocationTimes();

  const lastSwap = scalingFactor;

  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const BBondStats = useBondStats();

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

  // Bomb table summary Data
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

  const bombFinance = useBombFinance();

  const [isClickMetamaskFox, setIsClickMetamaskFox] = useState(false);

  const addToken = useCallback(async () => {
    if (isClickMetamaskFox) return;
    setIsClickMetamaskFox(true);
    bombFinance.watchAssetInMetamask('BOMB');
    setIsClickMetamaskFox(false);
  }, [isClickMetamaskFox]);

  return (
    <>
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
              <p style={{ color: '#ffffff' }}>{currentEpoch}</p>
              <div
                style={{
                  height: '0.5px',
                  width: '100%',
                  background: 'rgba(195, 197, 203, 0.75)',
                }}
              ></div>
              <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to} description="Next Epoch" />
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
    </>
  );
};

const StyledThinLine = styled.div`
  height: 0.5px;
  width: 100%;
  background: rgba(195, 197, 203, 0.75);
`;

export default BombFinanceSummary;
