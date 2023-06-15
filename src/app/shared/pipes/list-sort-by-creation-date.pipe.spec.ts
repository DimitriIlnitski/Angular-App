import { ListSortByCreationDatePipe } from './list-sort-by-creation-date.pipe';

describe('ListSortByCreationDatePipe', () => {
  it('create an instance', () => {
    const pipe = new ListSortByCreationDatePipe();
    expect(pipe).toBeTruthy();
  });
});
