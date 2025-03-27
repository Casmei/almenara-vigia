export default interface BaseUseCaseInterface {
  handle(): Promise<void>;
}
