import * as React from "react";
import { format } from "date-fns";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import styles from "../styles/General.module.css";

export default function CommentCard({ comment }) {
  return (
    <Card
      sx={{
        minWidth: 600,
        maxWidth: 600,
        marginBottom: 2.5,
        backgroundColor: "rgb(29, 155, 240)",
        borderRadius: 5,
      }}
    >
      <CardContent>
        <div className={styles.cardbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              style={{ marginRight: "10px" }}
              className={styles.profileimg}
              width={40}
              height={40}
              alt="Profile picture"
              src={comment.User.image}
            />

            {comment.User.name}
          </div>
        </div>
        <Typography sx={{ marginTop: 1 }} variant="body2" color="whitesmoke">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
}
