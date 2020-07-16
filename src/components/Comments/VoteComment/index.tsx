import React, { FunctionComponent, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import TabViewIntroSection from "../../TabViewIntroSection";
import { CommentsContext } from "../../../context/comments";
import { CommentsActionType } from "../../../common/enums";

const voteComponentEndpoints = [
  "PATCH /comments/:commentId/votes/upvote",
  "PATCH /comments/:commentId/votes/downvote",
];
const voteComponentHeading = "Vote on a comment";
const voteComponentSubtitle =
  "Was a really good comment? Show your appreciation.";

const voteTypes = ["Upvote", "Downvote"];

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "grid",
  },
});

const VoteComment: FunctionComponent = () => {
  const [state, dispatch] = useContext(CommentsContext);
  const [selectedVoteType, setSelectedVoteType] = useState(voteTypes[0]);
  const [selectedCommentId, setSelectedCommentId] = useState(
    state.comments[0].commentId
  );

  const classes = useStyles();

  const handleVoteSingleCommentClick = () => {
    const type =
      selectedVoteType === voteTypes[0]
        ? CommentsActionType.UPVOTE_COMMENT
        : CommentsActionType.DOWNVOTE_COMMENT;

    dispatch({
      type,
      payload: { commentId: selectedCommentId },
    });
  };

  return (
    <React.Fragment>
      <TabViewIntroSection
        endpoints={voteComponentEndpoints}
        heading={voteComponentHeading}
        subtitle={voteComponentSubtitle}
      ></TabViewIntroSection>
      <Box mt={6} mb={1}></Box>
      <Typography variant="body2" align="center" color="textSecondary">
        Select a comment that you'd like to vote on.
      </Typography>
      <Box mb={1}></Box>
      <Grid container spacing={2}>
        {state.comments.slice(0, 4).map((comment) => (
          <Grid
            className={classes.root}
            item
            xs={6}
            sm={3}
            key={comment.commentId}
          >
            <Button
              variant={
                selectedCommentId === comment.commentId
                  ? "contained"
                  : "outlined"
              }
              onClick={() => setSelectedCommentId(comment.commentId)}
            >
              {comment.commentId.slice(0, 7)}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Box mt={6}></Box>
      <Typography variant="body2" align="center" color="textSecondary">
        Select a vote type you'd like to add to a comment.
      </Typography>
      <Box mb={1}></Box>
      <Grid container spacing={2}>
        {voteTypes.map((voteType) => {
          return (
            <Grid className={classes.root} item xs={6} key={voteType}>
              <Button
                variant={
                  selectedVoteType === voteType ? "contained" : "outlined"
                }
                onClick={() => setSelectedVoteType(voteType)}
              >
                {voteType}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          disabled={state.loading}
          onClick={handleVoteSingleCommentClick}
        >
          {state.loading
            ? "Please Wait..."
            : selectedVoteType === voteTypes[0]
            ? "Upvote Comment"
            : "Downvote Comment"}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default VoteComment;
