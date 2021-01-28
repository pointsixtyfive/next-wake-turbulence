import PropTypes from 'prop-types';

const Options = ({ options, setOptions }) => {
  function handleChange(e) {
    const val = e.target.value;
    const id = e.target.id;
    const newOptions = Object.assign({}, options);

    newOptions[id] = val;
    setOptions(newOptions);
  }

  return (
    <section className='options'>
      <label htmlFor='intersection'>
        Intersection:
        <input
          type='number'
          name='intersection'
          id='intersection'
          min='0'
          max='100'
          value={options.intersection}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </label>
    </section>
  );
};

export default Options;

Options.propTypes = {
  options: PropTypes.object.isRequired,
  setOptions: PropTypes.func.isRequired,
};
