import React from 'react';
import Matches from '../src/Matches';
import renderer from 'react-test-renderer';

var match = {
  'results': [
    {
      'id': '0005157597ba8d147141b05e8fd83a66',
      'score': 1,
      'title': '<div className="description">test title<span style={Object { "backgroundColor": "#ffffb3" }}></span></div>',
      'text': '<div className="description">I had a great time<span style={Object { "backgroundColor": "#ffffb3" }}></span></div>',
      'date': '2014-11-01',
      'sentimentLabel': 'positive',
      'sentimentScore': 0.761482,
      'passage': { 'showPassage': false },
      'highlight': { 'showHighlight': false }
    }
  ]
};
  
it('renders correctly', () => {
  const tree = renderer
    .create(
      <Matches 
        matches={ match.results } 
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
