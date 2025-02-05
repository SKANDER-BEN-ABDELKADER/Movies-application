import React from 'react'

const Search = ({searchTerme, setSearchTerme}) => {
  return (
<div className='search'>
    <div>
        <img src="search.svg" alt="search" />

        <input type="text"
        placeholder='Search through our 1000+ movies'
        value={searchTerme}
        onChange={(e) => setSearchTerme(e.target.value)}    
        />
    </div>
</div> 
 )
}

export default Search