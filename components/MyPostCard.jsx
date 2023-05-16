import * as React from "react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/General.module.css";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyPostCard(props) {

    const handleDeletePost = async () => {
        await fetch("/api/posts/delete", {
          method: "POST",
          body: JSON.stringify({
            postId: props.id,
          }),
          headers: {
            "Content-type": "application/json"
          }
        })
        props.id
      }
    

  return (
    <Card sx={{ maxWidth: 600, marginBottom: 2.5, backgroundColor: "rgb(29, 155, 240)", borderRadius: 5}}>
      <CardContent>
        <div className={styles.cardbar}>
          <div style={{ display: "flex", alignItems: "center"}}> 
          <Link href="/profile" style={{marginRight: "10px"}}>
            <Image
              className={styles.profileimg}
              width={40}
              height={40}
              alt="Profile picture"
              src={props.image}
            />
          </Link>
            {props.name}
          </div>
          <div style={{ display: "flex", alignItems: "center"}}> 
          <DeleteIcon onClick={handleDeletePost} style={{marginRight: "10px"}}/>
          {format(new Date(props.date), "HH:mm - dd/LLL/yyyy")}
          </div>
        </div>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="whitesmoke">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
