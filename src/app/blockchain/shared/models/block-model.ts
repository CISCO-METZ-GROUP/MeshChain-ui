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
  // transactionList: TransactionModel[];

  constructor(data: any) {
    this.hash = data.current_block_hash;
    this.height = data.BlockNumber;
    this.miner = data.miner;
    this.nextblockhash = '';
    this.nonce = data.nonce;
    this.previousblockhash = '';
    this.size = data.size;
    this.timestamp = data.time_stamp;
    this.time = new Date(data.time_stamp * 1000).toLocaleString();
    this.tx = data.Transactions;
    // this.transactionList = new Array<TransactionModel>();
  }
}
