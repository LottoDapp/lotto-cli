
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
    smartContractRpc = 'wss://rpc.shibuya.astar.network';
    phatContractRpc = 'wss://poc6.phala.network/ws';
    lottoSmartContractAddress = 'bQBYitAbSZuJUvL2ZGqinseRXrcTggZ6F4TvJKYrR7WvkvJ';
    lottoPhatContractAddress = '0x0104459f90c58b7164c7db3f6ceb3622eeb5eba44d0a80ed85ee86b7680f512d';
    lottoPhatContractAttestorAddress = '0xec7e453eb334bbfcf135ca69d02207ed69332e727d8130343eeca7bc89651467';
    lottoSmartContractMetadata = './metadata/shibuya/lotto_contract.json';
    lottoPhatContractMetadata = "./metadata/shibuya/lotto_draw.json";
}

class AstarConfig implements Config {
    //smartContractRpc = 'wss://rpc.astar.network';
    smartContractRpc = 'wss://astar.api.onfinality.io/public-ws';
    //phatContractRpc = 'wss://api.phala.network/ws';
    phatContractRpc = 'wss://poc6.phala.network/ws';
    lottoSmartContractAddress = 'XSMfwh4kriyo96h5LBdttiixKKd3fRxZL5dR81pK4gCuNsC';
    //lottoPhatContractAddress = '0xe91f9c51ecf41980f798a16b34fa5609820a4f5f01d89a56128cef89b561ecb6';
    //lottoPhatContractAttestorAddress = '0xa9f60598c9fdb5c7ca2785de8a663314fde6e7b70e9fea9baf4e45202f9b1b7f';
    lottoPhatContractAddress = '0x31deab39e1c2ab3ed3be7226f7a5159c5aa0d85cbb7113e1cb2ef27984907e60';
    lottoPhatContractAttestorAddress = '0x5a1aa9f1748dd6acf5ca59d7d5b2fabe821337cb3e0c55e0ed4d1a47edaefb95';
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

