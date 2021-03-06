import React from 'react';
import { useSelector } from 'react-redux'
import { getContractBalance } from '../utils/TruffleProvider';
import { getContract } from '../utils/Providers';
import { getaccount } from '../utils/Providers'
const RewardPool = () => {
    const [balance, setbalance] = React.useState();
    const getBalance = async () => {
        const ContractBalance = await getContractBalance();
        setbalance(ContractBalance)
        //  console.log("ContractBalance",ContractBalance);
    }
    getBalance();
    // console.log("ContractBalance",getBalance());    

    const { reward } = useSelector((state) => state.UserReducer);
    const claimReward = async () => {
        const accounts = await getaccount()
        getContract().methods.claimBNBReward().send({
            from: accounts[0]
        })
            // .on("error", (err) => {
            //     console.log("Error", err);

            // });
    }
    return (
        <>
            <section className="secondlast">
                {/* <div className="container-fluid">
            <div className="row"> */}
                <div className="col-sm-12 p_00">
                    <div className="inner-tile-11">
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="inner-content2 text-center">
                                    <h4>Reward Pool</h4>
                                    <img src="assets/img/yfeth-assets/reward-pool-image.svg" alt="" className="img-fluid" />
                                    <h4>-</h4>
                                </div>
                            </div>
                            <div className="col-sm-8">
                                <div className=" text-center">
                                    <h4>My Reward: <strong>{reward ? reward / 10 ** 18 : ''}</strong> </h4>
                                    {/* <h6 className="common-g ptb20">*pool is always changing based on buys, sell, and collects by others, learn more here<span className="br">?</span></h6> */}
                                    <h5 className="ptb20">You will receive {reward / 10 ** 18} BNB (tax not included)</h5>
                                    <button className="btn-common" style={{ marginTop: '10px' }} onClick={claimReward}>
                                        <img src="assets/img/yfeth-assets/claim-reward-icon.svg" alt="" className="img-fluid" />
                                        <span className=""> Claim Reward</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* </div>
            
        </div> */}
            </section>

        </>
    )
}

export default RewardPool
