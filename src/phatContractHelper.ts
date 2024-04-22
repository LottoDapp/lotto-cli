import {
    OnChainRegistry,
    PinkContractPromise,
    getClient,
    getContract,
} from '@phala/sdk'
import {readFileSync} from 'fs';
import {config} from './config';

export let client : OnChainRegistry;

export let lottoPhatContract : PinkContractPromise;

export async function initConnection(){

    if (client){
        return;
    }

    client = await getClient({
        transport: config.phatContractRpc
    });

    const[chain, nodeName, nodeVersion] = await Promise.all([
        client.api.rpc.system.chain(),
        client.api.rpc.system.name(),
        client.api.rpc.system.version()
    ]);
    console.log('You are connected to chain %s using %s v%s', chain, nodeName, nodeVersion);

    const abi = readFileSync(config.lottoPhatContractMetadata, 'utf-8');

    lottoPhatContract = await getContract({
        client,
        contractId: config.lottoPhatContractAddress,
        abi,
        //provider,
        }
    )
}
