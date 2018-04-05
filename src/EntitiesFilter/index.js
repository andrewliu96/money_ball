import PropTypes from 'prop-types';
import FilterContainer from '../FilterBase/FilterContainer';

/**
 * EntitiesFilter - A container component for Entity objects.
 * This object appears on the web page and allows the user to
 * filter matches based on an 'entity' value. It's core functionality
 * comes from its parents class - the FilterContainer.
 */
class EntitiesFilter extends FilterContainer {
  constructor(...props) {
    super(...props);

    this.state = {
      entities: this.props.entities,
      selectedEntities: this.props.selectedEntities
    };
  }

  /**
   * getSelectedCollection - Override parent class to return collection 
   * of selected entity items.
   */
  getSelectedCollection() {
    const { selectedEntities } = this.state;
    return selectedEntities;
  }

  /**
   * getCollection - Override parent class to return collection 
   * of all entity items.
   */
  getCollection() {
    const { entities } = this.state;
    return entities;
  }

  /**
   * getContainerTitle - Override parent class to return title of 
   * the filter container. 
   */
  getContainerTitle() {
    return 'Top Entities';
  }
  
  // Important - this is needed to ensure changes to main properties
  // are propagated down to our component. In this case, some other
  // search or filter event has occured which has changed the list of 
  // entities, or which entities are selected.
  componentWillReceiveProps(nextProps) {
    this.setState({ entities: nextProps.entities });
    this.setState({ selectedEntities: nextProps.selectedEntities });
  }
}

// type check to ensure we are called correctly
EntitiesFilter.propTypes = {
  entities: PropTypes.array,
  selectedEntities: PropTypes.object,
};

// export so we are visible to parent
module.exports = EntitiesFilter;
