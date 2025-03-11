'use client';
import { Input } from 'antd';
const { Search } = Input;

function SearchBar({ predict }) {
  const onSearch = (value) => {
    predict(value);
  };

  return (
    <div className="w-full">
      <Search
        placeholder="Enter Wikipedia Link"
        onSearch={onSearch}
        enterButton
        className=''
      />
    </div>
  );
}

export default SearchBar;