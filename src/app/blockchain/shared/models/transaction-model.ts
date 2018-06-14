export class TransactionModel {
  blockNumber: number;
  timestamp: number;
  time: string;
  oem: string;
  designName: string;
  companyName: string;
  action: string;
  value: string;

  constructor(data: any) {
    this.blockNumber = data.blockNumber ? data.blockNumber : data.BlockNumber;
    this.timestamp = data.timestamp ? data.timestamp : data.time_stamp;
    this.time = new Date(this.timestamp * 1000).toLocaleString();
    this.oem = data.oem ? data.oem : data.OEM;
    this.designName = data.designName ? data.designName : data.vnetDesignName;
    this.companyName = data.company_name;
    this.action = data.action ? data.action : data.Action;
    this.value = data.value;
  }

}
