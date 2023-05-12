import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';

import Button from '../../../components/Button';
import CardContainer from './CardContainer';
//Style
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
//Icons
import bombBitcoin from '../../../assets/img/bomb-bitcoin-LP.png';
// import stats
import useBombStats from '../../../hooks/useBombStats';

import useTotalValueLocked from '../../../hooks/useTotalValueLocked';

//Bomb farm Import
import { getDisplayBalance } from '../../../utils/formatBalance';
import useTotalStakedOnBoardroom from '../../../hooks/useTotalStakedOnBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';

import useFetchBoardroomAPR from '../../../hooks/useFetchBoardroomAPR';

import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import usebShareStats from '../../../hooks/usebShareStats';

import useClaimRewardCheck from '../../../hooks/boardroom/useClaimRewardCheck';
import useWithdrawCheck from '../../../hooks/boardroom/useWithdrawCheck';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';

const BoardroomCard= () => {
  const bombStats = useBombStats();
  const bShareStats = usebShareStats();
  const bombPriceDollars = useMemo(() => (bombStats ? Number(bombStats.priceInDollars).toFixed(2) : null), [bombStats]);

  const tStaked = useTotalStakedOnBoardroom();
  const totalStaked = getDisplayBalance(tStaked);
  const stakBalance = useStakedBalanceOnBoardroom();
  const stakedBalance = getDisplayBalance(stakBalance);
  const earnings = useEarningsOnBoardroom();
  const totalEarning = getDisplayBalance(earnings);
  const earnedInDollars = (Number(bombPriceDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

  const bSharePriceDollars = useMemo(
    () => (bShareStats ? Number(bShareStats.priceInDollars).toFixed(2) : null),
    [bShareStats],
  );

  const canClaimReward = useClaimRewardCheck();
  const canWithdraw = useWithdrawCheck();
  const onRedeem = useRedeemOnBoardroom();
  const onWithdraw =useWithdrawFromBoardroom();
  const harvestBoardroom = useHarvestFromBoardroom();
  const boardroomAPR = (useFetchBoardroomAPR() / 365).toFixed(2);
  const { onStake } = useStakeToBoardroom();

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isClaim, setIsClaim] = useState(false);

  const depositFromBoardroom = useCallback(async () => {
    if (isDeposit) return;
    setIsDeposit(true);
    onStake('1');
    setIsDeposit(false);
  }, [isDeposit]);

  const withdrawFromBoardroom = useCallback(async () => {
    if (isWithdraw) return;
    setIsWithdraw(true);
    // onRedeem();
    onWithdraw("1")
    setIsWithdraw(false);
  }, [isWithdraw]);

  const claimFromBoardroom = useCallback(async () => {
    if (isClaim) return;
    setIsClaim(true);
    harvestBoardroom();
    setIsClaim(false);
  }, [isClaim]);

  const TVL = useTotalValueLocked();

  return (
    <>
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
                <Button text="Deposit" onClick={depositFromBoardroom} size="sm" />
              </Grid>
              <Grid item xs={6}>
                <Button
                  disabled={stakBalance.eq(0) || (!canWithdraw && !canClaimReward)}
                  onClick={withdrawFromBoardroom}
                  size="sm"
                  text="Withdraw"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={stakBalance.eq(0) || !canClaimReward}
                  onClick={claimFromBoardroom}
                  size="sm"
                  text="Claim Reward"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContainer>
    </>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Tag = styled.div`
  padding: 2px 5px;
  background: rgba(0, 232, 162, 0.5);
  border-radius: 3px;
`;

export default  BoardroomCard;
