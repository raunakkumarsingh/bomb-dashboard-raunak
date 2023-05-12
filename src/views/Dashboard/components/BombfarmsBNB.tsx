import React, { useMemo, useState, useCallback } from 'react';
import bombBitcoin from '../../../assets/img/bomb-bitcoin-LP.png';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Button from '../../../components/Button';

import useBanks from '../../../hooks/useBanks';
import useShareStats from '../../../hooks/usebShareStats';

import useHarvest from '../../../hooks/useHarvest';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useEarnings from '../../../hooks/useEarnings';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import useStake from '../../../hooks/useStake';
import useRedeem from '../../../hooks/useRedeem';


const Bombfarms = (props: { isClickBNB: any;setIsClickBNB: any }) => {
  const [banks] = useBanks();
  // console.log(banks)
  const bombFarmsStats = useShareStats();
  const bhsarePriceInFarms = useMemo(
    () => (bombFarmsStats ? Number(bombFarmsStats.priceInDollars).toFixed(2) : null),
    [bombFarmsStats],
  );

  // BNB POOL
  let contractBNB = banks.filter((bank) => {
    return bank.contract === 'BshareBnbLPBShareRewardPool' && !bank.finished;
  })[0];
  let bnbPoolStats = useStatsForPool(contractBNB);
  const stakedBalanceBNB = useStakedBalance(contractBNB.contract, contractBNB.poolId);
  const earningsBNB = useEarnings(contractBNB.contract, contractBNB.earnTokenName, contractBNB.poolId);
  const earnedInDollarsBNB = (Number(bhsarePriceInFarms) * Number(getDisplayBalance(earningsBNB))).toFixed(2);

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isClaim, setIsClaim] = useState(false);

  const { onStake } = useStake(contractBNB);
  const { onRedeem } = useRedeem(contractBNB);
  const { onReward } = useHarvest(contractBNB);
  const { onWithdraw } = useWithdraw(contractBNB);

  const onDepositBNB = useCallback(async () => {
    if (isDeposit ) return;
    setIsDeposit(true);
    onStake('1');
    setIsDeposit(false);
  }, [isDeposit]);

  const onWithdrawBNB = useCallback(async () => {
    if (isWithdraw) return;
    setIsWithdraw(true);
    onRedeem();
    setIsWithdraw(false);
  }, [isWithdraw]);

  const onClaimBNB = useCallback(async () => {
    if (isClaim ) return;
    setIsClaim(true);
    onReward();
    setIsClaim(false);
  }, [isClaim]);

  if(props.isClickBNB){
    onReward();
    props.setIsClickBNB(false)
  }

  return (
    <div>
      <StyledWrapper>
        <StyledWrapper>
          <img src={bombBitcoin} style={{ width: '32px' }} />
          <Typography style={{ marginLeft: '6px', marginRight: '6px' }}>BOMB-BNB </Typography>
          <Tag>
            <Typography style={{ fontSize: '12px', fontWeight: 'bolder' }}>Recommended</Typography>
          </Tag>
        </StyledWrapper>

        <Typography>TVL:${bnbPoolStats?.TVL}</Typography>
      </StyledWrapper>

      <div
        style={{
          height: '0.5px',
          width: '98%',
          marginLeft: '32px',
          background: 'rgba(195, 197, 203, 0.75)',
        }}
      ></div>

      <section>
        <StyledContentWrapper>
          <ul style={{ display: 'flex' }}>
            <StyledLI>
              <small style={{ marginBottom: '14px' }}>Daily Returns </small>
              <Typography>{bnbPoolStats?.dailyAPR}</Typography>
            </StyledLI>
            <StyledLI>
              <small>Your Stake </small>
              <Typography>{getDisplayBalance(stakedBalanceBNB, contractBNB.depositToken.decimal)}</Typography>
            </StyledLI>
            <StyledLI>
              <small>Earned</small>
              <Typography>{getDisplayBalance(earningsBNB)}</Typography>
              <Typography>${earnedInDollarsBNB}</Typography>
            </StyledLI>
          </ul>

          <div style={{ display: 'flex' }}>
            <Button text={'Deposit'} onClick={onDepositBNB} size="sm" />
            <Button text={'Withdraw'} onClick={onWithdrawBNB} size="sm" />
            <Button text={'Claim Rewards'} onClick={onClaimBNB} size="sm" />
          </div>
        </StyledContentWrapper>
      </section>

      <hr></hr>
    </div>
  );
};
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0px;
`;

const Tag = styled.div`
  padding: 2px 5px;
  background: rgba(0, 232, 162, 0.5);
  border-radius: 3px;
`;

const StyledContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const StyledLI = styled.li`
  margin-right: 20px;
`;
export default Bombfarms;
