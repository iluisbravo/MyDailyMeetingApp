import { useState } from 'react'
import { Container, Grid } from '@mui/material'
import reactLogo from './assets/react.svg'
import './App.css'
import ListaParticipantes from './components/ListaParticipantes'
import ContadorMinutos from './components/ContadorMinutos'
import TieneLaPalabraParticipante from './components/TieneLaPalabraParticipante'
import styles from './components/App.module.css'

function App() {
  const [usuarioTieneLaPalabra, setUsuarioTieneLaPalabra] = useState();
  const [listaParticipantes, setListaParticipantes] = useState([]);

  return (
    <div className="App">
      <Container fixed>
        <Grid container spacing={4}>
          <Grid item md={4} xs={12}>
            <div className={styles.contenedorGreen}>
              <ListaParticipantes
                listaParticipantes={listaParticipantes}
                setListaParticipantes={setListaParticipantes}
              />
            </div>

          </Grid>

          <Grid item md={4} xs={12}>
            <div className={styles.contenedorRed}>
              <TieneLaPalabraParticipante
                listaParticipantes={listaParticipantes}
                setListaParticipantes={setListaParticipantes}
                setUsuarioTieneLaPalabra={setUsuarioTieneLaPalabra}
                usuarioTieneLaPalabra={usuarioTieneLaPalabra}
              />
            </div>
          </Grid>

          <Grid item md={4} xs={12}>
            <div className={styles.contenedorWhite}>
              <ContadorMinutos
                listaParticipantes={listaParticipantes}
                setUsuarioTieneLaPalabra={setUsuarioTieneLaPalabra}

              />
            </div>

          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
