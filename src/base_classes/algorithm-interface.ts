import { Operation } from "fast-json-patch";

export interface IVisuableAlgorithm<T> {
  run(inital: T): void;
}

// There should be more types for different messages with different payloads
export interface IMessage {
  type: "START" | "STOP" | "PATCH" | "FINISHED";
  payload: IMessagePayload;
}

export type IMessagePayload = Partial<{
  ops: Operation[];
  current: number | number[];
  time: number;
  init: any;
}>;
