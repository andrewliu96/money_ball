import React from 'react';
import PropTypes from 'prop-types';
import { Header, Grid, Input, Checkbox } from 'semantic-ui-react';
const utils = require('../../lib/utils');

/**
 * This object renders a search field at the top of the web page,
 * along with optional search parameter check boxes.
 */
export default class SearchField extends React.Component {
  constructor(...props) {
    super(...props);
    this.state = {
      searchQuery: this.props.searchQuery || '',
      queryType: this.props.queryType || utils.QUERY_NATURAL_LANGUAGE,
      returnPassages: this.props.returnPassages || false,
      limitResults: this.props.limitResults || false
    };
  }

  /**
   * handleKeyPress - user has entered a new search value. 
   * Pass on to the parent object.
   */
  handleKeyPress(event) {
    const searchValue = event.target.value;
    if (event.key === 'Enter') {
      this.props.onSearchQueryChange({
        searchQuery: searchValue
      });
    }
  }

  /**
   * toggleCheckbox - user has toggled one of the check boxes. 
   * Pass on to the parent object.
   */
  toggleCheckbox(value) {
    // let parent handle setting the new event, then
    // we just listen for state changes from parent
    // before we re-render.
    this.props.onSearchParamsChange({
      label: value
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ queryType: nextProps.queryType });
    this.setState({ returnPassages: nextProps.returnPassages });
    this.setState({ limitResults: nextProps.limitResults });
  }

  /**
   * render - return the input field to render.
   */
  render() {
    const { queryType, returnPassages, limitResults } = this.state;

    return (
      <Grid className='search-field-grid'>
        <Grid.Column width={12} verticalAlign='middle' textAlign='center'>
          <Header as='h1' textAlign='center'>
            Moneyball
          </Header>
          <Input
            className='searchinput'
            icon='search'
            placeholder='Enter search string...'
            onKeyPress={this.handleKeyPress.bind(this)}
            defaultValue={this.state.searchQuery}
          />
        </Grid.Column>
        <Grid.Column width={4} verticalAlign='top' textAlign='left'>
          <Grid.Row>
            <Checkbox 
              label='Natural Language Query' 
              checked={ queryType === utils.QUERY_NATURAL_LANGUAGE }
              onChange={this.toggleCheckbox.bind(this, 'queryType')}
            />
          </Grid.Row>
          <Grid.Row>
            <Checkbox 
              label='Passage Search'
              checked={ returnPassages }
              onChange={this.toggleCheckbox.bind(this, 'returnPassages')}
            />
          </Grid.Row>
          <Grid.Row>
            <Checkbox 
              label='Limit to 100 Results'
              checked={ limitResults }
              onChange={this.toggleCheckbox.bind(this, 'limitResults')}
            />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

// type check to ensure we are called correctly
SearchField.propTypes = {
  onSearchQueryChange: PropTypes.func.isRequired,
  onSearchParamsChange: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  queryType: PropTypes.number,
  returnPassages: PropTypes.bool,
  limitResults: PropTypes.bool
};
