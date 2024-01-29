import { Avatar, Card, CardActions, CardContent, Chip } from "@mui/material";
import React from "react";
import CheckIcon from "@mui/icons-material/Check";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TagFacesIcon from "@mui/icons-material/TagFaces";

interface ICardModule {
  title?: string;
  name?: string;
  completed?: boolean;
}

const CardModule: React.FC<ICardModule> = ({ title, name, completed }) => {
  return (
    <div className="relative z-0">
      <Card elevation={10} sx={{ maxWidth: "100%" }}>
        <div className="absolute -top-2 -right-2 z-10">
          {completed ? (
            <Avatar
              alt="Complete"
              sx={{ width: 24, height: 24, bgcolor: "#65B741" }}
            >
              <CheckIcon sx={{ width: 15 }} />
            </Avatar>
          ) : (
            <Avatar
              alt="Wait"
              sx={{ width: 24, height: 24, bgcolor: "#EE7214" }}
            >
              <AccessTimeIcon sx={{ width: 15 }} />
            </Avatar>
          )}
        </div>
        <CardContent className="h-44">
          <h2 className="mb-1 text-sm lg:text-base  leading-tight text-neutral-800 dark:text-neutral-800 font-bold">
            {title}
          </h2>
        </CardContent>
        <CardActions className="absolute bottom-2">
          <Chip
            icon={<TagFacesIcon />}
            label={name}
            color="info"
            size="small"
          />
        </CardActions>
      </Card>
    </div>
  );
};

export default CardModule;
