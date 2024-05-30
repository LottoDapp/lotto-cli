
interface Config {
    readonly smartContractRpc: string;
    readonly phatContractRpc: string;
    readonly lottoSmartContractAddress: string;
    readonly lottoPhatContractAddress: string;
    readonly lottoPhatContractAttestorAddress: string;
    readonly lottoSmartContractMetadata: string;
    readonly lottoPhatContractMetadata: string;
}


class ShibuyaConfig implements Config {

    // shibuya: wss://rpc.shibuya.astar.network
    // shibuya: wss://shibuya-rpc.dwellir.com
    smartContractRpc = 'wss://rpc.shibuya.astar.network';
    phatContractRpc = 'wss://poc6.phala.network/ws';
    lottoSmartContractAddress = 'bQBYitAbSZuJUvL2ZGqinseRXrcTggZ6F4TvJKYrR7WvkvJ';
    lottoPhatContractAddress = "0x5dd52dc1eaedc7bfafadb8dfe01b93b599a6818cb12ef3687d92a0e1b7ed6a03";
    lottoPhatContractAttestorAddress = "0x3a569d12626a2d95d8f7221b6d29a09fcb737869b1172789c60f2098f9794e90";
    lottoSmartContractMetadata = './metadata/shibuya/lotto_contract.json';
    lottoPhatContractMetadata = "./metadata/shibuya/lotto_draw.json";
}

class AstarConfig implements Config {

    smartContractRpc = 'wss://rpc.astar.network';
    phatContractRpc = 'wss://poc6.phala.network/ws';
    lottoSmartContractAddress = '';
    lottoPhatContractAddress = "";
    lottoPhatContractAttestorAddress = "";
    lottoSmartContractMetadata = './metadata/astar/lotto_contract.json';
    lottoPhatContractMetadata = "./metadata/astar/lotto_draw.json";
}

export let config : Config;

export function initConfiguration(network: string) {
    console.log('Set config for %s', network);
    if (network == 'shibuya'){
        config = new ShibuyaConfig();
    } else if (network == 'astar'){
        config = new AstarConfig();
    } else {
        throw new Error("No config for this Network");
    }
}

export function displayConfiguration(){
    console.log('Smart Contract RPC: %s', config.smartContractRpc);
    console.log('Phat Contract RPC: %s', config.phatContractRpc);
    console.log('Lotto smart contract address: %s', config.lottoSmartContractAddress);
    console.log('Lotto phat contract address: %s', config.lottoPhatContractAddress);
}

