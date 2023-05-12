import { Button } from "@mui/material"
import { signIn } from "next-auth/react"
import styles from "../styles/General.module.css"
import Navbar from "./navbar"

export default function SingIn(singin) {
    return(

        <div className={styles.box}>
            <Navbar/>
            <h2>Discover a new world of possibilities by joining our platform today</h2> <br/>
            <Button onClick={() => signIn()} variant="contained" color="success">
            SingIn
            </Button>
        </div>
)
}