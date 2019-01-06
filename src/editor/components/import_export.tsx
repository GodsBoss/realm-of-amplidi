import * as React from 'react' // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128

export const ImportExport = () => (
  <div>
    <div><button>Export</button> <button>Import</button></div>
    <div><textarea id="import-export" style={ { width: '90%', height: '10em' /* TODO: Move elsewhere */ } } /></div>
  </div>
)
