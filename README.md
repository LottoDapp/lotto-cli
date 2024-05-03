# Tools for the Lotto dApp

This project:
- display the information about the lottery.
- display the configuration about smart contract and phat contract.
- check the configuration about smart contract and phat contract.
- call the phat contract to draw the numbers. If there is no pending message in the queue, nothing is done.
- call the phat contract to check teh winners. If there is no pending message in the queue, nothing is done.
- start bots to participate.


## Environment

- [Typescript](https://www.typescriptlang.org/)
- [Node](https://nodejs.org/en/).
- [Npx](https://www.npmjs.com/package/npx/).

## Install 

Last, under the project directory, run following command to install all the dependency.

```
npm install
```

## Configuration

Copy the configuration for the seed.

```
cp src/seed_example.ts src/seed.ts 
```
By default, we use the `Alice` account. to read/check the configuration and call the phat contract.

If you want to display or check the configuration, you can use the `Alice` account.

If you want to call the phat contract to draw the numbers or to check teh winners, you can use the `Alice` account. We use Meta transaction in the phat contract to pya the transaction fee. 

If you want to start multiple bots to participate in the lottery, you have to configure you own seed.

## Run

Last, under the project directory, run following command to install all the dependency.

```
npx tsx src/lottoCli.ts [Options]
```

```
Options:
      --help                        Show help                          [boolean]
      --dc, --displayConfiguration  Display the configuration (contract and http addresses)
      --di, --displayInformation    Display information from indexer and smart contracts
      --ch, --checks                Check if the grants and the configuration in the smart contracts have been set
      --pa, --participate           Test the participation
      --bo, --botIndex              Index for the bot
      --dn, --drawNumbers           Draw the numbers (query the phat contract)
      --cw, --checkWinners          Check the winners (query the phat contract)
      --net, --network              Specify the network
                                          [string] [choices: "shibuya", "astar"]
  -d, --debug                       Debug mode: display more information
                 
```

If you want to check the configuration.

```
npx tsx src/lottoCli.ts --network <network> --checks 
```

If you want to query the phat contract to check if there is a pending request.

```
npx tsx src/lottoCli.ts --network <network> --drawNumbers 
```
or

```
npx tsx src/lottoCli.ts --network <network> --checkWinners 
```
