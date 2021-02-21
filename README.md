# BitSong Mainnet Migration SmartContract

This contract is used to migrate ERC20 tokens to BitSong Mainnet Blockchain.

## Usage

- Send an "approve" transaction to the current [ERC20 BitSong Smart contract](https://etherscan.io/token/0x05079687d35b93538cbd59fe5596380cae9054a9) allowing the Bridge Contract to transfer funds in your behalf
- Send a "deposit" transaction to the [Bridge Smart Contract](#) specifying the amount of tokens to transfer and your BitSong mainnet address starting with (btsg1)

## Development

This project use Truffle framework, first install all the dependancies using npm. Reccomended node version is v12.x

```
npm install
```

Start your local blockchain in a new terminal

```
npx ganache-cli -p 7545
```

Compile and deploy

```
truffle compile
truffle deploy
```

## Testing

Assertion libraries supported are [chai](https://www.chaijs.com/) assertion library and [truffle-assertions](https://github.com/rkalis/truffle-assertions). Tests are written with [Mocha](https://mochajs.org/).

You can find test under `tests` folder and run all the tests using `truffle test` command.

You can also verify code coverage with
`truffle run coverage`
