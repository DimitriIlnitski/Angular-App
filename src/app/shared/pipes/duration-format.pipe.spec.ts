import { DurationFormatPipe } from './duration-format.pipe';

describe('DurationFormatPipe', () => {
  let pipe: DurationFormatPipe;

  beforeEach(() => {
    pipe = new DurationFormatPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return duration in minutes if less than 60', () => {
    const duration = 45;
    expect(pipe.transform(duration)).toBe('45min');
  });

  it('should return duration in hours and minutes if equal or more than 60', () => {
    const duration = 120;
    expect(pipe.transform(duration)).toBe('2h 0min');
  });

  it('should return duration in hours and minutes', () => {
    const duration = 135;
    expect(pipe.transform(duration)).toBe('2h 15min');
  });

  it('should return 0min if duration is zero', () => {
    const duration = 0;
    expect(pipe.transform(duration)).toBe('0min');
  });
});
