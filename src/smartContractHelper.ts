import {ApiPromise, Keyring, WsProvider} from '@polkadot/api';
import {ContractPromise} from '@polkadot/api-contract';
import {KeyringPair} from "@polkadot/keyring/types";
import {readFileSync} from 'fs';
import {config} from './config';

export let api : ApiPromise;
export let alice : KeyringPair;

export let lottoSmartContract : ContractPromise;

export async function initConnection(){

    if (api){
        // already initialized
        return;
    }

    api = await ApiPromise.create({ provider: new WsProvider(config.smartContractRpc)});
    const[chain, nodeName, nodeVersion] = await Promise.all([
        api.rpc.system.chain(),
        api.rpc.system.name(),
        api.rpc.system.version()
    ]);
    console.log('You are connected to chain %s using %s v%s', chain, nodeName, nodeVersion);

    alice = new Keyring({ type: 'sr25519' }).addFromUri("//Alice");

    const lottoSmartContractMetadata = readFileSync(config.lottoSmartContractMetadata);
    lottoSmartContract = new ContractPromise(api, lottoSmartContractMetadata.toString(), config.lottoSmartContractAddress);
}