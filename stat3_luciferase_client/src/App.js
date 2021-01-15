import { Switch, Route } from 'react-router-dom'

import ExperimentForm from './components/ExperimentForm'
import VariantTable from './components/VariantTable'
import Variant from './components/Variant'


function App() {
  return (
    <Switch>
      <Route path={'/experiments/add'}>
        <ExperimentForm />
      </Route>

      <Route path={'/experiments/edit/:id'}>
        <ExperimentForm />
      </Route>

      <Route path={'/variants/:protein_variant'}>
        <Variant />
      </Route>

      <Route path={'/variants'}>
        <VariantTable />
      </Route>
    </Switch>
  );
}

export default App;
