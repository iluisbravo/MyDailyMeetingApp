import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import styles from './App.module.css';
import moment from 'moment';
import 'moment/dist/locale/es';

const ContadorMinutos = ({ listaParticipantes, setUsuarioTieneLaPalabra }) => {
    const [status, setStatus] = useState(0);
    const [minutes, setMinutes] = useState(15);
    const [seconds, setSeconds] = useState('00');
    const id = React.useRef(null);

    const clear = () => {
        window.clearInterval(id.current);
    };

    React.useEffect(() => {

        if (status == 1) {
            id.current = window.setInterval(() => {
                setSeconds((second) => {
                    if (second == 0) {
                        second = 60;

                        setMinutes((minute) => minute - 1);
                    }

                    return second - 1
                });



            }, 1000);

            return () => clear();
        }

    }, [status]);

    React.useEffect(() => {
        if (seconds === 0 && minutes === 0) {
            clear();
        }
    }, [seconds, minutes]);

    const startContador = () => {
        setMinutes(15);
        setSeconds('00');
        setStatus(1);
        pasaLaPalabraRandom();
    }

    const stopContador = () => {
        setStatus(3);
        // clear();
        setUsuarioTieneLaPalabra(null)
    }

    const reiniciarContador = () => {
        setMinutes(15);
        setSeconds('00');
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

    const getDuracionDaily = (minutes, seconds) => {
        let date1 = new Date()
        date1.setHours(0, 15, 0, 0);

        let date2 = new Date()
        date2.setHours(0, minutes, seconds, 0);

        var delta = Math.abs(date2 - date1) / 1000;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        // what's left is seconds
        var seconds = delta % 60;
        return `${minutes}:${String(Math.abs(seconds)).padStart(2, '0')} min`
    }

    const getCurrentDate = () => {
        let date = moment().locale('es').format('DD/MMM/YYYY')
        return date;
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} align={"center"}>
                    <h1>Tiempo</h1>
                </Grid>
                <Grid item xs={12} align={"center"}>
                    <h1 className={styles.contenedorWhiteReloj}>{minutes}:{String(seconds).padStart(2, '0')}<sub>min</sub></h1>
                </Grid>

                <Grid item align={"center"} xs={12}>

                    {
                        (status == 0 || status == 3) && (
                            <>
                                <Button
                                    className={styles.MuiButtonContainedPrimary}
                                    variant='contained'
                                    type='button'
                                    color='primary'
                                    onClick={startContador}
                                >Empezar Daily</Button>
                            </>
                        )
                    }

                    {
                        (status == 1) && (
                            <>
                                {/* <Button
                                    className={styles.MuiButtonContainedSuccess}
                                    variant='contained'
                                    type='button'
                                    color='success'
                                    onClick={pasaLaPalabraRandom}
                                >Pasar la palabra</Button>
                                <br />
                                <br /> */}
                                <Button
                                    className={styles.MuiButtonContainedError}
                                    variant='contained'
                                    type='button'
                                    color='error'
                                    onClick={stopContador}
                                >Terminar Daily</Button>
                                <br />
                                <br />
                                <Button
                                    className={styles.MuiButtonContainedWarning}
                                    variant='contained'
                                    type='button'
                                    color='warning'
                                    onClick={reiniciarContador}
                                >Reiniciar Daily</Button>

                            </>
                        )
                    }
                </Grid>
                {
                    (status === 3) && (
                        <Grid item xs={12} align={"center"}>
                            <div className={styles.contenedorDetalle}>
                                <h4>📅 Detalle Daily 🕒</h4>
                                <br></br>
                                <p><b>Fecha:  </b>{getCurrentDate()}</p>
                                <p><b>Duración:  </b>{getDuracionDaily(minutes, seconds)}</p>
                                <p><b>Participantes:</b> {listaParticipantes.length}</p>
                                {/* <br></br> */}
                                <h4>Muchas Gracias 👨🏻‍💻</h4>
                            </div>
                        </Grid>
                    )
                }
            </Grid>
        </>
    );
};

export default ContadorMinutos;