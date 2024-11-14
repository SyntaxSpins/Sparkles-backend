
export class WebHookEvent {
  eventType: string;
  payload: object;

  constructor(eventType: string, payload: object) {
    this.eventType = eventType;
    this.payload = payload;
  }
}
