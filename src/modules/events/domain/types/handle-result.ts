export interface HandlerResult {
  origin?: {
    id: string;
    balance: number;
  };
  destination?: {
    id: string;
    balance: number;
  };
}
