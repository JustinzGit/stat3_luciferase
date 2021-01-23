import { Switch, Route } from 'react-router-dom'
import React, { useState }  from 'react'

import Experiment from './components/experiment/Experiment'
import ExperimentForm from './components/experiment/ExperimentForm'
import VariantTable from './components/variant/VariantTable'
import Variant from './components/variant/Variant'

const AppContext = React.createContext({})

function App() {
  const [alerts, setAlerts] = useState('')

  const store = {
    alerts: { get: alerts, set: setAlerts }
  }

  return (
    <AppContext.Provider value={store}>
      <Switch>
        <Route path={'/variants/:id'}>
          <Variant />
        </Route>

        <Route path={'/variants'}>
          <VariantTable />
        </Route>

        <Route path={['/experiments/add', '/experiments/edit/:id']}>
          <ExperimentForm />
        </Route>

        <Route path={'/experiments/:id'}>
          <Experiment />
        </Route>
      </Switch>
    </AppContext.Provider>
  );
}

export { App, AppContext}
