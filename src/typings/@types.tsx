export interface IFlight {
  carrier: IAirline;
  legs: ILeg[];
  price: {
    total: {
      amount: string;
      currency: string;
      currencyCode: string;
    };
  };
}
export interface ILeg {
  duration: number;
  segments: ISegment[];
}
export interface ISegment {
  airline: IAirline;
  starting: boolean;
  travelDuration: number;
  arrivalAirport: IAirport;
  arrivalCity?: ICity;
  arrivalDate: string;
  departureAirport: IAirport;
  departureCity?: ICity;
  departureDate: string;
}
export interface ICity {
  uid: string;
  caption: string;
}
export interface IAirport {
  uid: string;
  caption: string;
}
export interface IData {
  result: {
    flights: IFlight[];
  };
}
export interface IAirline {
  uid: string;
  caption: string;
  airlineCode: string;
}
