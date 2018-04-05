import React from 'react';
import TagCloudRegion from '../src/TagCloudRegion';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <TagCloudRegion 
        entities={{Object}}
        categories={{Object}}
        concepts={{Object}}
        keywords={{Object}}
        tagCloudType={'test'}
        onTagItemSelected={Function}
      />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
