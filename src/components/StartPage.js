import React, { useState } from "react";
import { Box, Grid } from "@mui/material";


import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { login } from "../store/UserSlice";
import { useDispatch } from "react-redux"


function StartPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch()

    const navigate = useNavigate();
    const handleSubmit = () => {
        dispatch(login(email));
        navigate("/quiz")
    }
    return (
        <>
            <Box height={80} />
            <Box sx={{ marginLeft: "450px" }} >
                <Grid container spacing={3} maxWidth={"sm"}>
                    <Grid item xs={12}>
                        <Card component={"form"} onSubmit={handleSubmit} sx={{ boxShadow: 3 }}>
                            <CardContent>
                                <Typography
                                    fontWeight={"bold"}
                                    fontSize={"30px"}
                                    sx={{ textAlign: "center" }}
                                >
                                    Start Page
                                </Typography>
                                <TextField
                                    id="name"
                                    name="name"
                                    value={name}
                                    label="Name"
                                    variant="outlined"
                                    type="text"
                                    margin="normal"
                                    fullWidth
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <TextField
                                    pt={5}
                                    id="email"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    required
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    pt={5}
                                    id="phone"
                                    label="Phone"
                                    variant="outlined"
                                    margin="normal"
                                    type="text"
                                    value={phone}
                                    fullWidth
                                    required
                                    name="phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />

                            </CardContent>

                            <Box sx={{ display: "flex", justifyContent: "end" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ margin: "10px" }}
                                    type="submit"
                                    disableElevation
                                >
                                    Submit
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default StartPage
