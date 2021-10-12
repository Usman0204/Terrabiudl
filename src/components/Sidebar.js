import React, { useEffect } from 'react'
import {getContract} from '../utils/Providers';
import  {getaccount} from '../utils/Providers'
import { ContarctAction } from '../redux/action';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './sidebar.css'
import {} from '../utils/TruffleProvider';
const Sidebar = () => {
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.UserReducer); 
  const [Useraccount, setAccount] = React.useState();
  const [txcontract, settxContract] = React.useState();
  const [checkuser, setcheckuser] = React.useState(false);

 
  const ConnectToWallet =async  () => {
    if (checkuser && Useraccount!==undefined) {
      setcheckuser(false);
      console.log("disconnect");
      setAccount(undefined);
    } else {
        const accounts= await getaccount()
      
          console.log("here are the accounts====>", accounts);
          if (accounts) {
            setAccount(accounts[0]);
            const Contract=getContract()
            // console.log("Contract",Contract);
            settxContract(Contract);
          }
          setcheckuser(true);
        }
      
      }
  useEffect(() => {
    if (Useraccount !== undefined && txcontract !== undefined) {
      dispatch(ContarctAction(Useraccount, txcontract))
    }

  }, [Useraccount, txcontract])
  return (
    <>
      <div className="inner-content">
         <Link>
            <img src="assets/img/yfeth-assets/logo.svg" alt=""  className="img-fluid" />
          </Link>
        
          <button className="btn-common pt__20"><img src="assets/img/yfeth-assets/buy-icon.svg" alt="" /> BUY TBD</button>
          
     
        <div className="inner-tile text-left ptb10 pt__30">
          <h3>Wallet Information</h3>
          <h6>Your Address:</h6>
          <p className="account">{Useraccount ? Useraccount : ""}</p>
          <div className="row pt20">
            <div className="col-sm-6">
              <div className="inner-side">
               <a className="grey">
                  {/* <img src="assets/img/yfeth-assets/copy-icon.svg" alt="" className="img-fluid" /> */}
                  {/* <span> Copy Address</span> */}
                </a>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="inner-side">
               <a className="grey">
                  {/* <img src="assets/img/yfeth-assets/external-link-icon.svg" alt="" className="img-fluid" /> */}
                  {/* <span> View on BscScan Explorer</span> */}
                </a>
              </div>
            </div>
          </div>
          <div className="p15">
          <h4>Your TBD Balance:</h4>
          {/* <h5>YFETH 10.50</h5> */}
          <h6>{Useraccount ? balance/ 10**18 : ""}</h6>
          {/* <h6>(50.20 $)</h6> */}
          </div>
         
        </div>
        <div className="inner-tile1 text-left pt__30">
          <ul>
            <li  >
             <a className="img-fluid" href="https://terrabuild.app/" target="_blank">
                <img src="assets/img/yfeth-assets/home-icon.svg" alt="" className="img-fluid" />
                <span>	&nbsp;Homepage</span>
              </a>
            </li>
            <li>
             <a  className="img-fluid" href="http://terrabuild.app/wp-content/uploads/2021/09/TerraBuild-Updated-WP.pdf" target="_blank">
                <img src="assets/img/yfeth-assets/guide-icon.svg" alt="" className="img-fluid" />
                <span> &nbsp;Whitepaper</span>
              </a>
            </li>
            <li>
             <a className="img-fluid"  href="https://bscscan.com/token/0x02aa5cdf7350924de2fa88041da99993cb021219" target="_blank">
                <img src="assets/img/yfeth-assets/contract-icon.svg" alt="" className="img-fluid" />
                <span> &nbsp;Contract</span>
              </a>
            </li>
          </ul>
        </div>
        <button className="btn-common pt__20" onClick={ConnectToWallet}>
          <img src="assets/img/yfeth-assets/disconnect-icon.svg" alt="" className="img-fluid" />
          {Useraccount ? "Disconnect Wallet" : " Connect Wallet"} </button>
         

      </div>
    </>
  )
}

export default Sidebar;
