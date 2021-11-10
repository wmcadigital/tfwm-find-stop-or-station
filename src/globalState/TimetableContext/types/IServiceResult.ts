export interface IServiceResult {
  Service: Service;
  Versions?: any[] | null;
}
export interface Service {
  ServiceNumber: string;
  OperatorName: string;
  OperatorCode: string;
  RouteDescription: string;
  Direction: string;
  ValidityStart: string;
  ValidityEnd: string;
  TransportMode: number;
  Stateless: string;
  DestinationId: string;
  Version: number;
  DivaParams: DivaParams;
  ItoLineId: string;
  ValidityString: string;
}
export interface DivaParams {
  Direction: number;
}
