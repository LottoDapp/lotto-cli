import {WeightV2} from '@polkadot/types/interfaces';
import {api, alice, lottoSmartContract} from './smartContractHelper';


export async function getCurrentRaffleId() : Promise<Number>{
       
    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 30000000000, proofSize: 1000000}
    );
    
    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;
  
    const {result, output} = await lottoSmartContract.query['raffle::getCurrentRaffleId'](alice.address, {gasLimit, storageDepositLimit});

    if (result.isOk){
        const value : string = output?.toString() ?? '';
        const era = JSON.parse(value).ok as number;
        console.log('Current raffle id: %s', era);
        return era;
    }
    return Promise.reject("ERROR when query getCurrentRaffleId " + result.asErr);
}


export async function getCurrentStatus() : Promise<String> {

    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 30000000000, proofSize: 1000000}
    );

    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    const {result, output} = await lottoSmartContract.query['raffle::getCurrentStatus'](alice.address, {gasLimit, storageDepositLimit});

    if (result.isOk){
        const value : string = output?.toString() ?? '';
        const era = JSON.parse(value).ok as string;
        console.log('Current status: %s', era);
        return era;
    }
    return Promise.reject("ERROR when query getCurrentStatus " + result.asErr);
}


