interface Seed {
    readonly seed: string;
}

class ShibuyaConfig implements Seed {
    seed = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice';
}

class ShidenConfig implements Seed {
    seed = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice';
}

class AstarConfig implements Seed {
    seed = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk//Alice';
}

export let seed : Seed;

export function initSeedConfig(network: string) {
    if (network == 'shibuya'){
        seed = new ShibuyaConfig();
    } else if (network == 'shiden'){
        seed = new ShidenConfig();
    } else if (network == 'astar'){
        seed = new AstarConfig();
    } else {
        throw new Error("No config for this Network");
    }
}
