export class BlockModel {
  hash: string;
  height: number;
  miner: string;
  nextblockhash: string;
  nonce: number;
  previousblockhash: string;
  size: number;
  timestamp: number;
  time: string;
  tx: string[];
  gasUsed: number;
  gasLimit: number;
  // transactionList: TransactionModel[];

  constructor(data: any) {
    this.hash = data.hash;
    this.height = data.number;
    this.miner = data.miner;
    this.nextblockhash = '';
    this.nonce = 0;
    this.previousblockhash = '';
    this.size = 0;
    this.timestamp = data.timestamp;
    this.time = new Date(data.timestamp * 1000).toLocaleString();

    if (data.transactionCount) {
      this.tx = Array(data.transactionCount);
    } else {
      this.tx = [];
    }

    this.gasUsed = data.gasUsed;
    this.gasLimit = data.gasLimit;
  }
}
