export class SmcpModel {
  podName: string;
  ip: string;

  constructor(data: any) {
    this.podName = data.podName;
    this.ip = data.ip;
  }

}
