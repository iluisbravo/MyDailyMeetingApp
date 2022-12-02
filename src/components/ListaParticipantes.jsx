import { Avatar, Button, Divider, Grid, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useState } from 'react';
import ItemParticipante from './ItemParticipante';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import styles from './App.module.css';

const ListaParticipantes = ({ listaParticipantes, setListaParticipantes }) => {
    const [nombreParticipanteNuevo, setNombreParticipanteNuevo] = useState("");
    // const [listaParticipantes, setListaParticipantes] = useState([]);

    const agregarParticipante = () => {
        debugger;
        const nuevoParticipante = {
            id: 'id' + (new Date()).getTime(),
            nombre: nombreParticipanteNuevo,
            img: `https://avatars.dicebear.com/api/bottts/${Math.floor(Math.random() * (+101 - 1)) + 1}.svg`,
            status: 0,
            participo: false,
            tiempoParticipado: 0
        }

        const listaParticipantesActualizada = [...listaParticipantes, nuevoParticipante];
        setListaParticipantes(listaParticipantesActualizada)
        setNombreParticipanteNuevo("")
    }

    const removerParticipante = (idParticipante) => {
        const listaParticipantesActualizada = listaParticipantes.filter(u => u.id !== idParticipante);
        setListaParticipantes(listaParticipantesActualizada)
    }

    const onChangeNombreParticipante = (evt) => {
        setNombreParticipanteNuevo(evt.target.value);
    }

    const captureEnter = (event) => {
        if (event.key === 'Enter') {
            agregarParticipante()
        }
    }

    return (
        <div>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 align={"center"}>Participantes {listaParticipantes.length}</h1>
                </Grid>
                <Grid item xs={12}>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        <ListItem
                            alignItems="flex-start"
                            secondaryAction={
                                <IconButton
                                    className={styles.colorBlue}
                                    type='button'
                                    variant='contained'
                                    color='primary'
                                    onClick={agregarParticipante}>
                                    <PersonAddIcon />
                                </IconButton>
                            }>
                            <Input
                                type='text'
                                value={nombreParticipanteNuevo}
                                placeholder='Nombre'
                                onInput={(evt) => onChangeNombreParticipante(evt)}
                                onKeyPress={(event) => captureEnter(event)}
                                fullWidth
                            ></Input>
                        </ListItem>
                    </List>
                </Grid>
                {/* {
                    listaParticipantes.map(u => {
                        return <ItemParticipante
                            key={u.nombre}
                            nombre={u.nombre}
                            img={u.img}
                            id={u.id}
                            participo={u.participo}
                            removerParticipante={removerParticipante}
                        />
                    })
                } */}
                <Grid item xs={12}>
                    <List sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                        height: 375,
                        maxHeight: 400,
                    }}>
                        {
                            listaParticipantes.map(u => {
                                return <ItemParticipante
                                    key={u.nombre}
                                    nombre={u.nombre}
                                    img={u.img}
                                    id={u.id}
                                    participo={u.participo}
                                    tiempoParticipado={u.tiempoParticipado}
                                    removerParticipante={removerParticipante}
                                />
                            })
                        }


                    </List>
                </Grid>



            </Grid>
        </div >
    );
};

export default ListaParticipantes;