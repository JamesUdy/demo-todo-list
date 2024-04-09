import React, { useEffect, useRef } from 'react';
import { ClearKeywordTask, CommandKey, Search } from '../../assets';
import "./SearchTask.scss"

interface SearchTaskProps {
  keyword: string;
  handleKeywordChanges: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearKeyword: () => void;
};

const SearchTask: React.FC<SearchTaskProps> = ({keyword, handleKeywordChanges, clearKeyword}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'f') {
        e.preventDefault();

        if(searchInputRef.current) {
          searchInputRef.current.focus();
          searchInputRef.current.select();
        };
      };
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <section className='search-container'>
      <div className="search-input">
        <div className='search-icon absolute left-4'>
          <Search/>
        </div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder={'Find a specific task title...'}
          autoComplete='off'
          value={keyword}
          onChange={handleKeywordChanges}
          ref={searchInputRef}
        />
        <div className="search-input-shortKey" onClick={clearKeyword}>
          {keyword.length > 0 ? (
            <ClearKeywordTask/>
          ) : (
            <div>
              <CommandKey/>
              <span>+ F</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchTask;
