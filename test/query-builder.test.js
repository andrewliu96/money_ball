import queryBuilder from '../server/query-builder';

beforeEach(() => {
  queryBuilder.setCollectionId('collection');
  queryBuilder.setEnvironmentId('environment');
});

describe('Query builder returns params for discovery service', () => {
  test('when opts are NOT passed', () => {
    expect(queryBuilder.search()).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      highlight: true,
      aggregation: '[term(enriched_text.entities.text).term(enriched_text.sentiment.document.label),' +
      'term(enriched_text.categories.label).term(enriched_text.sentiment.document.label),' +
      'term(enriched_text.concepts.text).term(enriched_text.sentiment.document.label),' +
      'term(enriched_text.keywords.text).term(enriched_text.sentiment.document.label),' +
      'term(enriched_text.entities.type).term(enriched_text.sentiment.document.label)]'
    });
  });

  test('when opts are passed', () => {
    expect(queryBuilder.search({
      filter: 'enriched_text.categories.label::"test"',
      count: 500,
      natural_language_query: 'test',
      passages: false,
      sort: 'enriched_text.sentiment.document.score'
    })).toEqual({
      environment_id: 'environment',
      collection_id: 'collection',
      highlight: true,
      aggregation: 
        '[term(enriched_text.entities.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.categories.label).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.concepts.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.keywords.text).term(enriched_text.sentiment.document.label),' +
        'term(enriched_text.entities.type).term(enriched_text.sentiment.document.label)]',
      natural_language_query: 'test',
      filter: 'enriched_text.categories.label::"test"',
      count: 500,
      passages: false,
      sort: 'enriched_text.sentiment.document.score'
    });
  });
});
