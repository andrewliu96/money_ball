import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Header, Menu, Dropdown, Divider, Icon } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
const utils = require('../../lib/utils');

/**
 * This object renders a trending chart object that appears at the bottom
 * of the web page. 
 */
export default class TrendChart extends React.Component {
  constructor(...props) {
    super(...props);

    this.state = {
      trendData: this.props.trendData || null,
      trendLoading: this.props.trendLoading || false,
      trendError: this.props.trendError,
      entities: this.props.entities,
      categories: this.props.categories,
      concepts: this.props.concepts,
      keywords: this.props.keywords,
      entityTypes: this.props.entityTypes,
      chartType: utils.ENTITY_FILTER,
      termValue: utils.TRENDING_TERM_ITEM
    };
  }

  /**
   * filterTypeChange - user has selected a new filter type.
   */
  filterTypeChange(event, selection) {
    this.setState({
      chartType: selection.value,
      termValue: utils.TRENDING_TERM_ITEM,
      trendData: null
    });

    this.props.onGetTrendDataRequest({
      chartType: selection.value,
      term: utils.TRENDING_TERM_ITEM
    });
  }

  /**
   * getChartData - based on what group filter user has selected
   */
  getChartData() {
    const { trendData } = this.state;

    var labels = [];
    var scores = [];
    
    if (trendData && trendData.matching_results) {
      trendData.aggregations[0].results.forEach(function(result) {
        if (result.aggregations[0].value) {
          labels.push(result.key_as_string.substring(0,10));
          scores.push(Number((result.aggregations[0].value).toFixed(2)));
        }
      });
    }

    var ret = {
      labels: labels,
      datasets: [{
        label: 'Avg Scores (range -1.0 to 1.0)',
        data: scores,
        backgroundColor: 'rgba(0,255,0,0.6)'
      }]
    };

    return ret;
  }

  /**
   * termTypeChange - user has selected a new term filter value.
   */
  termTypeChange(event, selection) {
    const { chartType, termValue } = this.state;

    // only update if term has actually changed
    if (termValue != selection.value) {
      this.setState({ termValue: selection.value });
      this.props.onGetTrendDataRequest({
        chartType: chartType,
        term: selection.value
      });
    }
  }

  /**
   * getTermOptions - get the term items available to be selected by the user.
   */
  getTermOptions() {
    const { chartType, entities, categories, concepts, keywords, entityTypes } = this.state;
    var options = [{ key: -1, value: utils.TRENDING_TERM_ITEM, text: utils.TRENDING_TERM_ITEM }];
    var collection;

    // select based on the filter type
    if (chartType === utils.ENTITY_FILTER) {
      collection = entities.results;
    } else if (chartType === utils.CATEGORY_FILTER) {
      collection = categories.results;
    } else if (chartType === utils.CONCEPT_FILTER) {
      collection = concepts.results;
    } else if (chartType === utils.KEYWORD_FILTER) {
      collection = keywords.results;
    } else if (chartType === utils.ENTITY_TYPE_FILTER) {
      collection = entityTypes.results;
    }

    if (collection) {
      collection.map(item =>
        options.push({key: item.key, value: item.key, text: item.key})
      );
    }

    return options;
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ trendData: nextProps.trendData });
    this.setState({ trendLoading: nextProps.trendLoading });
    this.setState({ trendError: nextProps.trendError });
    this.setState({ entities: nextProps.entities });
    this.setState({ categories: nextProps.categories });
    this.setState({ concepts: nextProps.concepts });
    this.setState({ keywords: nextProps.keywords });
    this.setState({ entityTypes: nextProps.entityTypes });
    this.setState({ termValue: nextProps.term });
  }

  /**
   * render - return the trending chart object to render.
   */
  render() {
    const { trendLoading, termValue } = this.state;
    
    const options = {
      responsive: true,
      legend: {
        position: 'bottom'
      }
    };

    return (
      <div className="trend-chart">
        <Header as='h2' block inverted textAlign='left'>
          <Icon name='line chart' />
          <Header.Content>
            Hype Graph
            <Header.Subheader>
              Average hype around given player
            </Header.Subheader>
          </Header.Content>
        </Header>
        <Menu compact floated={true}>
          <Dropdown 
            item
            onChange={ this.filterTypeChange.bind(this) }
            defaultValue={ utils.ENTITY_FILTER }
            options={ utils.filterTypes }
          />
        </Menu>
        <Menu  className='term-menu' compact floated={true}>
          <Dropdown 
            item
            scrolling
            value={ termValue }
            loading={ trendLoading }
            onChange={ this.termTypeChange.bind(this) }
            options={ this.getTermOptions() }
          />
        </Menu>

        <Divider clearing hidden/>
        <Grid.Row>
          <div className="trending-chart">
            <Line
              type={ 'line' }
              options={ options }
              data={ this.getChartData() }
              height={ 200 }
            />
          </div>

        </Grid.Row>
      </div>
    );
  }
}

// type check to ensure we are called correctly
TrendChart.propTypes = {
  entities: PropTypes.object,
  categories: PropTypes.object,
  concepts: PropTypes.object,
  keywords: PropTypes.object,
  entityTypes: PropTypes.object,
  chartType: PropTypes.string,
  termValue: PropTypes.string,
  trendData: PropTypes.object,
  trendLoading: PropTypes.bool,
  trendError: PropTypes.object,
  term: PropTypes.string,
  onGetTrendDataRequest: PropTypes.func.isRequired,
};
