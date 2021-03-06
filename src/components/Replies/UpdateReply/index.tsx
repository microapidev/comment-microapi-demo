import React, {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
} from "react";
import { Box, Button, TextareaAutosize, Typography } from "@material-ui/core";
import TabViewIntroSection from "../../TabViewIntroSection";
import CommentSelect from "../../CommentSelect";
import ReplySelect from "../../ReplySelect";
import { CommentsContext } from "../../../context/comments";
import { CommentsActionType } from "../../../common/enums";

const updateComponentEndpoints = [
  "PATCH /comments/:commentId/replies/:replyId",
];
const updateComponentHeading = "Update a reply";
const updateComponentSubtitle = "Sometimes we need to make some changes.";

const UpdateReply: FunctionComponent = () => {
  const [state, dispatch] = useContext(CommentsContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (state.selectedReply) {
      setContent(state.selectedReply.content);
    }
  }, [state.selectedReply]);

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(event.target.value);
  };

  const handleUpdateSingleReplyClick = () => {
    if (state.selectedComment && state.selectedReply) {
      dispatch({
        type: CommentsActionType.UPDATE_REPLY,
        payload: {
          commentId: state.selectedComment.commentId,
          replyId: state.selectedReply.replyId,
          updateReplyDTO: { content },
        },
      });
    }
  };

  return (
    <React.Fragment>
      <TabViewIntroSection
        endpoints={updateComponentEndpoints}
        heading={updateComponentHeading}
        subtitle={updateComponentSubtitle}
      ></TabViewIntroSection>
      <Box mt={6} mb={1}>
        <Typography variant="body2" align="center" color="textSecondary">
          Select a comment to access for its replies.
        </Typography>
      </Box>
      <Box mb={1} display="flex" justifyContent="center">
        <CommentSelect></CommentSelect>
      </Box>
      <Box mt={6} mb={1}>
        <Typography variant="body2" align="center" color="textSecondary">
          Select a reply you'd like to update.
        </Typography>
      </Box>
      <Box mb={1} display="flex" justifyContent="center">
        <ReplySelect></ReplySelect>
      </Box>
      <Box mt={6}>
        <Typography variant="body2" align="center" color="textSecondary">
          Didn't respond exactly how you liked? Make a update.
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" mt={1}>
        <TextareaAutosize
          rowsMin={5}
          rowsMax={5}
          value={content}
          onChange={handleContentChange}
        ></TextareaAutosize>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          disabled={state.loading || state.selectedReply === undefined}
          onClick={handleUpdateSingleReplyClick}
        >
          {state.loading
            ? "Please Wait..."
            : state.selectedReply === undefined
            ? "No Reply"
            : "Update Reply"}
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default UpdateReply;
