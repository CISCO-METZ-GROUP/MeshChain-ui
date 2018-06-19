export class TransactionModel {
  blockNumber: number;
  name: string;
  timestamp: number;
  time: string;
  traceId: string;
  id: string;
  serviceMesh: string;
  numOfServices: number;
  services: any;
  duration: number;

  constructor(data: any) {
    this.blockNumber = data.blockNo;
    this.name = data.name;
    this.timestamp = data.timestamp;
    this.time = new Date(this.timestamp / 1000).toLocaleString();
    this.traceId = data.traceID;
    this.id = data.ID;
    this.serviceMesh = data.mesh;
    this.duration = data.duration;
  }

}
