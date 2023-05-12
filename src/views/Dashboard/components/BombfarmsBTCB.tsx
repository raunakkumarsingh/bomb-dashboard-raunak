import React, { useMemo, useState, useCallback,useRef } from 'react';
import bombBitcoin from '../../../assets/img/bomb-bitcoin-LP.png';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Button from '../../../components/Button';

import useBanks from '../../../hooks/useBanks';
import useShareStats from '../../../hooks/usebShareStats';

import useBombStats from '../../../hooks/useBombStats';
import useRedeemFromBomb from '../../../hooks/useRedeemFromBomb';
import useHarvest from '../../../hooks/useHarvest';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useStakedBalance from '../../../hooks/useStakedBalance';
import useEarnings from '../../../hooks/useEarnings';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useWithdraw from '../../../hooks/useWithdraw';
import useStake from '../../../hooks/useStake';
import useRedeem from '../../../hooks/useRedeem';


const BombfarmsBTCB = (props: { isClickBTCB: any; setIsClickBTCB: any; }) => {
  // console.log(props.isClick);

  const [banks] = useBanks();
  // console.log(banks)
  const bombFarmsStats = useShareStats();
  const bhsarePriceInFarms = useMemo(
    () => (bombFarmsStats ? Number(bombFarmsStats.priceInDollars).toFixed(2) : null),
    [bombFarmsStats],
  );
 
  // BTCB POOL
  let contractBTCB = banks.filter((bank) => {
    return bank.contract === 'BombBtcbLPBShareRewardPool' && !bank.finished;
  })[0];
  let btcbPoolStats = useStatsForPool(contractBTCB);
  const stakedBalanceBTCB = useStakedBalance(contractBTCB.contract, contractBTCB.poolId);
  const earningsBTCB = useEarnings(contractBTCB.contract, contractBTCB.earnTokenName, contractBTCB.poolId);
  const earnedInDollarsBTCB = (Number(bhsarePriceInFarms) * Number(getDisplayBalance(earningsBTCB))).toFixed(2);

  const [isDeposit, setIsDeposit] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [isClaim, setIsClaim] = useState(false);

  let { onStake } = useStake(contractBTCB);
  let { onRedeem } = useRedeem(contractBTCB);
  let { onReward } = useHarvest(contractBTCB);
  let { onWithdraw } = useWithdraw(contractBTCB);

  const onDepositBTCB = useCallback(async () => {
    if (isDeposit) return;
    setIsDeposit(true);
    onStake('1');
    setIsDeposit(false);
  }, [isDeposit]);

  const onWithdrawBTCB = useCallback(async () => {
    if (isWithdraw) return;
    setIsWithdraw(true);
    onRedeem();
    // onWithdraw("1")
    setIsWithdraw(false);
  }, [isWithdraw]);

  const onClaimBTCB = useCallback(async () => {
    if (isClaim ) return;
    setIsClaim(true);
    onReward();
    setIsClaim(false);
  }, [isClaim  ]);

  if(props.isClickBTCB){
    onClaimBTCB();
    props.setIsClickBTCB(false)
  }

   



  return (
    <div>
      <StyledWrapper>
        <StyledWrapper>
          <img src={bombBitcoin} style={{ width: '32px' }} />
          <Typography style={{ marginLeft: '6px', marginRight: '6px' }}>BOMB-BTCB </Typography>
          <Tag>
            <Typography style={{ fontSize: '12px', fontWeight: 'bolder' }}>Recommended</Typography>
          </Tag>
        </StyledWrapper>

        <Typography>TVL: ${btcbPoolStats?.TVL} </Typography>
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
              <Typography>{btcbPoolStats?.dailyAPR}</Typography>
            </StyledLI>
            <StyledLI>
              <small>Your Stake </small>
              <Typography>{getDisplayBalance(stakedBalanceBTCB, contractBTCB.depositToken.decimal)}</Typography>
            </StyledLI>
            <StyledLI>
              <small>Earned</small>
              <Typography>{getDisplayBalance(earningsBTCB)}</Typography>
              <Typography>${earnedInDollarsBTCB}</Typography>
            </StyledLI>
          </ul>

          <div style={{ display: 'flex' }}>
            <Button text={'Deposit'} onClick={onDepositBTCB} size="sm" />
            <Button text={'Withdraw'} onClick={onWithdrawBTCB} size="sm" />
            <Button   text={'Claim Rewards'} onClick={onClaimBTCB} size="sm" />
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
export default BombfarmsBTCB;
