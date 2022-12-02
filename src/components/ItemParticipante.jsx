import { Avatar, Button, Divider, Grid, IconButton, Input, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React from 'react';
import styles from './ItemParticipante.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemParticipante = ({ id, nombre, img, status, participo, removerParticipante, tiempoParticipado }) => {
    debugger;
    return (
        <>
           
            <ListItem
                alignItems="flex-start"
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => { removerParticipante(id) }} />
                    </IconButton>
                }>
                <ListItemAvatar>
                    <Avatar alt={nombre} src={img} />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>{nombre}</b>}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {participo === true ? `${tiempoParticipado} ✅` : "No ha participado 🙁"}
                            </Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>

            {

                <Divider variant="middle" />

            }
            {/* <Grid item xs={2}>
                <img alt='user-img' src={img} />
            </Grid>
            <Grid item xs={10}>
                <h3>{nombre}</h3>
                <Button
                    type='button'
                    variant='contained'
                    color='error'
                    onClick={() => { removerParticipante(id) }}
                >x</Button>
                <h3>{participo === true ? "Participo" : "No ha participado"}</h3>
            </Grid> */}
        </>

    );
};

export default ItemParticipante;