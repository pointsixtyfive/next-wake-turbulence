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
      <label htmlFor='Crossing'>
        Crossing:
        <input
          type='number'
          name='crossing'
          id='crossing'
          min='0'
          max='50'
          value={options.crossing}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </label>
      <label htmlFor='opposite'>
        Opposite:
        <input
          type='number'
          name='opposite'
          id='opposite'
          min='0'
          max='50'
          value={options.opposite}
          onChange={(e) => {
            handleChange(e);
          }}
        />
      </label>
      {/* Not implemented yet */}
      <label htmlFor='parallel'>
        Parallel:
        <input
          type='number'
          name='parallel'
          id='parallel'
          min='0'
          max='50'
          value={options.parallel}
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
