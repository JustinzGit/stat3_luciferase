import { Switch, Route } from 'react-router-dom'

import VariantList from './components/VariantList'
import Variant from './components/Variant'

function App() {
  return (
    <Switch>
      <Route path={'/variants/:protein_variant'}>
        <Variant />
      </Route>

      <Route path={'/variants'}>
        <VariantList />
      </Route>
    </Switch>
  );
}

export default App;
