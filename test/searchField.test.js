import React from 'react';
import SearchField from '../src/SearchField';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <SearchField 
        searchQuery={'test'} 
        queryType={1} 
        returnPassages={false} 
        limitResults={true}
        onSearchQueryChange={Function}
        onSearchParamsChange={Function}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});