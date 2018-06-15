export class SmdpModel {
  cname: string;
  sidecar: any;

  constructor(data: any) {
    this.cname = data.cname;
    this.sidecar = data.sidecar;
  }
}
