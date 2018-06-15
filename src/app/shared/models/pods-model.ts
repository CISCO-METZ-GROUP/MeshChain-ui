export class PodsModel {
  name: string;
  namespace: string;
  ip: string;

  constructor(data: any) {
    this.name = data.name;
    this.namespace = data.namespace;
    this.ip = data.ip;
  }

}
