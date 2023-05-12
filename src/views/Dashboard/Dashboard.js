import React, {useState,useCallback } from 'react';

import Page from '../../components/Page';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import CardContainer from './components/CardContainer';
//Style
import styled, { createGlobalStyle } from 'styled-components';
import { Box, CardContent, Grid } from '@material-ui/core';
//Icons

import discordIcon from '../../assets/img/discord.svg';
import readDocsIcon from '../../assets/img/bnb.png';




//Bombfarm
import BombfarmBNB from './components/BombfarmsBNB';
import BombfarmsBTCB from './components/BombfarmsBTCB';
import BoardroomCard from './components/BoardroomCard';
import BombFinanceSummary from './components/BombFinanceSummary';

import useStakeToBomb from '../../hooks/useStakeToBomb';


import BondCard from './components/BondCard';

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
       
  const onStake =useStakeToBomb();

  const [isDeposit, setIsDeposit] = useState(false);
  const [isClaimAll, setIsClaimAll] = useState(false);
  const [isClickBTCB, setIsClickBTCB] = useState(false);
  const [isClickBNB, setIsClickBNB] = useState(false);

  const onDeposit = useCallback(async () => {
    if (isDeposit) return;
    setIsDeposit(true);
    onStake('1');
    setIsDeposit(false);
  }, [isDeposit]);

  const onClaimAll = useCallback(async () => {
    if (isClaimAll) return;
    setIsClaimAll(true);
    setIsClickBTCB(true);
    setIsClickBNB(true);
    setIsClaimAll(false);
  }, [isClaimAll]);

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
              <  BombFinanceSummary />
            </Grid>

            <Grid item xs={7}>
              <Link to="/">
                <a style={{ textAlign: 'end', textDecoration: 'underline', color: '#9EE6FF' }}>
                  Read Investment Strategy{'>'}
                </a>
              </Link>
              <p>
                <Button text="Invest Now"  onClick={onDeposit} size="sm" />
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

              < BoardroomCard />
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
                    <Button text="Claim all" onClick={onClaimAll} size="sm" />
                  </div>
                </StyledWrapper>

                <CardContent>
                  <BombfarmsBTCB isClick={isClickBTCB} setIsClick={setIsClickBTCB} onClaimAll={onClaimAll} />
                  <BombfarmBNB isClick={isClickBNB} setIsClick={setIsClickBNB} onClaimAll={onClaimAll} />
                </CardContent>
              </CardContainer>
            </Grid>

            <Grid item xs={12}>
              <BondCard />
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
