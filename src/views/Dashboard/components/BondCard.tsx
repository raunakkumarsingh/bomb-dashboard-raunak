import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';

import Button from '../../../components/Button';
import CardContainer from './CardContainer';
//Style
import styled from 'styled-components';
import { CardHeader, Grid } from '@material-ui/core';

import bomb from '../../../assets/img/bbond-256.png';

import useBondStats from '../../../hooks/useBondStats';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useBombFinance from '../../../hooks/useBombFinance';

import useTokenBalance from '../../../hooks/useTokenBalance';



const TITLE = 'Dashboard';

const BondCard = () => {
  const bombFinance = useBombFinance();
  const BBondStats = useBondStats();
  const bondBalance = useTokenBalance(bombFinance?.BBOND);
  const [isClaim, setIsClaim] = useState(false);


  const onClaim = useCallback(async () => {
    if (isClaim) return;
    setIsClaim(true);
    // harvestBoardroom();
    setIsClaim(false);
  }, [isClaim]);

  return (
    <>
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

export default BondCard;
