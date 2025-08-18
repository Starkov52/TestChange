import React from "react";
import { useDispatch } from "react-redux";
import { addLikeCurrency } from "../state/mainSlice";
import { ListItem, ListItemText, ListItemButton } from "@mui/material";
import { Star } from "@mui/icons-material";
import { StarBorder } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { type RootDispatch } from "../state/store";
interface CurrencyLikeType {
     isLike: boolean;
     name: string;
     value: string;
}
const CurrencyItem: React.FC<CurrencyLikeType> = ({ isLike, name, value }) => {
     const dispatch: RootDispatch = useDispatch();
     const handleAddLike = (name: string, value: string) => {
          dispatch(addLikeCurrency({ newLikeCurr: { name: name, value: value } }));
     };
     return (
          <ListItem
               onClick={() => {
                    !isLike ? handleAddLike(name, value) : null;
               }}
               style={{
                    background: isLike ? "gold" : "rgb(213, 232, 218,0.5)",
                    marginTop: "5px"
               }}
          >
               <ListItemButton>
                    <ListItemText>{Number(value).toFixed(2)}</ListItemText>
                    <ListItemText sx={{ fontSize: "19px" }}>{name}</ListItemText>
                    <IconButton edge="end" aria-label={isLike ? "liked" : "like"} size="large">
                         {isLike ? <Star /> : <StarBorder />}
                    </IconButton>
               </ListItemButton>
          </ListItem>
     );
};
export default CurrencyItem;
