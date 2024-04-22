import yargs from 'yargs/yargs';
import {displayConfiguration, initConfiguration} from './config';
import {initConnection as initPhatContractConnection} from './phatContractHelper';
import {checkGrants, checkLottoConfiguration} from './checks';
import {getCurrentRaffleId, getCurrentStatus, participate, participateWithBatch} from './lotto';
import {callPhatContract} from './lottoDraw';
import {alice, initConnection as initSmartContractConnection, participant} from "./smartContractHelper";

const argv = yargs(process.argv.slice(2)).options({
    dc: {alias: 'displayConfiguration', desc: 'Display the configuration (contract and http addresses)'},
    di: {alias: 'displayInformation', desc: 'Display information from indexer and smart contracts'},
    ch: {alias: 'checks', desc: 'Check if the grants and the configuration in the smart contracts have been set'},
    pa: {alias: 'participate', desc: 'Test the participation'},
    dn:  {alias: 'drawNumbers', desc: 'Draw the numbers'},
    cw:  {alias: 'checkWinners', desc: 'Check the winners'},
    net: {alias: 'network', choices:['shibuya', 'astar'], type:'string', desc: 'Specify the network', requiresArg: true},
    d: {alias: 'debug', desc: 'Debug mode: display more information'},
}).version('0.1').parseSync();


export function isDebug() : boolean{
    return argv.debug != undefined;
}

async function run() : Promise<void>{

    if (!argv.displayConfiguration && !argv.displayInformation && !argv.checks
        && !argv.participate
        && !argv.drawNumbers && !argv.checkWinners
    ) {
        return Promise.reject('At least one option is required. Use --help for more information');
    }

    if (argv.net == undefined) {
        return Promise.reject('The network is mandatory');
    } else {
        initConfiguration(argv.net);
    }

    if (argv.displayConfiguration) {
        displayConfiguration();
    }

    await initSmartContractConnection();

    if (argv.displayInformation) {
        await getCurrentRaffleId();
        await getCurrentStatus();
    }

    if (argv.checks) {
        await checkGrants();
        await checkLottoConfiguration();
    }

    if (argv.participate) {
        for (let i = 0; i <50; i++) {
            let numbers: Number[][] = [];
            for (let j = 0; j < 30; j++) {
                const n1 = Math.floor(Math.random() * 50) + 1;
                const n2 = Math.floor(Math.random() * 50) + 1;
                const n3 = Math.floor(Math.random() * 50) + 1;
                const n4 = Math.floor(Math.random() * 50) + 1;
                numbers[j] = [n1, n2, n3, n4];
            }
            await participateWithBatch(participant, numbers);
        }
    }

    if (argv.drawNumbers || argv.checkWinners) {
        await initPhatContractConnection();

        const raffleId = await getCurrentRaffleId();
        const status = await getCurrentStatus();

        if (argv.drawNumbers && status == 'WaitingResults'){
            console.log('Draw the numbers for raffle %s', raffleId);
            await callPhatContract();
        }

        if (argv.checkWinners && status == 'WaitingWinners'){
            console.log('Checking the winners for raffle %s', raffleId);
            await callPhatContract();
        }

    }
}

run().catch(console.error).finally(() => process.exit());


