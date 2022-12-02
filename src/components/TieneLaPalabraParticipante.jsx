import { Box, Button, Fab, Grid, IconButton } from '@mui/material';
import React, { useState } from 'react';
import styles from './App.module.css';
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StopIcon from '@mui/icons-material/Stop';
import SkipNextIcon from '@mui/icons-material/SkipNext';

const TieneLaPalabraParticipante = ({
    usuarioTieneLaPalabra,
    setUsuarioTieneLaPalabra,
    listaParticipantes,
    setListaParticipantes
}) => {

    const [estado, setEstado] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const timer = React.useRef(null);

    const clear = () => {
        window.clearInterval(timer.current);
    };

    React.useEffect(() => {

        if (estado == 1) {
            timer.current = window.setInterval(() => {
                setSeconds((second) => {
                    if (second == 60) {
                        second = 0;

                        setMinutes((minute) => minute + 1);
                    }

                    return second + 1
                });
            }, 1000);

            return () => clear();
        }

    }, [estado]);

    React.useEffect(() => {
        if (estado == 0) {
            clear();
        }
    }, [estado]);

    const usuarioParticipo = () => {
        let listaParticipantesActualizada = [...listaParticipantes];
        let participante = listaParticipantesActualizada.find(lp => lp.id === usuarioTieneLaPalabra.id);
        participante.participo = true;
        participante.tiempoParticipado = `${String(Math.abs(minutes)).padStart(2, '0')}:${String(Math.abs(seconds)).padStart(2, '0')}`
        setListaParticipantes(listaParticipantesActualizada)
    }

    const pasarLaPalabra = async () => {
        let participantesFaltantesDeParticipacion = listaParticipantes.filter(lp => lp.participo === false);
        let numeroParticipanteRandom = Math.round(Math.random() * (participantesFaltantesDeParticipacion.length - 1) + 1);
        let usuarioTieneLaPalabra = participantesFaltantesDeParticipacion[numeroParticipanteRandom - 1];
        await setUsuarioTieneLaPalabra(usuarioTieneLaPalabra);
    }

    const pasaLaPalabraRandom = async () => {
        let numeroParpadeosRandoms = Math.round(Math.random() * (50 - 1000) + 1000);

        for (let index = 0; index < numeroParpadeosRandoms; index++) {
            setTimeout(() => { pasarLaPalabra() }, 1000);
        }
    }

    const empezarHablar = () => {
        setEstado(1);
    }

    const pararHablar = () => {
        setEstado(0);
        usuarioParticipo();
        saltarTurno();
        setMinutes(0);
        setSeconds(0);
    }

    const saltarTurno = () => {
        pasaLaPalabraRandom();
    }

    return (
        <>
            <Grid container spacing={2}>
                {
                    (usuarioTieneLaPalabra) && (
                        <>
                            <Grid item xs={12}>
                                <h1 align={"center"}>Tiene la palabra</h1>
                            </Grid>
                            <Grid item xs={12} align={"center"}>
                                <div className={`${styles.contenedorImg} ${estado == 1 ? `${styles.zoomInOutBox}` : ""}`}>
                                    <img height={'80%'} alt='user-img' src={usuarioTieneLaPalabra.img} />
                                    <p>{usuarioTieneLaPalabra.nombre}</p>
                                </div>

                            </Grid>
                            <Grid item xs={12} align={"center"}>
                                <div className={styles.contenedorTimerParticipante}>
                                    {`${String(Math.abs(minutes)).padStart(2, '0')} : ${String(Math.abs(seconds)).padStart(2, '0')}`}
                                </div>
                            </Grid>
                            <Grid item xs={12} align={"center"}>
                                {/* <Button
                                    className={styles.MuiButtonContainedSuccess}
                                    type='button'
                                    variant='contained'
                                    color='success'
                                    onClick={usuarioParticipo}
                                >Listo</Button> */}

                                <Box sx={{ '& > :not(style)': { m: 1 } }}>

                                    {
                                        (estado == 0) && (<>
                                            <Fab
                                                className={styles.MuiButtonContainedSuccess}
                                                color="success"
                                                aria-label="empezar"
                                                onClick={empezarHablar}
                                            >
                                                <PlayArrowIcon />
                                            </Fab>
                                            <Fab
                                                className={styles.MuiButtonContainedError}
                                                color="error"
                                                aria-label="saltar"
                                                onClick={saltarTurno}
                                            >
                                                <SkipNextIcon />
                                            </Fab>
                                        </>)
                                    }

                                    {
                                        (estado == 1) && (<>
                                            <Fab
                                                className={styles.MuiButtonContainedError}
                                                color="error"
                                                aria-label="terminar"
                                                onClick={pararHablar}
                                            >
                                                <StopIcon />
                                            </Fab>
                                        </>)
                                    }



                                </Box>



                                {/* <Button
                                    className={styles.MuiButtonContainedSuccess}
                                    variant="contained"
                                    color='success'
                                    startIcon={<PlayArrowIcon fontSize="large" />}>
                                    Iniciar
                                </Button>

                                <Button
                                    className={styles.MuiButtonContainedSuccess}
                                    variant="contained"
                                    color='error'
                                    onClick={usuarioParticipo}
                                    startIcon={<StopIcon fontSize="large" />}>
                                    Terminar
                                </Button>

                                <Button
                                    className={styles.MuiButtonContainedSuccess}
                                    variant="contained"
                                    color='primary'
                                    startIcon={<SkipNextIcon fontSize="large" />}>
                                    Saltar
                                </Button>

                                <IconButton
                                    className={styles.colorGreen}
                                    type='button'
                                    variant='contained'
                                    color='success'
                                    onClick={usuarioParticipo}
                                >
                                    <PlayArrowIcon fontSize="large" />
                                </IconButton> */}
                            </Grid>
                        </>
                    )
                }
                {
                    (!usuarioTieneLaPalabra) && (
                        <>
                            <Grid item xs={12}>
                                <h2 align={"center"}>Esperando empezar nueva junta...</h2>
                            </Grid>
                        </>
                    )
                }

            </Grid>
        </>
    );
};

export default TieneLaPalabraParticipante;