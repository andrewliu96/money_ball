import queryBuilderTrending from '../server/query-builder-trending';

beforeEach(() => {
  queryBuilderTrending.setCollectionId('collection');
  queryBuilderTrending.setEnvironmentId('environment');
});

describe('Trending query builder returns params for discovery service', () => {
  test('when opts are NOT passed', () => {
    expect(queryBuilderTrending.search()).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      aggregation: 'timeslice(date,1month).average(enriched_text.sentiment.document.score)'
    });
  });

  test('when opts are passed', () => {
    expect(queryBuilderTrending.search({
      filter: 'enriched_text.categories.label::"test"',
      count: 500,
      query: 'enriched_text.categories.label::"test"',
    })).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      aggregation: 'timeslice(date,1month).average(enriched_text.sentiment.document.score)',
      query: 'enriched_text.categories.label::"test"',
      filter: 'enriched_text.categories.label::"test"',
      count: 500
    });
  });
});
