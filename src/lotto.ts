import {WeightV2} from '@polkadot/types/interfaces';
import {SubmittableExtrinsic} from '@polkadot/api/types';
import {api, alice, lottoSmartContract, signAndSend} from './smartContractHelper';
import {isDebug} from "./lottoCli";
import {KeyringPair} from "@polkadot/keyring/types";


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

export async function participate(
    signer: KeyringPair,
    numbers: Number[]
) : Promise<void>{

    console.log('Participate with %s', numbers.toString());

    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    const {gasRequired, storageDeposit, result, gasConsumed, output, debugMessage } =
        await lottoSmartContract.query.participate(
            signer.address,
            { storageDepositLimit },
            numbers
        ) ;

    if (isDebug()){
        console.log('result: %s', result.toString());
        console.log('output: %s', output?.toString());
        console.log('gasRequired: %s', gasRequired.toString());
        console.log('gasConsumed: %s', gasConsumed.toString());
        console.log('storageDeposit: %s', storageDeposit.toString());
        console.log('debugMessage: %s', debugMessage.toString());
    }

    const tx = lottoSmartContract.tx.participate({ storageDepositLimit, gasLimit: gasRequired }, numbers);

    await signAndSend(signer, tx);

    console.log('Participation done');
}


export async function participateWithBatch(
    signer: KeyringPair,
    numbers: Number[][]
) : Promise<void>{

    console.log('Participate with a batch of %s tx', numbers.length);

    // maximum gas to be consumed for the call. if limit is too small the call will fail.
    const gasLimit: WeightV2 = api.registry.createType('WeightV2',
        {refTime: 3000000000, proofSize: 100000}
    );


    // a limit to how much Balance to be used to pay for the storage created by the contract call
    // if null is passed, unlimited balance can be used
    const storageDepositLimit = null;

    let txs : any[] = [];
    for (let i = 0; i <numbers.length; i++){
        txs[i] = lottoSmartContract.tx.participate({ storageDepositLimit, gasLimit }, numbers[i]);
    }

    await signAndSend(signer, api.tx.utility.batch(txs));

    console.log('Participations done');
}

