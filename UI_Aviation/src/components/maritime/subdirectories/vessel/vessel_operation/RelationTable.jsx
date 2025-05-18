import React from 'react'
import HeaderComponent from './HeaderComponent';
import RelationList from './RelationList';

function RelationTable() {
    return (
        <div>
          <div className="relative z-10">
            <HeaderComponent />
          </div>
          <div className="relative z-10">
            <RelationList />
          </div>
        </div>
      );
}

export default RelationTable