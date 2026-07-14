declare module 'node-cron' {
  interface ScheduleOptions {
    timezone?: string;
  }

  interface ScheduledTask {
    start(): void;
    stop(): void;
  }

  function validate(expression: string): boolean;
  function schedule(
    expression: string,
    callback: () => void,
    options?: ScheduleOptions,
  ): ScheduledTask;

  const cron: {
    validate: typeof validate;
    schedule: typeof schedule;
  };

  export default cron;
}
