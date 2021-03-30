import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';

function Layout(props) {
  const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };
  console.log(selectedValue);
  return (
    <>
      <div>
        <Radio
          checked={selectedValue === 'a'}
          onChange={handleChange}
          color='primary'
          value='a'
        />
        <Radio
          checked={selectedValue === 'b'}
          onChange={handleChange}
          color='primary'
          value='b'
        />
        <Radio
          checked={selectedValue === 'c'}
          onChange={handleChange}
          color='primary'
          value='c'
        />
      </div>
    </>
  );
}

export default Layout;
