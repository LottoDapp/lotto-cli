
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
    lottoSmartContractAddress = 'aB9AxBVmoYogZ5ZAX662R5YJafTVCqVbtGzJYX3LvvwZW5r';
    lottoPhatContractAddress = "0x413c95b799c28b11cb0e0bfb4cdcd41dc80f61a7f325e4e83c9c13c27f1b830b";
    lottoPhatContractAttestorAddress = "0xc858da5dfd651e04f66403f6d187cae9abae923662507710d139471653dc66b7";
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

