import { Switch, Route } from 'react-router-dom'
import React, { useState }  from 'react'
import Experiment from './components/Experiment'
import ExperimentForm from './components/ExperimentForm'
import VariantTable from './components/VariantTable'
import Variant from './components/Variant'

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
