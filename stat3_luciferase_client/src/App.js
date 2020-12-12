import { Switch, Route } from 'react-router-dom'

import VariantList from './components/VariantList'

function App() {
  return (
    <Switch>
      <Route path={'/variants'}>
          <VariantList />
      </Route>
    </Switch>
  );
}

export default App;
