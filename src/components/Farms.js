import React, { useEffect, setState } from 'react'
import { Link } from 'react-router-dom';
import './farms.css';
import getWeb3 from '../utils/Providers';
import { getContract } from '../utils/Providers';
import { getContractMasterChef } from '../utils/Providers';
import { gettbdlpcontract } from '../utils/Providers';
import { getaccount } from '../utils/Providers'
import { ContarctAction } from '../redux/action';
import { useDispatch } from "react-redux";
import Web3 from 'web3'
import Environment from '../utils/Environment'
const Farms = () => {

  const dispatch = useDispatch();
  const [Useraccount, setAccount] = React.useState();
  const [txcontract, settxContract] = React.useState();
  const [checkuser, setcheckuser] = React.useState(false);
  const [amount, setamount] = React.useState();
  const [deposit, setDeposit] = React.useState();
  const [balaceOf,setbalanceof]=React.useState();
  const [withdraw, setWithdraw] = React.useState();
  const [approveBalance, setapproveBalance] = React.useState();
  useEffect(() => {
    balanceofContract();
    approvebalanceofContract();
    //  DisruptiveTransfer();
  }, [])
  const [show, setshow] = React.useState(true)
  const showinput = async () => {

    if (show) {
      const accounts = await getaccount()
      console.log("here are the accounts====>", accounts);
        const web3 = getWeb3()
      // if(Useraccount!==undefined && txcontract !==undefined) {
       await gettbdlpcontract().methods.approve(Environment.masterChefContractAddress, '1000000000000000000000000000000000').send(
        {
          from: accounts[0],
        }
      ).on("error", (err) => {
        console.log("Error", err);

      });
      approvebalanceofContract();
      setshow(false)
    } else {
      setshow(true)


    }

    const ConnectToWallet = async () => {
      if (checkuser && Useraccount !== undefined) {
        setcheckuser(false);
        console.log("disconnect");
        setAccount(undefined);
      } else {
        const accounts = await getaccount()

        console.log("here are the accounts====>", accounts);
        if (accounts) {
          setAccount(accounts[0]);
          const Contract = getContract()
          // console.log("Contract",Contract);
          settxContract(Contract);
        }
        setcheckuser(true);
      }

    }
    // console.log("harvest");

  }
  const showenable = async () => {
    const accounts = await getaccount()
    getContractMasterChef().methods.deposit('0', '0').send(
      {
        from: accounts[0],

      }
    ).on("error", (err) => {
      console.log("Error", err);

    });
  }

  const balanceofContract = async () => {
    const accounts = await getaccount()
  
     const b = await gettbdlpcontract().methods.balanceOf(accounts[0]).call()
     const bValue= b/ 10**18
     setbalanceof(bValue)
      // .on("error", (err) => {
      //   console.log("Error", err);
      // });
  }
  const approvebalanceofContract = async () => {
    const accounts = await getaccount()
  
     const b = await gettbdlpcontract().methods.allowance(accounts[0],Environment.masterChefContractAddress).call()
   
     setapproveBalance(b)
  
  }

  const confirmDeposit = async () => {
    const accounts = await getaccount()
    if(deposit>0){
      getContractMasterChef().methods.deposit('0', Web3.utils.toWei(deposit.toString(), 'ether') ).send(
        {
          from: accounts[0], gasPrice: Web3.utils.toWei('6', 'gwei') , gas: '507500'
  
        }
      ).on("error", (err) => {
        console.log("Error", err);
  
      });
    }
    else{
      alert("Enter deposit amount")
    }
  
  }

  const confirmWithdraw = async () => {
    const accounts = await getaccount()
    if(withdraw>0){
      getContractMasterChef().methods.withdraw('0', Web3.utils.toWei(withdraw.toString(), 'ether')).send(
        {
          from: accounts[0],gasPrice: Web3.utils.toWei('6', 'gwei') , gas: '507500'
  
        }
      ).on("error", (err) => {
        console.log("Error", err);
  
      });
    }
    else{
      alert("Enter withdraw amount")
    }
  
  }
  return (
    <>
      <section className="main-bg">
        <div className="container-fluid">
          {/* <div className="row">
            <div className="col-sm-5"> */}
          <div className="farm-content">
            <div className="inner-tile text-left">
              <div className="row brdr">
                <div className="col-sm-10">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <Link>
                        <img src="assets/img/TBD-assets/TBD-BNB.svg" alt="" className="img-fluid" />
                        <span> TBD/BNB </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-sm-2">
                  <div className="inner-circle">
                    <span>3x</span>
                  </div>
                </div>
              </div>
              <div className="row brdr ptb20">
                <div className="col-sm-12">
                  <h6 className="grey">MY LP SHARE</h6>
                  <h4>-</h4>
                </div>
              </div>
              <div className="row ptb20">
                <div className="col-sm-8">
                  <h6 className="common-g">TBD <span className="grey">EARN</span>
                  </h6>
                  <h4>-</h4>
                </div>
                <div className="col-sm-4">
                  {/* <div className="inner-circle">
                    <button type="button" className="btn btn-common" onClick={showenable} disabled={show}>Harvest</button>
                  </div> */}
                </div>
              </div>
              { approveBalance <=0 ?
                <div className="row brdr ptb20">
                  <div className="col-sm-12">
                    <button className="btn-common" onClick={showinput} >Approve Contract</button>
                  </div>
                </div> :
                <div className="row">
                  <div className="col-sm-8">
                    <div className="form-group">
                      <div className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={0} >0</div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <ul className="list-inline text-right">
                      <li className="list-inline-item">
                        <button type="button" className="btn-common plus" data-toggle="modal" data-target="#exampleModal1">+</button>
                        <div className="modal fade" id="exampleModal1" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header brdr">
                                <h5 className="modal-title" id="exampleModalLabel">Deposit
                                  TBD/BNB LP Token</h5>
                                <button type="button" className="common-g close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="row ptb20">
                                  <div className="col-sm-12 text-right">
                                    <h5>{balaceOf} TBD/BNB LP Available
                                    </h5>
                                    <div className="form-group">
                                      <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={0}  value={deposit} onChange={(e)=>{
                                        setDeposit(e.target.value)
                                      }} />
                                      <div className="inner-max">
                                        <ul className="list-inline">
                                          <li className="list-inline-item">
                                            <span className="size12">TBD/BNB
                                              LP</span>
                                          </li>
                                          {/* <li className="list-inline-item">
                                            <button className="btn-common size12">MAX</button>
                                          </li> */}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row ptb20">
                                  <div className="col-sm-12 text-center">
                                    <ul className="list-inline">
                                      <li className="list-inline-item">
                                        <button className="btn-common">Cancel</button>
                                      </li>
                                      <li className="list-inline-item">
                                        <button className="btn-common"  onClick={confirmDeposit} >Confirm</button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className="list-inline-item">
                        <button type="button" className="btn-common minus" data-toggle="modal" data-target="#exampleModal2">-</button>
                        <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                          <div className="modal-dialog" role="document">
                            <div className="modal-content">
                              <div className="modal-header brdr">
                                <h5 className="modal-title" id="exampleModalLabel">Withdraw
                                  TBD/BUSD LP Token</h5>
                                <button type="button" className="common-g close" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">×</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="row ptb20">
                                  <div className="col-sm-12 text-right">
                                    <h5>{balaceOf} TBD/BNB LP Available
                                    </h5>
                                    <div className="form-group">
                                      <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder={0} value={withdraw} onChange={(e)=>{
                                        setWithdraw(e.target.value)
                                      }} />
                                      <div className="inner-max">
                                        <ul className="list-inline">
                                          <li className="list-inline-item">
                                            <span className="size12">TBD/BNB
                                              LP</span>
                                          </li>
                                          {/* <li className="list-inline-item">
                                            <button className="btn-common size12">MAX</button>
                                          </li> */}
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row ptb20">
                                  <div className="col-sm-12 text-center">
                                    <ul className="list-inline">
                                      <li className="list-inline-item">
                                        <button className="btn-common">Cancel</button>
                                      </li>
                                      <li className="list-inline-item">
                                        <button className="btn-common" onClick={confirmWithdraw}>Confirm</button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              }


              <div className="row">
                <div className="col-sm-12 text-center">
                  <Link className="common-g" type="button" data-toggle="modal" data-target="#exampleModal">ROI</Link>
                  <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header brdr">
                          <h5 className="modal-title" id="exampleModalLabel">ROI</h5>
                          <button type="button" className="close common-g" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                          </button>
                        </div>
                        <div className="modal-body ptb20 text-left">
                          <div className="row">
                            <div className="col-sm-4">
                              <h5>TIMEFRAME</h5>
                              <h6 className="grey">1d</h6>
                            </div>
                            <div className="col-sm-4">
                              <h5>ROI</h5>
                              <h6 className="grey">0.15%</h6>
                            </div>
                            <div className="col-sm-4">
                              <h5>TBD PER $1,000</h5>
                              <h6 className="grey">0.11</h6>
                            </div>
                          </div>
                          <div className="row ptb20">
                            <div className="col-sm-12 text-center">
                              <p className="grey">Calculated based on
                                current rates. Compounding 1x
                                daily. Rates are estimates
                                provided for your convenience
                                only, and by no means represent
                                guaranteed returns.</p>
                              <Link className="common-g"> <span> Get
                                TBD-BNB LP</span> <img src="assets/img/TBD-assets/external-link-icon.svg" alt="" className="img-fluid" /> </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}
      </section>
    </>
  )
}

export default Farms;
