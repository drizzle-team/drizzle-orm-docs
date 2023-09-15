import React from 'react';
import { DocSearch } from '@docsearch/react';

import '@docsearch/css';

const SearchBar = () => (
  <div className="search-wrap">
    <DocSearch
      placeholder="Search documentation..."
      appId="MXZNUT59HV"
      apiKey="7c390e262ac8858df0b6624d01d9dfef"
      indexName="orm-drizzle"
    />
  </div>
);

export default SearchBar;
