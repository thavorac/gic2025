export interface GatewayResponse<T = any> {
  status: number;
  data: T;
}
