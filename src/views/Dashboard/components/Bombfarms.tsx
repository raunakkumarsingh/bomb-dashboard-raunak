import React from 'react';
import bombBitcoin from '../../../assets/img/bomb-bitcoin-LP.png';
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import Button from "../../../components/Button";



const Bombfarms = () => (
    <div>
        <StyledWrapper>
            <StyledWrapper>
                <img src={bombBitcoin} style={{width: '32px'}}/>
                <Typography style={{marginLeft: '6px', marginRight: '6px'}}>BOMB-BTCB </Typography>
                <Tag>
                    <Typography style={{fontSize: '12px', fontWeight: 'bolder'}}>Recommended</Typography>
                </Tag>
            </StyledWrapper>

            <Typography>TVL:$1,008,430</Typography>
        </StyledWrapper>
        <div style={{
            height: '0.5px',
            width: '98%',
            marginLeft: '32px',
            background: 'rgba(195, 197, 203, 0.75)'
        }}></div>

        <section>
            <StyledContentWrapper>
                <ul style={{display: "flex"}}>
                    <StyledLI>
                        <small style={{marginBottom: '14px'}}>Daily Returns </small>
                        <Typography>2%</Typography>
                    </StyledLI>
                    <StyledLI>
                        <small>Your Stake </small>
                        <Typography>124.21 =$1171.62</Typography>
                    </StyledLI>
                    <StyledLI>
                        <small>Earned</small>
                        <Typography>6.4413 =$298.88</Typography>
                    </StyledLI>
                </ul>

                <div style={{display: 'flex'}}>
                    <Button  text={"Deposit"} size='sm'/>
                    <Button  text={"Withdraw"} size='sm'/>
                    <Button  text={"Claim Rewards"} size='sm'/>
                </div>
            </StyledContentWrapper>
        </section>

        <StyledWrapper>
            <StyledWrapper>
                <img src={bombBitcoin} style={{width: '32px'}}/>
                <Typography style={{marginLeft: '6px', marginRight: '6px'}}>BOMB-BTCB </Typography>
                <Tag>
                    <Typography style={{fontSize: '12px', fontWeight: 'bolder'}}>Recommended</Typography>
                </Tag>
            </StyledWrapper>

            <Typography>TVL:$1,008,430</Typography>
        </StyledWrapper>

        <div style={{
            height: '0.5px',
            width: '98%',
            marginLeft: '32px',
            background: 'rgba(195, 197, 203, 0.75)'
        }}></div>

<section>
            <StyledContentWrapper>
                <ul style={{display: "flex"}}>
                    <StyledLI>
                        <small style={{marginBottom: '14px'}}>Daily Returns </small>
                        <Typography>2%</Typography>
                    </StyledLI>
                    <StyledLI>
                        <small>Your Stake </small>
                        <Typography>124.21 =$1171.62</Typography>
                    </StyledLI>
                    <StyledLI>
                        <small>Earned</small>
                        <Typography>6.4413 =$298.88</Typography>
                    </StyledLI>
                </ul>

                <div style={{display: 'flex'}}>
                    <Button  text={"Deposit"} size='sm'/>
                    <Button  text={"Withdraw"} size='sm'/>
                    <Button  text={"Claim Rewards"} size='sm'/>
                </div>
            </StyledContentWrapper>
        </section>
       
        <hr></hr>
    </div>

);
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
`

const StyledContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: end;
`

const StyledLI = styled.li`
  margin-right: 20px;
`
export default Bombfarms;