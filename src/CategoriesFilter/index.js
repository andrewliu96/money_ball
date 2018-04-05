import PropTypes from 'prop-types';
import FilterContainer from '../FilterBase/FilterContainer';

/**
 * CategoriesFilter - A container component for Category objects.
 * This object appears on the web page and allows the user to
 * filter matches based on a 'category' value. It's core functionality
 * comes from its parents class - the FilterContainer.
 */
class CategoriesFilter extends FilterContainer {
  constructor(...props) {
    super(...props);

    this.state = {
      categories: this.props.categories,
      selectedCategories: this.props.selectedCategories
    };
  }

  /**
   * getSelectedCollection - Override parent class to return collection 
   * of selected category items.
   */
  getSelectedCollection() {
    const { selectedCategories } = this.state;
    return selectedCategories;
  }

  /**
   * getCollection - Override parent class to return collection 
   * of all category items.
   */
  getCollection() {
    const { categories } = this.state;
    return categories;
  }

  /**
   * getContainerTitle - Override parent class to return title of 
   * the filter container. 
   */
  getContainerTitle() {
    return 'Top Categories';
  } 
  
  // Important - this is needed to ensure changes to main properties
  // are propagated down to our component. In this case, some other
  // search or filter event has occured which has changed the list of 
  // cateories, or which categories are selected.
  componentWillReceiveProps(nextProps) {
    this.setState({ categories: nextProps.categories });
    this.setState({ selectedCategories: nextProps.selectedCategories });
  }
}

// type check to ensure we are called correctly
CategoriesFilter.propTypes = {
  categories: PropTypes.array,
  selectedCategories: PropTypes.object,
};

// export so we are visible to parent
module.exports = CategoriesFilter;
